# Self Hosting (TrueNAS)

Using an old PC or dedicated NAS computer with at least 2 identically sized (ideally completely identical) hard drives you can start hosting your own services to save money. The services that I'm hosting on my own server are:
- Photos Storage
- Media Storage
- Network-wide Adblock
- Server-side Torrenting

## Getting the Correct Hardware


## Setting Up TrueNAS Scale
TrueNAS scale is an open source NAS OS which comes with built in ZFS, which just means its great at protecting your data. At minimum you need 2 identical hard drives or SSD's attached to your server computer to act as a Mirror, so that if 1 drive fails you still have the data in the other drive and can easily get a new one to replace it with. You can use more drives or SSD's to seperate storage between your services or to provide more security against data loss ([learn more](https://en.wikipedia.org/wiki/Standard_RAID_levels)).

### Getting Started
You will need:
- Regular computer (Desktop or Laptop) 
- PC to act as server
- Ethernet cable connecting your server to your router
- Keyboard connected to your server
- HDMI or equivalent cable connected to a monitor
- 2+ identical drives attached to server
    - You need a seperate drive (SSD recommended) to install your OS on your PC
    - [Seagate IronWolf](https://www.seagate.com/au/en/products/nas-drives/ironwolf-hard-drive/) hard drives are recommended as they're built to run 24/7
- 8GB+ empty USB
    - To clear a USB just plug it into a computer, right click the USB in your file explorer and click **Format** 

### Steps to Install TrueNAS
1. Plug your empty USB to your computer
2. Install [Balena Etcher](https://etcher.balena.io/)
3. Download the [TrueNAS .iso File](https://www.truenas.com/download/)
4. **[Balena Etcher]**
    1. Open Balena Etcher
    2. Click **Flash from file** and select the TrueNAS scale .iso file
    3. Click **Select target** as your empty USB drive
    4. Click **Flash**
    5. Safely remove the OS from your device
5. Plug the Boot drive into your server
6. Start your server up
    1. In case it doesn't auto boot to the USB, go to your BIOS and in your boot menu select the USB
7. You should now see a very basic interface for installation
![TrueNAS Initial Page](https://github.com/SaaiqAhmed/Tech-Tips/blob/main/src/images/truenas_1.jpg?raw=true)
8. Just hit `[Enter]` or wait 10 seconds to get to the **Console Setup** page
![TrueNAS Console Setup](https://github.com/SaaiqAhmed/Tech-Tips/blob/main/src/images/truenas_2.jpg?raw=true)
9. Using your arrow keys make sure **1. Install/Upgrade** is selected and hit `[Enter]`
10. At the **Choose destination media** page select your seperate SSD with `[Space Bar]` for the TrueNAS OS and hit `[Enter]`
![TrueNAS Console Setup](https://github.com/SaaiqAhmed/Tech-Tips/blob/main/src/images/truenas_3.jpg?raw=true)
11. Now click `[Enter]` all the way till you reach the **Password** page and use a password **YOU WILL REMEMBER**
12. The rest of the setup should be automatic till you reach the page below:
![TrueNAS Console]()
13. Now on your own computer go to the **web user interface** link on your browser to reach a homepage that looks like:
![TrueNAS Web UI]()

Congratulations you have now created a TrueNAS home server!

### Main TrueNAS Setup