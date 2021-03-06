<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [kibana-plugin-core-server](./kibana-plugin-core-server.md) &gt; [CustomHttpResponseOptions](./kibana-plugin-core-server.customhttpresponseoptions.md)

## CustomHttpResponseOptions interface

HTTP response parameters for a response with adjustable status code.

<b>Signature:</b>

```typescript
export interface CustomHttpResponseOptions<T extends HttpResponsePayload | ResponseError> 
```

## Properties

|  Property | Type | Description |
|  --- | --- | --- |
|  [body?](./kibana-plugin-core-server.customhttpresponseoptions.body.md) | T | <i>(Optional)</i> HTTP message to send to the client |
|  [bypassErrorFormat?](./kibana-plugin-core-server.customhttpresponseoptions.bypasserrorformat.md) | boolean | <i>(Optional)</i> Bypass the default error formatting |
|  [headers?](./kibana-plugin-core-server.customhttpresponseoptions.headers.md) | ResponseHeaders | <i>(Optional)</i> HTTP Headers with additional information about response |
|  [statusCode](./kibana-plugin-core-server.customhttpresponseoptions.statuscode.md) | number |  |

