------------------
*** README.TXT ***
------------------

Congratulations, you are only a few steps away from having your tag cloud live on your website!


ZIP CONTENTS
--------------

cloud_data.xml
  This file contains the keywords/tags you want to display in the cloud.

imagecloud.swf
  This is the flash file that will display your tag cloud in glorious 3D.

swfobject.js
  This javascript file ensures 100% compatibility with all browsers so your tag cloud always displays correctly.

test.html
  This file shows an example of how the cloud will look on your website.


INSTALLATION
--------------

1. Check that we have included all the tags that you want in your tag cloud
 - Open cloud_data.xml in a text editor like Notepad
 - We've already spidered your site and added the tags we thought were relevant but you can make any changes you like here

2. Upload the following files to your webspace
 - cloud_data.xml
 - swfobject.js
 - imagecloud.swf

3. Place the following code within the <body> section of the webpage you want to show the tag cloud on

<div id="flashcontent"></div>
<script language="javascript" type="text/javascript">swfobject.embedSWF("imagecloud.swf", "flashcontent","280", "280","9", "",cloud_data: "cloud_data.xml"},{wmode: "transparent", menu: "false", quality: "high", scale:"noscale"});</script>

4. Place the following code within the <head> section of the same webpage from step 3

<script language="javascript" type="text/javascript" src="swfobject.js"></script>

*** THAT'S IT! YOUR TAG CLOUD IS LIVE ***

                ---------------------------------------------------
                -  Do you need more followers at Twitter? Get an  -
                -  eye-catching flash follow-me button from       -
                -  www.twitterflash.net and watch your followers  -
                -  grow!                                          -
                ---------------------------------------------------