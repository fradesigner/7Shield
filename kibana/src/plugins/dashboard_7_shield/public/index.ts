import './index.scss';

import { Dashboard7ShieldPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new Dashboard7ShieldPlugin();
}
export { Dashboard7ShieldPluginSetup, Dashboard7ShieldPluginStart } from './types';
