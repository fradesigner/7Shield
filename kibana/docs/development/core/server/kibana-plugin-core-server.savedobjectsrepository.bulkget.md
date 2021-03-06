<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsRepository](./kibana-plugin-core-server.savedobjectsrepository.md) &gt; [bulkGet](./kibana-plugin-core-server.savedobjectsrepository.bulkget.md)

## SavedObjectsRepository.bulkGet() method

Returns an array of objects by id

<b>Signature:</b>

```typescript
bulkGet<T = unknown>(objects?: SavedObjectsBulkGetObject[], options?: SavedObjectsBaseOptions): Promise<SavedObjectsBulkResponse<T>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  objects | SavedObjectsBulkGetObject\[\] | an array of objects containing id, type and optionally fields |
|  options | SavedObjectsBaseOptions |  {<!-- -->string<!-- -->} \[options.namespace\] |

<b>Returns:</b>

Promise&lt;SavedObjectsBulkResponse&lt;T&gt;&gt;

{<!-- -->promise<!-- -->} - { saved\_objects: \[{ id, type, version, attributes }<!-- -->\] }

## Example

bulkGet(\[ { id: 'one', type: 'config' }<!-- -->, { id: 'foo', type: 'index-pattern' } \])

