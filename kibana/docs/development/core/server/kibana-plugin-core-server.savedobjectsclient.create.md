<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsClient](./kibana-plugin-core-server.savedobjectsclient.md) &gt; [create](./kibana-plugin-core-server.savedobjectsclient.create.md)

## SavedObjectsClient.create() method

Persists a SavedObject

<b>Signature:</b>

```typescript
create<T = unknown>(type: string, attributes: T, options?: SavedObjectsCreateOptions): Promise<SavedObject<T>>;
```

## Parameters

|  Parameter | Type | Description |
|  --- | --- | --- |
|  type | string |  |
|  attributes | T |  |
|  options | SavedObjectsCreateOptions |  |

<b>Returns:</b>

Promise&lt;SavedObject&lt;T&gt;&gt;
