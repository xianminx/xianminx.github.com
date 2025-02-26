---
layout: 'post'
title: 'LetsEncrypt'
tags: [ssl]
date: '2018-06-06'
---

https://certbot.eff.org/lets-encrypt/ubuntutrusty-nginx

## Install LetsEncrypt

```sh
root@open2:/etc/nginx/sites-enabled# ls
city.opentown.cn  opentown.cn
root@open2:/etc/nginx/sites-enabled# git diff city.opentown.cn
root@open2:/etc/nginx/sites-enabled# vim city.opentown.cn
root@open2:/etc/nginx/sites-enabled# certbot --nginx
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Plugins selected: Authenticator nginx, Installer nginx

Which names would you like to activate HTTPS for?
-------------------------------------------------------------------------------
1: opentown.cn
2: adunk.opentown.cn
3: api.opentown.cn
4: cityapi.opentown.cn
5: m.opentown.cn
6: www.opentown.cn
-------------------------------------------------------------------------------
Select the appropriate numbers separated by commas and/or spaces, or leave input
blank to select all options shown (Enter 'c' to cancel): 4
Obtaining a new certificate
Performing the following challenges:
http-01 challenge for cityapi.opentown.cn
Waiting for verification...
Cleaning up challenges
Deploying Certificate to VirtualHost /etc/nginx/sites-enabled/city.opentown.cn

Please choose whether or not to redirect HTTP traffic to HTTPS, removing HTTP access.
-------------------------------------------------------------------------------
1: No redirect - Make no further changes to the webserver configuration.
2: Redirect - Make all requests redirect to secure HTTPS access. Choose this for
new sites, or if you're confident your site works on HTTPS. You can undo this
change by editing your web server's configuration.
-------------------------------------------------------------------------------
Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 1

-------------------------------------------------------------------------------
Congratulations! You have successfully enabled https://cityapi.opentown.cn

You should test your configuration at:
https://www.ssllabs.com/ssltest/analyze.html?d=cityapi.opentown.cn
-------------------------------------------------------------------------------

IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/cityapi.opentown.cn/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/cityapi.opentown.cn/privkey.pem
   Your cert will expire on 2018-09-04. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot again
   with the "certonly" option. To non-interactively renew *all* of
   your certificates, run "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```
