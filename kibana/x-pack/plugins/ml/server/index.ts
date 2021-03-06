/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

// TODO: https://github.com/elastic/kibana/issues/110898
/* eslint-disable @kbn/eslint/no_export_all */

import { PluginInitializerContext } from 'kibana/server';
import { MlServerPlugin } from './plugin';
export type { MlPluginSetup, MlPluginStart } from './plugin';
export * from './shared';

export const plugin = (ctx: PluginInitializerContext) => new MlServerPlugin(ctx);
