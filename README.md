# Keymaster

TOTP 2 Factor Authentication for KaiOS 1.0

![alt text](SettingsScreenshot.jpg "Settings page")

Keymaster is a TOTP client for older versions of KaiOS. It can replace Google Authenticator, Microsoft Authenticator, and many others. It works 100% offline!

If you are using a more recent version of KaiOS, KaiAuth might work better on your device.



## How to add accounts
To add an account, press the left button to go to settings. Select `New`, and set the name to anything you want. Next, to get the secret, you will need to get it from the service you are trying to add, so look for 2 Factor Authentication or 2FA in your account settings there. You will probably recieve a QR code, so use any tool to extract the text from this QR code. In this text, look for something like `secret='ABCDEF'`. Copy only the ABCDEF, not including the quotations marks, into the `Secret: ` textbox in Keymaster. Select `Save & exit`, and it will generate 2FA codes!


