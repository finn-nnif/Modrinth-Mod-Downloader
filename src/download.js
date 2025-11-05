import fs from 'fs';
import path from 'path';

import * as config from '../config/default.js';

const logFile = path.join(process.cwd(), 'log', 'download.txt');

export async function downloadHandler(list) {
    let version = list.version;
    let loader = list.loader;
    let mods = list.mods;

    let totalMods = mods.length;
    let successCount = 0;
    const startAll = Date.now();

    for (let i = 0; i < mods.length; i++) {
        let downloaded = false;
        for (let k = 0; k < loader.length && !downloaded; k++) {
            for (let j = 0; j < version.length && !downloaded; j++) {
                const startTime = Date.now();
                try {
                    await downloadMod(mods[i], version[j], loader[k], config.output);
                    downloaded = true;
                    successCount++;
                    const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
                    console.log(`Downloaded ${mods[i]} - ${version[j]} - ${loader[k]} in ${elapsed}s (${successCount}/${totalMods})`);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

    const totalElapsed = ((Date.now() - startAll) / 1000).toFixed(2);
    console.log(`Download complete: ${successCount}/${totalMods} mods downloaded in ${totalElapsed}s`);
}

async function downloadMod(mod, version, loader, output) {
    const versions = await fetchModVersions(mod);
    for (let v of versions) {
        if (!v.game_versions.includes(version)) continue;
        if (!v.loaders.includes(loader)) continue;

        const file = v.files[0];
        try {
            await downloadFile(file.url, output, v.version_number, loader, mod);
            await writeToLog(v.version_number, loader, mod);

            return;
        } catch (err) {
            continue;
        }
    }
    throw new Error(`No compatible version found for ${mod} ${version} ${loader}`);
}

async function fetchModVersions(mod) {
    const res = await fetch(`https://api.modrinth.com/v2/project/${mod}/version`);
    if (!res.ok) throw new Error(`Failed to fetch versions for ${mod}`);
    return await res.json();
}

async function downloadFile(url, output, versionNumber, loader, mod) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to download ${url}: ${response.statusText}`);

    const filenameFromURL = path.basename(url.split("?")[0]);
    const ext = path.extname(filenameFromURL) || '.jar';
    const filename = `${mod}-${versionNumber}${ext}`;

    fs.mkdirSync(output, { recursive: true });
    const buffer = Buffer.from(await response.arrayBuffer());
    fs.writeFileSync(path.join(output, filename), buffer);
}

async function writeToLog(version, loader, mod) {
    const now = new Date();
    const log = `${now.toLocaleString()} - ${version} - ${loader} - ${mod}\n`;
    
    fs.mkdirSync(path.dirname(logFile), { recursive: true });
    fs.appendFileSync(logFile, log);
}