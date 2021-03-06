<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [IKibanaResponse](./kibana-plugin-core-server.ikibanaresponse.md)

## IKibanaResponse interface

A response data object, expected to returned as a result of [RequestHandler](./kibana-plugin-core-server.requesthandler.md) execution

<b>Signature:</b>

```typescript
export interface IKibanaResponse<T extends HttpResponsePayload | ResponseError = any> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [options](./kibana-plugin-core-server.ikibanaresponse.options.md) | HttpResponseOptions |  |
|  [payload?](./kibana-plugin-core-server.ikibanaresponse.payload.md) | T | <i>(Optional)</i> |
|  [status](./kibana-plugin-core-server.ikibanaresponse.status.md) | number |  |

