/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import type { FieldVisConfig, FileBasedFieldVisConfig } from './field_vis_config';
import { IndexPatternField } from '../../../../../../../../../src/plugins/data/common';

export interface FieldDataRowProps {
  config: FieldVisConfig | FileBasedFieldVisConfig;
  onAddFilter?: (field: IndexPatternField | string, value: string, type: '+' | '-') => void;
}
