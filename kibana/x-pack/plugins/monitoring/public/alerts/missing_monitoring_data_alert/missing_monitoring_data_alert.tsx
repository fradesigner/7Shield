/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
// eslint-disable-next-line @kbn/eslint/no-restricted-paths
import { AlertTypeModel } from '../../../../triggers_actions_ui/public/types';
import { validate } from './validation';
import {
  RULE_MISSING_MONITORING_DATA,
  RULE_DETAILS,
  RULE_REQUIRES_APP_CONTEXT,
} from '../../../common/constants';
import { Expression } from './expression';

export function createMissingMonitoringDataAlertType(): AlertTypeModel {
  return {
    id: RULE_MISSING_MONITORING_DATA,
    description: RULE_DETAILS[RULE_MISSING_MONITORING_DATA].description,
    iconClass: 'bell',
    documentationUrl(docLinks) {
      return `${docLinks.links.monitoring.alertsKibanaMissingData}`;
    },
    alertParamsExpression: (props: any) => (
      <Expression
        {...props}
        paramDetails={RULE_DETAILS[RULE_MISSING_MONITORING_DATA].paramDetails}
      />
    ),
    validate,
    defaultActionMessage: '{{context.internalFullMessage}}',
    requiresAppContext: RULE_REQUIRES_APP_CONTEXT,
  };
}
