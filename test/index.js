import { expect } from 'chai';
import * as app from '../src';
import path from 'path';
import fs from 'fs';

const fixtures = path.join(__dirname, 'fixtures');

app.setTopDir(fixtures);

function readFixtureConfig(relativePath) {
  const fileName = path.join(fixtures, relativePath);
  const file = fs.readFileSync(fileName, 'utf8');
  return JSON.parse(file);
}

function getHomePath() {
  return process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
}

describe('before setting config file name', () => {
  before(() => {
    app.setConfigName('');
  });

  it('should throw if it has not been set', () => {
    const fn = () => {
      app.getConfig();
    };
    expect(fn).to.throw('config file name');
  });
});

describe('single directory', () => {
  it('should find .singlerc', () => {
    const expected = readFixtureConfig('a/b/.singlerc');
    const dir = path.join(fixtures, 'a/b');
    app.setConfigName('.singlerc');
    const result = app.getConfig(dir);
    expect(result).to.eql(expected);
  });

  it('should return an empty object', () => {
    const expected = {};
    const dir = path.join(fixtures, 'a/b');
    app.setConfigName('.absentrc');
    const result = app.getConfig(dir);
    expect(result).to.eql(expected);
  });
});

describe('looking up directories', () => {
  it('should combine the configs', () => {
    const a = readFixtureConfig('a/.1rc');
    const b = readFixtureConfig('a/b/.1rc');
    const expected = Object.assign(a, b);
    const dir = path.join(fixtures, 'a/b');
    app.setConfigName('.1rc');
    const result = app.getConfig(dir);
    expect(result).to.eql(expected);
  });
});

describe('HOME', () => {
  let configFileName;
  let configFilePath;
  let config;
  let localConfig;
  let localConfigPath;
  let localConfigName;

  beforeEach(() => {
    configFileName = '.get-rc-test' + Math.random();
    const homePath = getHomePath();
    config = {
      path: homePath,
      name: configFileName,
      globalSetting: 1,
    };
    configFilePath = path.join(homePath, configFileName);
    fs.writeFileSync(configFilePath, JSON.stringify(config));

    localConfigPath = path.join(fixtures, 'a/b');
    localConfig = {
      path: localConfigPath,
      name: configFileName,
      localSetting: 2,
    };
    localConfigName = path.join(localConfigPath, configFileName);
    fs.writeFileSync(localConfigName, JSON.stringify(localConfig));
  });

  afterEach(() => {
    fs.unlinkSync(configFilePath);
    fs.unlinkSync(localConfigName);
  });

  it('should include config found in HOME', () => {
    const expected = Object.assign({}, config, localConfig);
    app.setConfigName(configFileName);
    const result = app.getConfig(localConfigPath);
    expect(result).to.eql(expected);
  });
});
