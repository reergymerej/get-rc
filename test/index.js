import { expect } from 'chai';
import * as app from '../src';
import path from 'path';

const fixtures = path.join(__dirname, 'fixtures');

app.setConfigName('.testrc');

describe('looking up directories', () => {
  describe.only('cwd', () => {
    it('should find .testrc', () => {
      const expected = {
        foo: 'bar',
        baz: 'blah',
      };
      const dir = path.join(fixtures, 'single-dir-present');
      const result = app.getConfig(dir);
      expect(result).to.eql(expected);
    });

    it('should not find .*rc');
  });

  it('should look up until it reaches /');
  it('should look in ~');
  it('should merge found configs, applying nearest last');
});
