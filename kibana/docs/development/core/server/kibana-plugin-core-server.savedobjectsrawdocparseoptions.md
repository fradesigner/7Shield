<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [SavedObjectsRawDocParseOptions](./kibana-plugin-core-server.savedobjectsrawdocparseoptions.md)

## SavedObjectsRawDocParseOptions interface

Options that can be specified when using the saved objects serializer to parse a raw document.

<b>Signature:</b>

```typescript
export interface SavedObjectsRawDocParseOptions 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [namespaceTreatment?](./kibana-plugin-core-server.savedobjectsrawdocparseoptions.namespacetreatment.md) | 'strict' \| 'lax' | <i>(Optional)</i> Optional setting to allow for lax handling of the raw document ID and namespace field. This is needed when a previously single-namespace object type is converted to a multi-namespace object type, and it is only intended to be used during upgrade migrations.<!-- -->If not specified, the default treatment is <code>strict</code>. |

