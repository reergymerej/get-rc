import fs from 'fs';
import path from 'path';

let configFileName = '';

function log(...args) {
  if (process.env.NODE_ENV !== 'production') {
    process.stdout.write(...args);
  }
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
  if (!configFileName) {
    throw new Error('What is your config file name?  Use setConfigName.');
  }

  return getConfigInDir(dir);
}

export function setConfigName(name) {
  configFileName = name;
}
