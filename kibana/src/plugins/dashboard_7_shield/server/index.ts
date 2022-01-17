import { PluginInitializerContext } from '../../../core/server';
import { Dashboard7ShieldPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, Kibana Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new Dashboard7ShieldPlugin(initializerContext);
}

export { Dashboard7ShieldPluginSetup, Dashboard7ShieldPluginStart } from './types';
