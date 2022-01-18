import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';

export interface DashBoardPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DashBoardPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
