# Setting Up Windows 11
## Bypass Microsoft Account
This is a method to bypass needing to link or create a microsoft account to use Windows 11. 
You need to start off with a new install or reset of Windows so that you are in the setup screen.

1. Complete the Windows 11 install until you reach the sign in screen
2. Click `Shift`+`F10` and a command prompt should open
3. Now type 
```bat
start ms-cxh:localonly
```
4. A **"Create a user for this PC"** window should open
5. Now create a Name and password for your device and you are done

## Remove Microsoft Bloat
Whether you have a new Windows 11 device or old, removing all the tracking and bloat on your device
will help with security, storage space and performance.
1. Start by opening **Windows PowerShell** making sure to **Run as Administrator**
2. Now copy and run the command below in PowerShell:
```bat
iwr -useb https://christitus.com/win | iex
```
3. This should open up an interface on your screen. On the top left click on **Tweaks**
![WinUtil Home Page](https://github.com/SaaiqAhmed/Tech-Tips/blob/main/src/images/win_utility.jpg?raw=true)
4. Click on the `Standard` button under **Recommended Selections**. 
5. Additionally you can tick some more tweaks to help remove more bloat. My recommended selection is:
![WinUtil Tweaks](https://github.com/SaaiqAhmed/Tech-Tips/blob/main/src/images/winutil_reccs.jpg?raw=true)
6. Finally just click **Run Tweaks** at the bottom of the window

As you might have seen with the utility, the software also allows you to directly install key windows apps.
In the event you are starting a fresh new computer with windows 11 I would recommend installing from here.

## Recommended Windows Apps
### Browser (Fire Fox)
It's one of the most lightweight browsers that doesn't use chromium. Once installed, use the extension
[uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/) to effectively block all ads.

### Video Player (VLC)
VLC is an open source classic that's been around for decades. It can play every video file format and has no 
issues with handling high quality videos.