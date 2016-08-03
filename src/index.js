import fs from 'fs';
import path from 'path';

let configFileName = '';

function log(...args) {
  console.log(...args);
}

function parseConfigFile(file) {
  try {
    return JSON.parse(file);
  } catch (e) {
    // invalid JSON
    log(e.message);
    return null;
  }
}

function getConfigInDir(dir) {
  console.log('getConfigInDir', dir);
  let config = null;

  try {
    const fileName = path.join(dir, configFileName);
    const file = fs.readFileSync(fileName, 'utf8');
    config = parseConfigFile(file);

  } catch (e) {
    // no config present
    return null;
  } finally {
    return config;
  }
}

/**
* Find and merge all configs.
* @param {String} [dir] - defaults to cwd
* @return {Object}
*/
export function getConfig(dir = process.cwd()) {
  return getConfigInDir(dir);
}

export function setConfigName(name) {
  configFileName = name;
}
