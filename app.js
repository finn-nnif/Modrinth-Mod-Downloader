
import * as constants from './config/constants.js';
import * as download from './src/download.js';
import * as config from './config/default.js';

console.log(config.list);

download.downloadHandler(config.list);