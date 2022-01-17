import { i18n } from '@kbn/i18n';
import { AppMountParameters, CoreSetup, CoreStart, Plugin } from '../../../core/public';
import {
  Dashboard7ShieldPluginSetup,
  Dashboard7ShieldPluginStart,
  AppPluginStartDependencies,
} from './types';
import { PLUGIN_NAME } from '../common';

export class Dashboard7ShieldPlugin
  implements Plugin<Dashboard7ShieldPluginSetup, Dashboard7ShieldPluginStart>
{
  public setup(core: CoreSetup): Dashboard7ShieldPluginSetup {
    // Register an application into the side navigation menu
    core.application.register({
      id: 'dashboard7Shield',
      title: PLUGIN_NAME,
      async mount(params: AppMountParameters) {
        // Load application bundle
        const { renderApp } = await import('./application');
        // Get start services as specified in kibana.json
        const [coreStart, depsStart] = await core.getStartServices();
        // Render the application
        return renderApp(coreStart, depsStart as AppPluginStartDependencies, params);
      },
    });

    // Return methods that should be available to other plugins
    return {
      getGreeting() {
        return i18n.translate('dashboard7Shield.greetingText', {
          defaultMessage: 'Hello from {name}!',
          values: {
            name: PLUGIN_NAME,
          },
        });
      },
    };
  }

  public start(core: CoreStart): Dashboard7ShieldPluginStart {
    return {};
  }

  public stop() {}
}
