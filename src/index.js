import fs from 'fs';
import path from 'path';

let configFileName = '';
let topDir = '/';

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

/**
* Find and merge all configs.
* @param {String} [dir] - defaults to cwd
* @return {Object}
*/
export function getConfig(dir = process.cwd()) {
  if (!configFileName) {
    throw new Error('What is your config file name?  Use setConfigName.');
  }

  const dirs = dir.replace(topDir, '').split(path.sep).slice(1);
  const configs = [];
  while (dirs.length) {
    const current = path.join(topDir, dirs.join(path.sep));
    configs.push(getConfigInDir(current));
    dirs.pop();
  }

  const current = topDir;
  configs.push(getConfigInDir(current));

  return combineConfigs(configs);
}

export function setConfigName(name) {
  configFileName = name;
}

export function setTopDir(dir) {
  topDir = dir;
}
