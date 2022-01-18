import './index.scss';

import { DashBoardPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, Kibana Platform `plugin()` initializer.
export function plugin() {
  return new DashBoardPlugin();
}
export { DashBoardPluginSetup, DashBoardPluginStart } from './types';
