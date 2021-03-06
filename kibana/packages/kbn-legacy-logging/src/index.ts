/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

export type { LegacyLoggingConfig } from './schema';
export { legacyLoggingConfigSchema } from './schema';
export { attachMetaData } from './metadata';
export { setupLoggingRotate } from './rotate';
export { setupLogging, reconfigureLogging } from './setup_logging';
export { getLoggingConfiguration } from './get_logging_config';
export { LegacyLoggingServer } from './legacy_logging_server';
