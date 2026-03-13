# TrueNAS Scale Setup
Using an old PC or dedicated NAS computer with at least 2 identically sized (ideally completely identical) hard drives you can start hosting your own services to save money. The services that I'm hosting on my own server are:
- Photos Storage
- Media Storage
- Network-wide Adblock
- Server-side Torrenting

[TrueNAS scale](https://www.truenas.com/truenas-community-edition/) is an open source NAS OS which comes with built in ZFS, which just means its great at protecting your data. At minimum you need 2 identical hard drives or SSD's attached to your server computer to act as a Mirror, so that if 1 drive fails you still have the data in the other drive and can easily get a new one to replace it with. You can use more drives or SSD's to seperate storage between your services or to provide more security against data loss ([learn more](https://en.wikipedia.org/wiki/Standard_RAID_levels)).

## Getting the Correct Hardware
In general using even slightly old PC's is fine as a server. But you can purchase dedicated NAS servers though they are more expensive. If you just want to use your server for basic media storage 8GB of RAM can be enough. If you want to host your own smart home hub, security cameras or video game servers then 16GB or higher is better for the server's performance. While a GPU is typically not needed, it can help with offloading media encoding if your streaming content. But the main use of a GPU run server would be to host local LLM's either for experimentation or as a Alexa/Siri/Gemini home assistant replacement. 

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
![TrueNAS Console Setup](https://github.com/SaaiqAhmed/Tech-Tips/blob/main/src/images/truenas_4.jpg?raw=true)
13. Now on your own computer go to the **web user interface** link on your browser to reach a homepage that looks like:
![TrueNAS Console Setup](https://github.com/SaaiqAhmed/Tech-Tips/blob/main/src/images/truenas_5.jpg?raw=true)

Congratulations you have now created a TrueNAS home server!

### TrueNas OS Setup
1. To login use the **username** `truenas_admin` and the password you set earlier
2. Now head to the `Storage` tab on the left
3. Click the `Create Pool` button
4. For `General Info` give it any simple name of your choice
5. In `Data` choose the **Layout** `Mirror` and select the 2 identical drives
    1. Depending on how many drives you have you can choose any other RAID option too
6. Click `Save and Go To Review` and create your new pool
Now you have successfully created a data pool for you to start adding services on!

# TrueNAS Services
Down below is a list of all the services I use or plan to use.

## Immich
[Immich](https://immich.app/) is a photo and video management app that acts as a great open source alternative to iCloud or Google Photos.
The benefits of hosting your own service means you don't need to constantly pay for your photos, no worries about your data being used by Apple or Google 
and much faster uploads of your photos while your at home. 

Immich itself has many features which at its current version, makes it on par with all other services. Features include:
- iOS, Android & Web support
- **Auto Backup:** Will automatically upload new photos to your server when you're at home
- **Facial Recognition:** Can detect faces in photos & videos
    - Allows naming and combining faces (if they're the same person)
    - Filter by face or multiple faces
- **OCR:** Scans all text in images, allowing to search images based on text
- **Context:** Uses AI to get the "context" of a photo (Not that great)
- Filter by `File Name` `OCR` `Context` `Photo Location` `Camera Type` `Date` `Media Type`

### Setting Up Immich

## Jellyfin
[Jellyfin](https://jellyfin.org/) is best known for being the best open source media hub for local movies and tv shows.
If you like collecting physical media then this is the next step from having a hard drive of movies. Jellyfin uses metadata from
[TVDB](https://www.thetvdb.com/) and [TMDB](https://www.themoviedb.org/) to create a streaming service style interface of all your shows.
There is also iOS, Android, Android TV & WebOS apps available so you can easily stream and download your media on any device. 

### Setting Up Jellyfin

## Pi-hole
[Pi-hole](https://pi-hole.net/) is a network-wide adblocking service. There's really nothing else to say, it's a great way to block ads for any guests or devices that
cannot use adblock like a TV. Although if you have the right apps or extensions on your device this isn't really necessary.

### Setting Up Pi-hole

## qBitorrent
Like with the **Torrenting** section, this will allow you to torrent any file you want and have it saved directly into your server. 
I personally use it mostly to populate my Jellyfin media or any Manga and books I want saved. 

### Setting Up qBitorrent

## Minecraft Server

## Accessing Your Services Outside Your Network
As great as having these services is, an issue arises if you want to try and access any of them when your not home. 
Because of the way TrueNAS works, to maintain security, you can't easily access services outside of your network without
using a secure method. The 3 services that you can use are [Tailscale](#tailscale) `DDNS-Updater` and `Nginx`.

### Tailscale
[Tailscale](https://tailscale.com/) is a free service that provides a server hosted secure vpn connection to allow devices outside of your network
to safely connect to your server. It does require the app to be installed on each device you want to be able to connect externally. But in doing the setup you
don't need to worry about exposing your server to the public internet which could result in potential hack threats. 
This is best used for you and anyone else at home to access more personal services as securely as possible, like **Home Assistant** or [Immich](#immich). 

#### Setting Up Tailscale
