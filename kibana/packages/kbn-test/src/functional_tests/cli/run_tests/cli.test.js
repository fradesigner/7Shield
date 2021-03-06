/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { Writable } from 'stream';

import { runTestsCli } from './cli';
import { checkMockConsoleLogSnapshot } from '../../test_helpers';

// Note: Stub the runTests function to keep testing only around the cli
// method and arguments.
jest.mock('../../tasks', () => ({
  runTests: jest.fn(),
}));

describe('run tests CLI', () => {
  describe('options', () => {
    const originalObjects = { process, console };
    const exitMock = jest.fn();
    const logMock = jest.fn(); // mock logging so we don't send output to the test results
    const argvMock = ['foo', 'foo'];

    const processMock = {
      exit: exitMock,
      argv: argvMock,
      stdout: new Writable(),
      cwd: jest.fn(),
      env: {
        ...originalObjects.process.env,
        TEST_ES_FROM: 'snapshot',
      },
    };

    beforeAll(() => {
      global.process = processMock;
      global.console = { log: logMock };
    });

    afterAll(() => {
      global.process = originalObjects.process;
      global.console = originalObjects.console;
    });

    beforeEach(() => {
      global.process.argv = [...argvMock];
      global.process.env = {
        ...originalObjects.process.env,
        TEST_ES_FROM: 'snapshot',
      };
      jest.resetAllMocks();
    });

    it('rejects boolean config value', async () => {
      global.process.argv.push('--config');

      await runTestsCli();

      expect(exitMock).toHaveBeenCalledWith(1);
      checkMockConsoleLogSnapshot(logMock);
    });

    it('rejects empty config value if no default passed', async () => {
      global.process.argv.push('--config', '');

      await runTestsCli();

      expect(exitMock).toHaveBeenCalledWith(1);
      checkMockConsoleLogSnapshot(logMock);
    });

    it('accepts empty config value if default passed', async () => {
      global.process.argv.push('--config', '');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalled();
    });

    it('rejects non-boolean value for bail', async () => {
      global.process.argv.push('--bail', 'peanut');

      await runTestsCli(['foo']);

      expect(exitMock).toHaveBeenCalledWith(1);
      checkMockConsoleLogSnapshot(logMock);
    });

    it('accepts string value for kibana-install-dir', async () => {
      global.process.argv.push('--kibana-install-dir', 'foo');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalled();
    });

    it('rejects boolean value for kibana-install-dir', async () => {
      global.process.argv.push('--kibana-install-dir');

      await runTestsCli(['foo']);

      expect(exitMock).toHaveBeenCalledWith(1);
      checkMockConsoleLogSnapshot(logMock);
    });

    it('accepts boolean value for updateBaselines', async () => {
      global.process.argv.push('--updateBaselines');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalledWith();
    });

    it('accepts boolean value for updateSnapshots', async () => {
      global.process.argv.push('--updateSnapshots');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalledWith();
    });

    it('accepts boolean value for -u', async () => {
      global.process.argv.push('-u');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalledWith();
    });

    it('accepts source value for esFrom', async () => {
      global.process.argv.push('--esFrom', 'source');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalled();
    });

    it('rejects non-enum value for esFrom', async () => {
      global.process.argv.push('--esFrom', 'butter');

      await runTestsCli(['foo']);

      expect(exitMock).toHaveBeenCalledWith(1);
      checkMockConsoleLogSnapshot(logMock);
    });

    it('accepts value for grep', async () => {
      global.process.argv.push('--grep', 'management');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalled();
    });

    it('accepts debug option', async () => {
      global.process.argv.push('--debug');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalled();
    });

    it('accepts silent option', async () => {
      global.process.argv.push('--silent');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalled();
    });

    it('accepts quiet option', async () => {
      global.process.argv.push('--quiet');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalled();
    });

    it('accepts verbose option', async () => {
      global.process.argv.push('--verbose');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalled();
    });

    it('accepts extra server options', async () => {
      global.process.argv.push('--', '--server.foo=bar');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalled();
    });

    it('accepts help option even if invalid options passed', async () => {
      global.process.argv.push('--debug', '--aintnothang', '--help');

      await runTestsCli(['foo']);

      expect(exitMock).not.toHaveBeenCalledWith(1);
      checkMockConsoleLogSnapshot(logMock);
    });

    it('rejects invalid options even if valid options exist', async () => {
      global.process.argv.push('--debug', '--aintnothang', '--bail');

      await runTestsCli(['foo']);

      expect(exitMock).toHaveBeenCalledWith(1);
      checkMockConsoleLogSnapshot(logMock);
    });
  });
});
