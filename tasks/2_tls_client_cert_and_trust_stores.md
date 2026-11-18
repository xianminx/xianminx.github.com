# Client certificates, and which trust store an app uses

## Question

1. On a normal HTTPS connection, does the client send its own certificate? Can the server, or a man-in-the-middle, use that certificate to identify the user?
2. In what case does the client send a certificate, and can the server then identify the client?
3. Does `/etc/ssl/cert.pem` hold the same CAs that macOS Keychain Access shows?
4. Which applications use which store? If I write an app, which store does it use by default?

## Evidence

`/etc/ssl/cert.pem` on this Mac starts with the OpenBSD bundle header and a CA certificate, not a certificate issued to this machine:

```text
# $OpenBSD: cert.pem,v 1.22.2.1 2021/09/30 18:28:20 deraadt Exp $
### /C=ES/CN=Autoridad de Certificacion Firmaprofesional CIF A62634068

Subject: C=ES, CN=Autoridad de Certificacion Firmaprofesional CIF A62634068
X509v3 Basic Constraints: critical
    CA:TRUE, pathlen:1
X509v3 Key Usage: critical
    Certificate Sign, CRL Sign
```

The system curl log for `login.docker.com` also names this file: `CAfile: /etc/ssl/cert.pem`, `LibreSSL/3.3.6`.

## Answer

### A normal connection sends no client certificate

The client does not send its own certificate on a normal HTTPS connection, and `/etc/ssl/cert.pem` is not a client identity.

That file is the local CA trust store. The entry above is a certificate authority (`CA:TRUE`, key usage `Certificate Sign, CRL Sign`). Curl uses it on this machine to check that the server's certificate chains to a trusted CA. Those CA certificates stay local. The server never receives them. Every machine with the same bundle has the same public CA certs, so they do not identify a user.

What the client sends in the handshake is a Client Hello: TLS version, random, cipher suites, and the server name (SNI). The server sends its certificate. The client checks that certificate against its trust store.

A server or an on-path observer cannot track the user from `cert.pem`. They can use what the connection already exposes: the client IP, and the shape of the Client Hello (cipher list and extensions). After the handshake, cookies and HTTP headers do the rest. A TLS-intercepting proxy can read the decrypted request when its CA is in the trust store the client actually uses. What it tracks is that traffic. The bundle in `cert.pem` still contains no certificate that names the user.

### When the client does send a certificate

That happens with mutual TLS. During the handshake the server sends a `CertificateRequest` naming the CAs it accepts. If the client holds a certificate issued by one of those CAs, plus the matching private key, it sends that certificate and a `CertificateVerify` signature. The signature proves it possesses the key. The certificate is a separate file or keychain entry issued to this user, device, or service. `/etc/ssl/cert.pem` holds CA certificates for verifying peers, and the client certificate lives outside that file.

Typical cases: a company API or VPN that enrolls each employee or laptop, service-to-service calls (Kubernetes, a mesh, SPIFFE), a bank or government site that requires a smart-card certificate, and an API gateway with client-certificate authentication turned on (`ssl_verify_client` in nginx, Cloudflare or AWS mTLS). Browsers ask the user to pick a certificate. If the client has none, it sends an empty list and the server can refuse the connection.

The server can identify the client from that certificate. After the chain validates, the stable identifiers are the subject (`CN`, organization), the subject alternative name (email, URI, SPIFFE id), and the serial or fingerprint. The same certificate on a later connection is the same identity, so the server can link sessions and map the subject to an account. A certificate shared by a whole fleet identifies the deployment. A certificate issued to one person or device identifies that person or device.

Who else sees it depends on the TLS version. In TLS 1.2 the client certificate is sent in the clear, so a passive observer on the path can read the subject and track that certificate. In TLS 1.3 it is sent after the handshake keys exist, so it is encrypted. A passive observer sees the Client Hello and the client IP, and does not see the certificate. An interceptor that terminates TLS sees it when the client presents the certificate to that peer. Browsers usually offer a certificate only for the site that asked, and only from a CA named in the request.

### `/etc/ssl/cert.pem` and the Keychain are different stores

The header `$OpenBSD: cert.pem,v 1.22.2.1` is the LibreSSL/OpenBSD CA bundle that Apple ships for curl and other tools linked to LibreSSL. The default backend of `/usr/bin/curl` reads this file. `CURL_SSL_BACKEND=secure-transport` switches that same curl onto the Keychain. Keychain Access shows System Roots (`SystemRootCertificates.keychain`), System, and login. Safari and the Security framework use those keychains.

On this Mac the two lists only partly match:

| Store                | Certificates |
| -------------------- | ------------ |
| `/etc/ssl/cert.pem`  | 128          |
| System Roots         | 158          |
| In both              | 95           |
| Only in `cert.pem`   | 33           |
| Only in System Roots | 63           |

The Firmaprofesional CA in the snippet is one of the 95 in both. The System keychain has 5 certificates and the login keychain has 13. One login certificate happens to also be in the bundle.

Trust settings stay in the store you edited. A root disabled in Keychain Access remains trusted for the default curl, because it is still in `cert.pem`. A corporate CA added to the login or System keychain is trusted by Safari, and curl trusts it once that CA is appended to `cert.pem` or passed with `--cacert`.

### Which program uses which store

An app trusts the store its TLS library was built to read. On this Mac:

| Caller                                                                | Store it verifies against                                               |
| --------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Swift / Objective-C `URLSession`, Safari, Network.framework           | Keychain (System Roots, System, and login trust settings)               |
| Go `net/http`                                                         | Keychain, through Security.framework                                    |
| `/usr/bin/curl` with `CURL_SSL_BACKEND=secure-transport`              | Keychain                                                                |
| `/usr/bin/curl` default, this `python3` `ssl` / `urllib`, system Ruby | `/etc/ssl/cert.pem`                                                     |
| Node 24 `https` / `fetch`                                             | Node's bundled roots (146). `--use-system-ca` switches to the Keychain. |
| Python `requests` / `httpx`                                           | The `certifi` bundle shipped inside the package                         |
| Homebrew OpenSSL                                                      | `/opt/homebrew/etc/ca-certificates/cert.pem`                            |
| This Temurin 25 JDK                                                   | `$JAVA_HOME/lib/security/cacerts`                                       |
| Chrome / Electron                                                     | Chrome's root store, plus CAs added in the Keychain                     |
| Firefox                                                               | Firefox's own store in the profile                                      |

A native Mac app written against `URLSession` uses the Keychain, so a root added or disabled in Keychain Access applies to it. Python, Node, Java, and Ruby look at the Keychain only when asked: `truststore` or `pip-system-certs` for Python, `node --use-system-ca`, or a Java trust store loaded from the Keychain. A CA added only in Keychain Access is invisible to those runtimes. A CA appended only to `cert.pem` is invisible to Safari and to Go.
