import { NavigationPublicPluginStart } from '../../navigation/public';

export interface Dashboard7ShieldPluginSetup {
  getGreeting: () => string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Dashboard7ShieldPluginStart {}

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
}
