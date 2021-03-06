<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-public](./kibana-plugin-core-public.md) &gt; [PluginInitializerContext](./kibana-plugin-core-public.plugininitializercontext.md)

## PluginInitializerContext interface

The available core services passed to a `PluginInitializer`

<b>Signature:</b>

```typescript
export interface PluginInitializerContext<ConfigSchema extends object = object> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [config](./kibana-plugin-core-public.plugininitializercontext.config.md) | { get: &lt;T extends object = ConfigSchema&gt;() =&gt; T; } |  |
|  [env](./kibana-plugin-core-public.plugininitializercontext.env.md) | { mode: Readonly&lt;EnvironmentMode&gt;; packageInfo: Readonly&lt;PackageInfo&gt;; } |  |
|  [opaqueId](./kibana-plugin-core-public.plugininitializercontext.opaqueid.md) | PluginOpaqueId | A symbol used to identify this plugin in the system. Needed when registering handlers or context providers. |

