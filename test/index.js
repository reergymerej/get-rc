import { expect } from 'chai';
import * as app from '../src';
import path from 'path';
import fs from 'fs';

const fixtures = path.join(__dirname, 'fixtures');

app.setConfigName('.testrc');
app.setTopDir(fixtures);

function readFixtureConfig(relativePath) {
  const fileName = path.join(fixtures, relativePath);
  const file = fs.readFileSync(fileName, 'utf8');
  return JSON.parse(file);
}

describe('before setting config file name', () => {
  before(() => {
    app.setConfigName('');
  });

  after(() => {
    app.setConfigName('.testrc');
  });

  it('should throw if it has not been set', () => {
    const fn = () => {
      app.getConfig();
    };
    expect(fn).to.throw('config file name');
  });
});

describe('looking up directories', () => {
  describe('single directory', () => {
    it('should find .testrc', () => {
      const expected = readFixtureConfig('single-dir-present/.testrc');
      const dir = path.join(fixtures, 'single-dir-present');
      const result = app.getConfig(dir);
      expect(result).to.eql(expected);
    });

    it('should return an empty object', () => {
      const expected = {};
      const dir = path.join(fixtures, 'single-dir-absent');
      const result = app.getConfig(dir);
      expect(result).to.eql(expected);
    });
  });

  describe('looking up directories', () => {
    it('should combine the configs', () => {
      const a = readFixtureConfig('multiple-dirs/a/.1.rc');
      const b = readFixtureConfig('multiple-dirs/a/b/.1.rc');
      const expected = Object.assign(a, b);
      const dir = path.join(fixtures, 'multiple-dirs/a/b');
      app.setConfigName('.1.rc');
      const result = app.getConfig(dir);
      expect(result).to.eql(expected);
    });

  });
  // it('should look up until it reaches /');
  // it('should look in ~');
  // it('should merge found configs, applying nearest last');
});
