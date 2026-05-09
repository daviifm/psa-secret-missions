# Club Penguin: PSA Secret Missions

> A fan-made preservation project that brings the Club Penguin PSA Secret Missions back to life using Ruffle, a Flash emulator written in Rust and compiled to WebAssembly.

## 🐧 About

The PSA Secret Missions were a series of point-and-click puzzle games originally available in Club Penguin. The game was officially shut down in 2017, taking the PSA Missions with it.

I really liked playing the missions, so I had the idea to make an acessible website to play all of them! This project preserves all 11 PSA Secret Missions in a playable state directly in the browser, with no plugins or downloads required.

**This project is not affiliated with Disney or Club Penguin in any way. It is a non-commercial fan project made purely for preservation purposes.**

---

## 🕹️ Missions

| # | Mission |
|---|---------|
| 1 | Case of the Missing Puffles |
| 2 | G's Secret Mission |
| 3 | Case of the Missing Coins |
| 4 | Avalanche Rescue |
| 5 | Secret of the Fur |
| 6 | Questions for a Crab |
| 7 | Clockwork Repairs |
| 8 | Mysterious Tremors |
| 9 | Operation: Spy and Seek |
| 10 | Waddle Squad |
| 11 | The Veggie Villain |

---

## 🌐 Play Online

The project is hosted on GitHub Pages and can be accessed at:

**[https://daviifm.github.io/psa-secret-missions/](https://daviifm.github.io/psa-secret-missions/)**

---

## 🛠️ Tech Stack

- **HTML / CSS / JavaScript** — Frontend structure and styling
- **[Ruffle](https://ruffle.rs/)** — Open source Flash emulator (Rust + WebAssembly)
- **Service Workers** — Dynamic asset routing to serve mission-specific `.swf` files
- **GitHub Pages** — Free static hosting

---

## 🏗️ How It Works

Club Penguin's `.swf` files use hardcoded absolute paths to load assets — rooms, dialogs, maps, and other resources. Since the game was never designed to run outside Disney's servers, these paths would normally result in 404 errors.

This project solves that with a **Service Worker** that intercepts all fetch requests and dynamically redirects asset paths to the correct mission folder, making each mission fully self-contained without modifying any of the original `.swf` files.

```
Browser requests: /common/misc/versions.swf
Service Worker redirects to: /swf/Case of the Missing Puffles/quest/q1/common/misc/versions.swf
```

The Service Worker also handles the timing challenge of ensuring it is fully active before Ruffle starts making requests, preventing 404 errors on first load.

---

## 📁 Project Structure

```
psa-secret-missions/
├── css/
│   ├── style.css         # Index page styles
│   └── missions.css      # Mission player styles
├── fonts/                # Custom fonts
├── icons/                # Mission thumbnail images
├── ruffle/               # Ruffle emulator files (self-hosted)
├── swf/                  # Mission assets
│   ├── Case of the Missing Puffles/
│   │   ├── global/
│   │   └── quest/q1/
│   │       ├── common/
│   │       ├── lang/
│   │       └── quest.swf
│   └── ... (one folder per mission)
├── index.html            # Mission selection hub
├── missions.html         # Mission player page
└── sw.js                 # Service Worker
```

---

## ⚠️ Known Limitations

- Playing on fullscreen messes with the TV-style border frame
- Audio context requires a user gesture to start (browser security policy)
- Service Worker caches may need to be cleared manually when switching between missions in some browsers

---

## 📜 Credits

- **[Ruffle](https://ruffle.rs/)** — Flash emulator used to run the `.swf` files
- **[Press Start 2P](https://fonts.google.com/specimen/Press+Start+2P)** — Font by CodeMan38, licensed under OFL
- **[aprilx246](https://github.com/aprilx246/ClubPenguin)** — For figuring out most of the path structure 
- Original game assets belong to **Disney / Club Penguin**

---

Made by **[daviifm](https://github.com/daviifm)**

*Not affiliated with Disney or Club Penguin · For preservation purposes only*