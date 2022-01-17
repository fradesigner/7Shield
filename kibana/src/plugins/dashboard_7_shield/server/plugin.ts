import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from '../../../core/server';

import { Dashboard7ShieldPluginSetup, Dashboard7ShieldPluginStart } from './types';
import { defineRoutes } from './routes';

export class Dashboard7ShieldPlugin
  implements Plugin<Dashboard7ShieldPluginSetup, Dashboard7ShieldPluginStart>
{
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public setup(core: CoreSetup) {
    this.logger.debug('Dashboard 7Shield: Setup');
    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(core: CoreStart) {
    this.logger.debug('Dashboard 7Shield: Started');
    return {};
  }

  public stop() {}
}
