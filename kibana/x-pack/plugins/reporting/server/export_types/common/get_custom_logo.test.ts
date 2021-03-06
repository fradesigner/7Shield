/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { ReportingCore } from '../..';
import {
  createMockConfig,
  createMockConfigSchema,
  createMockLevelLogger,
  createMockReportingCore,
} from '../../test_helpers';
import { getConditionalHeaders } from '.';
import { getCustomLogo } from './get_custom_logo';

let mockReportingPlugin: ReportingCore;

const logger = createMockLevelLogger();

beforeEach(async () => {
  mockReportingPlugin = await createMockReportingCore(createMockConfigSchema());
});

test(`gets logo from uiSettings`, async () => {
  const permittedHeaders = {
    foo: 'bar',
    baz: 'quix',
  };

  const mockGet = jest.fn();
  mockGet.mockImplementationOnce((...args: string[]) => {
    if (args[0] === 'xpackReporting:customPdfLogo') {
      return 'purple pony';
    }
    throw new Error('wrong caller args!');
  });
  mockReportingPlugin.getUiSettingsServiceFactory = jest.fn().mockResolvedValue({
    get: mockGet,
  });

  const conditionalHeaders = getConditionalHeaders(
    createMockConfig(createMockConfigSchema()),
    permittedHeaders
  );

  const { logo } = await getCustomLogo(
    mockReportingPlugin,
    conditionalHeaders,
    'spaceyMcSpaceIdFace',
    logger
  );

  expect(mockGet).toBeCalledWith('xpackReporting:customPdfLogo');
  expect(logo).toBe('purple pony');
});
