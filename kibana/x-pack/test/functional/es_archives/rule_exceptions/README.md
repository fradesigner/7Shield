Within this folder is input test data for tests such as:

```ts
security_and_spaces/tests/operator_data_types
security_and_spaces/tests/create_endpoint_exceptions.ts
```

where these are small ECS compliant input indexes that try to express tests that exercise different parts of
the detection engine around creating and validating that the exceptions part of the detection engine functions.
Compliant meaning that these might contain extra fields but should not clash with ECS. Nothing stopping anyone
from being ECS strict and not having additional extra fields but the extra fields and mappings are to just try
and keep these tests simple and small.
