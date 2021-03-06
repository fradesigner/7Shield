<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsIncrementCounterOptions](./kibana-plugin-core-server.savedobjectsincrementcounteroptions.md)

## SavedObjectsIncrementCounterOptions interface


<b>Signature:</b>

```typescript
export interface SavedObjectsIncrementCounterOptions<Attributes = unknown> extends SavedObjectsBaseOptions 
```
<b>Extends:</b> SavedObjectsBaseOptions

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [initialize?](./kibana-plugin-core-server.savedobjectsincrementcounteroptions.initialize.md) | boolean | <i>(Optional)</i> (default=false) If true, sets all the counter fields to 0 if they don't already exist. Existing fields will be left as-is and won't be incremented. |
|  [migrationVersion?](./kibana-plugin-core-server.savedobjectsincrementcounteroptions.migrationversion.md) | SavedObjectsMigrationVersion | <i>(Optional)</i> [SavedObjectsMigrationVersion](./kibana-plugin-core-server.savedobjectsmigrationversion.md) |
|  [refresh?](./kibana-plugin-core-server.savedobjectsincrementcounteroptions.refresh.md) | MutatingOperationRefreshSetting | <i>(Optional)</i> (default='wait\_for') The Elasticsearch refresh setting for this operation. See [MutatingOperationRefreshSetting](./kibana-plugin-core-server.mutatingoperationrefreshsetting.md) |
|  [upsertAttributes?](./kibana-plugin-core-server.savedobjectsincrementcounteroptions.upsertattributes.md) | Attributes | <i>(Optional)</i> Attributes to use when upserting the document if it doesn't exist. |

