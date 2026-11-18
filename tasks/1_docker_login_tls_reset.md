# Why `login.docker.com` resets during the TLS handshake

## Question

`curl` to `https://login.docker.com/` dies with `curl: (35) Recv failure: Connection reset by peer`. The same paste also reports `Could not resolve host: curl` and `zsh: unknown file attribute: 3`. What does each line mean, and why does the handshake fail?

## Log

```text
curl -vvv curl https://login.docker.com/
curl: (35) Recv failure: Connection reset by peer
* Could not resolve host: curl
* Closing connection
curl: (6) Could not resolve host: curl
* Host login.docker.com:443 was resolved.
* IPv6: (none)
* IPv4: 104.18.43.182, 172.64.144.74
*   Trying 104.18.43.182:443...
* Connected to login.docker.com (104.18.43.182) port 443
* ALPN: curl offers h2,http/1.1
* (304) (OUT), TLS handshake, Client hello (1):
*  CAfile: /etc/ssl/cert.pem
*  CApath: none
* Recv failure: Connection reset by peer
* LibreSSL/3.3.6: error:02FFF036:system library:func(4095):Connection reset by peer
* Closing connection
curl: (35) Recv failure: Connection reset by peer
zsh: unknown file attribute: 3
```

## Answer

The paste mixes three separate failures. Only the reset during the handshake is the HTTPS problem.

**`Could not resolve host: curl`.** The command is `curl -vvv curl https://login.docker.com/`. Curl treats the bare word `curl` as a URL and looks up a host named `curl`. The request that matters is the next argument:

```bash
curl -vvv https://login.docker.com/
```

**`curl: (35) Recv failure: Connection reset by peer`.** DNS and TCP succeed. The addresses `104.18.43.182` and `172.64.144.74` are Cloudflare. Curl sends a TLS Client Hello, then the peer resets the socket before any Server Hello. `(304) (OUT)` means 304 bytes were written. The number is a byte count from curl's trace. LibreSSL 3.3.6 is the default TLS backend of `/usr/bin/curl` on this Mac, which is why the log names `CAfile: /etc/ssl/cert.pem`. Certificate verification never starts, because the handshake is aborted on the Client Hello. The CA file is idle here.

That pattern means something on the path, or Cloudflare in front of `login.docker.com`, is aborting this Client Hello. Typical causes are a firewall or ISP reset, or this old LibreSSL fingerprint being rejected. A newer curl linked to OpenSSL often gets through when the system curl does not. If every modern client is reset the same way, the network is blocking that host and Docker login needs another path.

**`zsh: unknown file attribute: 3`.** This comes from the shell. Zsh read `*(304)` from the verbose log as a glob qualifier, and `3` is not a valid qualifier. Quote the trace, or avoid pasting it back into the shell.
