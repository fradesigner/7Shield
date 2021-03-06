/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { JsonValue } from '@kbn/utility-types';

export interface LogMessageFormattingRule {
  when: LogMessageFormattingCondition;
  format: LogMessageFormattingInstruction[];
}

export type LogMessageFormattingCondition =
  | LogMessageFormattingAllCondition
  | LogMessageFormattingExistsCondition
  | LogMessageFormattingExistsPrefixCondition
  | LogMessageFormattingFieldValueCondition;

export interface LogMessageFormattingAllCondition {
  all: LogMessageFormattingCondition[];
}

export interface LogMessageFormattingExistsCondition {
  exists: string[];
}

export interface LogMessageFormattingExistsPrefixCondition {
  existsPrefix: string[];
}

export interface LogMessageFormattingFieldValueCondition {
  values: {
    [fieldName: string]: LogMessageFormattingFieldValueConditionValue;
  };
}

export type LogMessageFormattingFieldValueConditionValue = JsonValue;

export type LogMessageFormattingInstruction =
  | LogMessageFormattingFieldReference
  | LogMessageFormattingFieldsPrefixReference
  | LogMessageFormattingConstant;

export interface LogMessageFormattingFieldReference {
  field: string;
}

export interface LogMessageFormattingFieldsPrefixReference {
  fieldsPrefix: string;
}

export interface LogMessageFormattingConstant {
  constant: string;
}
