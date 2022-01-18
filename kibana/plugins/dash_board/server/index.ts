import { PluginInitializerContext } from '../../../src/core/server';
import { DashBoardPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new DashBoardPlugin(initializerContext);
}

export { DashBoardPluginSetup, DashBoardPluginStart } from './types';
