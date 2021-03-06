import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../src/core/server';

import { DashBoardPluginSetup, DashBoardPluginStart } from './types';
import { defineRoutes } from './routes';

export class DashBoardPlugin implements Plugin<DashBoardPluginSetup, DashBoardPluginStart> {
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('DashBoard: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('DashBoard: Started');
    return {};
  }

  public stop() {}
}
