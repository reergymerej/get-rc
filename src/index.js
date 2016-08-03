import fs from 'fs';
import path from 'path';

let configFileName = '';
let topDir = '/';

function getHomePath() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

function log(...args) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[get-rc]', ...args); //eslint-disable-line
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

// @param {Object[]} configs
function combineConfigs(configs) {
  const filteredConfigs = configs.reverse()
    .filter(config => !!config);
  return Object.assign(...filteredConfigs, {});
}

/**
* @param {String} dir
* @return {Object/null}
*/
function getConfigInDir(dir) {
  let config = null;

  try {
    const fileName = path.join(dir, configFileName);
    const file = fs.readFileSync(fileName, 'utf8');
    config = parseConfigFile(file);

  } catch (e) {
    // no config present
  } finally {
    return config;
  }
}

function walkUpTree(startDir, endDir, callback) {
  let currentDir = startDir;

  while (currentDir.indexOf(endDir) === 0) {
    callback(currentDir);
    currentDir = path.join(currentDir, '..');
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

  const configs = [];

  walkUpTree(dir, topDir, (currentDir) => {
    configs.push(getConfigInDir(currentDir));
  });

  configs.push(getConfigInDir(getHomePath()));

  return combineConfigs(configs);
}

export function setConfigName(name) {
  configFileName = name;
}

export function setTopDir(dir) {
  topDir = dir;
}
