## Terminology Glossary
Here is a list of terms that are useful to know when choosing which version of a movie you want to watch.

| Term | Definition |
|:----:|------------|
|REMUX|The highest quality uncompressed video and audio of a video|
|Bitrate| The exact level of detail of a video (Higher is better)|
|H264| An older form of video compression thats worse and results in larger files|
|H265/HEVC| Latest video compression algorithm with the best balance of quality and file size|
|HDR| Provides a wider range of colours both brighter and darker. Requires a HDR compatible device|
|WEB-DL| Downloaded usually from a streaming service|
|BluRay| Downloaded from a Bluray disc|

If you don't use a Debrid service then its best to not stream REMUX movies.

# Streaming Guide (Stremio)

![Stremio Home Page](https://github.com/SaaiqAhmed/Tech-Tips/blob/main/src/images/stremio-home.jpg?raw=true)

The best way to stream movies and TV shows for free currently is using the app [Stremio](https://www.stremio.com/).
The alternate method is to use streaming sites like [Cineby](https://www.cineby.gd/) but they don't offer as much customisability and features as Stremio does.

### Stremio Features
- ✅ Highest Quality Streams (REMUX streams)
- ✅ HDR10+ Support
- ✅ AndroidTV & WebOS Support
- ✅ Complete Catalogue of Almost All Movies & Shows
- ❌ Requires Fast Internet (50mbps+ 1080p | 100mbps+ 4K)
- 🟧 Optional Debrid Subscription For Faster Loading (explained below)

### Debrid Service

A debrid service like [RealDebrid](https://real-debrid.com/) or [TorBox](https://torbox.app/) is like a bridge which uses their own high bandwidth servers
to download and cache torrents which then just get directly streamed to you. This service can be easily used alongside Stremio to provide streaming capabilities 
on par with regular services like Netflix and Disney+. Torrenting requires other users called *seeders* who upload the torrent in chunks which is whats downloaded
by Stremio to play regularly. The issue with this method is **slow loading times** for larger files like uncompressed 4K movies or older/niche films which don't
have anyone seeding. In this case you can pay a subscription of roughly $50-150 a year (still cheaper than any streaming service) to use RealDebrid or TorBox.

Personally I would recommend using **TorBox** as it has a US$3 a month option which has everything you would need to use with Stremio. 
You can also pay for their higher tiers which provide 5-10+ concurrent slots (the cheapest version includes 3) which means you can use
TorBox with multiple other Stremio accounts for other friends and family.

## Setting Up Stremio (Simple)
*Best to be using either a laptop or PC for the initial setup. The setup is one time only*
1. Create your [Stremio Account](https://www.stremio.com/register)
2. Login to the [Stremio Web App](https://web.stremio.com)
3. Go to the [Stremio Community Addons](https://stremio-addons.com/) website and click **Install (Web)** on [Torrentio](https://stremio-addons.com/torrentio.html)
4. This should direct you to the website with a popup to install Torrentio. Just click install

Now you are done with the most basic Stremio option. Just go to the Android or WebOS app store to install and login to your Stremio account to start watching
on your TV! 

## Setting Up Stremio (Advanced)
*This is a more complex setup method that will help simplify and enhance your stremio experience. It requires a debrid service but will help effectively remove all downtimes that you might experience with Torrentio*
1. Create your [Stremio Account](https://www.stremio.com/register)
2. Login to the [Stremio Web App](https://web.stremio.com)
3. **[TorBox Section]**
    1. Create an account on [TorBox](https://torbox.app/) and purchase one of the higher tiers
    2. Head to **Settings** and under **API Key**, copy and save the API Key.
4. **[Metadata Section]**
    1. Create an account on: 
        1. [TMDB](https://www.themoviedb.org/signup)
        2. [TVDB](https://www.thetvdb.com/auth/register)
        3. [TOP Posters](https://api.top-streaming.stream/)
        4. [Trakt](https://trakt.tv)
        5. [Google AI Studio](https://aistudio.google.com/) *(Optional if you want AI search capabilities)*
    2. Obtain a copy of each of their API Keys
        1. [TMDB API](https://www.themoviedb.org/settings/api) (Copy both **Read Access Token** and **API Key**)
        2. [TVDB API Sign Up](https://www.thetvdb.com/api-information/signup)
        3. [TOP Posters API](https://api.top-streaming.stream/user/dashboard)
        4. [Gemini Free API](https://aistudio.google.com/api-keys) (Should be under the Project **Default Gemini Project**)
5. Download the [AIOStreams Config file](https://github.com/SaaiqAhmed/Tech-Tips/blob/main/src/content/saaiq-aiostreams-config-2026-02-19.11-18-56.json) 
6. Now head over to [AIOStreams](https://aiostreamsfortheweebsstable.midnightignite.me/stremio/configure) and select **Advanced** mode
7. Click the **Save** icon on the left >> Click Import >> Import the downloaded config file
8. **[Adding Services to AIOStreams]**
    1. Click the **Cloud** icon on the left
    2. Click the Settings button for the Debrid service you chose and add the API key
    3. Change Poster Service from **RPDB** to **TOP Poster**
    4. Scroll down and add API keys for **TOP Poster**, **TMDB Read Access**, **TMDB** & **TVDB**
9. Go Back to the **Save** icon and create a password (Make sure to remember or save it somewhere safe, it is important if you want to make changes)
10. Click Install to add it to your Stremio account
11. **[AIOMetadata Setup]**
    1. Download the [AIOMetadata Config file](https://github.com/SaaiqAhmed/Tech-Tips/blob/main/src/content/saaiq-aiometadata-config-2026-02-19.json) 
    2. Now go to [AIOMetadata](https://aiometadata.viren070.me/configure/)
    3. Click on the **Configuration** tab >> Click **Import Configuration** >> Import the downloaded config file
    4. Click on the **Integrations** tab >> Select **TOP Posters API** for "Poster Rating Provider" >> Add all required API keys
    5. Go back to the **Configuration** tab >> Click **Save Configuration** >> Click the install button
12. **[Remove Cinemata]**
    1. Go to [CineBye](https://cinebye.elfhosted.com/) and login to your Stremio account
    2. Make sure **Section 2 - Options** removes all Cinemata
    3. Scroll down to **Manage Addons** and drag AIOMetadata to the top and AIOStreams 2nd
    4. Go to **Section 3 - Sync Addons** and just click the sync button

Congratulations 🎉🎉🎉 you have now completed setting up Stremio entirely. Hope you enjoy!

# Sports / Live TV Streaming
While there are many websites to watch sports streams (that you can find at [FMHY](https://fmhy.net/video#live-sports)), they typically come with a lot of buffering, complicated TV support and bad mobile experience. While there is no free method that works well, you can pay for either [Strong 8K](https://strongtv8k.net/) or [TRex](https://trex-server.com/) as an IPTV service to get premium (up to 4K) live TV streams compatible with all devices. 

I would recommend [TRex](https://trex-server.com/) as it is cheaper with a smaller lock in contract while also having options for up to 4 devices. The cheapest plan is **€25 for 6 months** for 1 device, which means you can only have up to 1 device streaming live TV at once. This is great if you want to just use it yourself but if you want to use it with family or friends you can get up to 4 devices for **€75 for 6 months**.

## Obtaining the IPTV Service
1. Go to [TRex](https://trex-server.com/) (or [Strong 8K](https://strongtv8k.net/) if you like their options) and either start their 24 hour free trial to get a taste or pay for the subscription.
2. When checking out make sure to include the email you want the IPTV details to be sent to
3. Once you've paid make sure to keep the details emailed to you safe. You will need either an **m3u link** or **Xstream code**.

## Getting an IPTV Player
- [Windows / MacOS / Linux (IPTVNator)](https://4gray.github.io/iptvnator/)
- [Android / Android TV (Tivi Mate)](https://tivimate.com/)
    - Does require a US$40 fee for access to all features but isn't required

Once installed, choose Xstream (m3u link works too) and add the required details.
- **XStream:** `URL` `Username` `Password`
- **m3u Link:** URL link ending in `.m3u` but is typically longer to type on a TV

And now you're done! 🎉🎉🎉 you should have access to thousands of channels, just browse through the different sections to find the sports streams or tv channels you want. 

For a rough cost of **US$33/yr** for **TorBox** and **€50/yr** for **TRex**. Which is roughly **A$130/yr** (cheaper than Netflix), you get to stream 4K movies, shows and live TV at the best possible speeds (Recommend 100mbps+ internet speeds for little buffering).