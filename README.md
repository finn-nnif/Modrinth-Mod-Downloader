# Modrinth Mod Downloader

A simple Node.js script to download Minecraft mods from **Modrinth** automatically, based on game version, loader, and mod names.

---

## How to Use

### Requirements

* **Node.js** installed on your system.
* Dependencies installed via **npm**:

```bash
npm install
```

*(Make sure your `package.json` lists `node-fetch` if required for API calls.)*

---

### Configuring Mods to Download

Edit the mod list file (located in `config/lists.js`) to create a new Mod List with the template provided and specifiy the version, loader, and any mods you wish to add.

```js
export const sodium = {
    version: ['1.21.10', '1.21.9'],
    loader: ['fabric'],
    mods: ['sodium', 'lithium'],
};
```

> **IMPORTANT:** Use the **Mod Names Displayed on the Mod Page URL**, not display names, to ensure correct downloads, for example:
```bash
https://modrinth.com/mod/sodium <--- # only take the 'sodium' !!!
```
**If you don't**, it may not work when there are underscores and spaces involved as it differs !!!

---

### Running the Downloader

1. Pick which list you are using and the filepath to your `.minecraft/mods` folder in `config/default.js` by modifying these variables:
```js
// CONFIG //

export const list = lists.sodium;
export const output = 'C:\\APPS\\MultiMC\\instances\\1.21.10\\.minecraft\\mods';
```
2. Open a terminal and navigate to the project folder.
3. Run the downloader script:

```bash
node app.js
```

4. The console will display progress for each mod:

```
Downloaded sodium - 1.21.10 - fabric in 2.34s (1/4)
Downloaded lithium - 1.21.10 - fabric in 1.87s (2/4)
```

5. Once complete, you’ll see a summary:

```
Download complete: 4/4 mods downloaded in 12.45s
```

---

### Logs

All successful downloads are logged in:

```
/log/download.txt
```

Format:

```
<DATE_TIME> - <VERSION> - <LOADER> - <MOD_SLUG>
```

---

### Notes

* Only compatible versions and loaders will be downloaded.
* If a mod cannot be found or downloaded, an error will be printed in the console. (This will **NOT** stop the other mods from downloading luckily :D)
* Modrinth mod names in `config/lists.js` **MUST** be correct, otherwise the download will return an error and be skipped.

---

### Yapping
* This idea has been floating in my head for a while but I was loading up the new version of Minecraft wishing to start a new singleplayer and realising I needed to download my **~20ish** Quality of Life (QoL) Mods as I do *every* time. Anyways, after having to do that so many times I finally created this tool to help me. *(And I even left my QoL Mod List in there :3)*
* This was genuinely really fun to make so I may add more features in future!!
---

## License
This project is licensed under the **Creative Commons Attribution-NonCommercial 4.0 International License**. See the `LICENSE` file for details.