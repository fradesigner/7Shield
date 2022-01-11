<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectTypeExcludeFromUpgradeFilterHook](./kibana-plugin-core-server.savedobjecttypeexcludefromupgradefilterhook.md)

## SavedObjectTypeExcludeFromUpgradeFilterHook type

If defined, allows a type to run a search query and return a query filter that may match any documents which may be excluded from the next migration upgrade process. Useful for cleaning up large numbers of old documents which are no longer needed and may slow the migration process.

If this hook fails, the migration will proceed without these documents having been filtered out, so this should not be used as a guarantee that these documents have been deleted.

Experimental and subject to change

<b>Signature:</b>

```typescript
export declare type SavedObjectTypeExcludeFromUpgradeFilterHook = (toolkit: {
    readonlyEsClient: Pick<ElasticsearchClient, 'search'>;
}) => estypes.QueryDslQueryContainer | Promise<estypes.QueryDslQueryContainer>;
```