# Setting Up Windows 11
## Bypass Microsoft Account
This is a method to bypass needing to link or create a microsoft account to use Windows 11. 
You need to start off with a new install or reset of Windows so that you are in the setup screen.

1. Complete the Windows 11 install until you reach the sign in screen
2. Click `Shift`+`F10` and a command prompt should open
3. Now type 
```bash
start ms-cxh:localonly
```
4. A **"Create a user for this PC"** window should open
5. Now create a Name and password for your device and you are done

## Remove Microsoft Bloat
Whether you have a new Windows 11 device or old, removing all the tracking and bloat on your device
will help with security, storage space and performance.
1. Start by opening **Windows PowerShell** making sure to **Run as Administrator**
2. Now copy and run the command below in PowerShell:
```bash
iwr -useb https://christitus.com/win | iex
```
3. 