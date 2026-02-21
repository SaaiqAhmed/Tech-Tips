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
All of these apps but Microsoft PC Manager can be installed directly using **WinUtil**

### Browser (Firefox)
![Firefox Official Site](https://www.firefox.com/media/img/firefox/home/hero-high-res.3a264c17970e.png)
It's one of the most lightweight browsers that doesn't use chromium. Once installed, use the extension
[uBlock Origin](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/) to effectively block all ads.

### Video Player (VLC)
![VLC Wikipedia Page](https://upload.wikimedia.org/wikipedia/commons/f/fd/VLC_3.0.21_on_Debian_-_KDE.png)
VLC is an open source classic that's been around for decades. It can play every video file format and has no 
issues with handling high quality videos.

### Archive Manager (WinRAR)
While "technically" not free, winRAR is still one of the most powerful and easy to use tools for extracting and
working with `.zip` and `.rar` files. It's simply an essential piece of software to have.

### Password Manager (Bitwarden)
![Bitwarden Web app](https://bitwarden.com/assets/2xTpSA11EOCzx8VIuVffcF/d3bc18e7fc3c3cb0bf1779fad9262cd3/2024-12-02_13-42-14.png?w=1162&fm=jpg)
One of the best free password managers that works across all devices. It's been regularly vetted by 3rd parties
and has always been shown to be secure.

### Windows Utility Software

#### Revo Uninstaller
![Revo Uninstaller Official Site](https://f057a20f961f56a72089-b74530d2d26278124f446233f95622ef.ssl.cf1.rackcdn.com/site/screens/revo-uninstaller-free.png)
Windows doesn't always uninstall everything and can leave a lot of junk files for if you ever reinstall a program.
Revo Uninstaller helps remove everything when uninstalling applications.

#### Microsoft PC Manager
![Microsoft PC Manager Official Page](https://store-images.s-microsoft.com/image/apps.48621.14298090620665013.083d4ab3-27dc-4677-bf79-e2e8eec57e66.a1547b7e-4db6-4121-8f18-d2f6479ebd1c)
A Microsoft developed application that can help clean up junk files across your computer to help boost performance.
You can install it straight from the [Microsoft Store](https://apps.microsoft.com/detail/9PM860492SZD?hl=en-us&gl=AU&ocid=pdpshare).

## Recommended Gaming PC Apps

### Overclocking Tool (MSI Afterburner)
![MSI Afterburner Main Screen](https://storage-asset.msi.com/event/2020/vga/AfterburnerNew/image/afbr.jpg)
Most popular and reliable overclocking tool for all GPU's.

### Diagnostics Tool (HWiNFO)
![HWiNFO Official Site](https://www.hwinfo.com/wp-content/uploads/2018/10/hwinfo-screen-1024x728.jpg)
Powerful lightweight tool to get live diagnostics of all your PC hardware. You can check usage in detail
and most importantly the temperatures of all your hardware to make sure everything is running properly.