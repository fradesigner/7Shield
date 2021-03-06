/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { useState } from 'react';

import { upperFirst } from 'lodash';

import {
  EuiButtonIcon,
  EuiCopy,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiFieldPassword,
  EuiToolTip,
} from '@elastic/eui';
import { i18n } from '@kbn/i18n';

export const COPY_TOOLTIP = i18n.translate(
  'xpack.enterpriseSearch.workplaceSearch.credentialItem.copy.tooltip',
  {
    defaultMessage: 'Copy to clipboard',
  }
);

export const COPIED_TOOLTIP = i18n.translate(
  'xpack.enterpriseSearch.workplaceSearch.credentialItem.copied.tooltip',
  {
    defaultMessage: 'Copied!',
  }
);

interface CredentialItemProps {
  label: string;
  value: string;
  testSubj: string;
  hideCopy?: boolean;
}

const inputSelectAll = (e: React.MouseEvent<HTMLInputElement>) => e.currentTarget.select();

export const CredentialItem: React.FC<CredentialItemProps> = ({
  label,
  value,
  testSubj,
  hideCopy,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const SHOW_CREDENTIAL_TOOLTIP = i18n.translate(
    'xpack.enterpriseSearch.workplaceSearch.credentialItem.show.tooltip',
    {
      defaultMessage: 'Show {credential}.',
      values: { credential: label },
    }
  );

  return (
    <EuiFlexGroup
      alignItems="center"
      gutterSize="none"
      responsive={false}
      data-test-subj={testSubj}
    >
      <EuiFlexItem grow={1}>
        <EuiText size="s">
          <strong>{label}</strong>
        </EuiText>
      </EuiFlexItem>
      <EuiFlexItem grow={2}>
        <EuiFlexGroup gutterSize="s" alignItems="center" responsive={false}>
          {!hideCopy && (
            <EuiFlexItem grow={false}>
              <EuiCopy
                beforeMessage={COPY_TOOLTIP}
                afterMessage={COPIED_TOOLTIP}
                textToCopy={value}
              >
                {(copy) => (
                  <EuiButtonIcon
                    aria-label={COPY_TOOLTIP}
                    onClick={copy}
                    iconType="copy"
                    color="primary"
                  />
                )}
              </EuiCopy>
            </EuiFlexItem>
          )}
          <EuiFlexItem grow={false}>
            <EuiToolTip position="top" content={SHOW_CREDENTIAL_TOOLTIP}>
              <EuiButtonIcon
                aria-label={SHOW_CREDENTIAL_TOOLTIP}
                data-test-subj={`Show${upperFirst(testSubj)}`}
                onClick={() => setIsVisible(!isVisible)}
                iconType={isVisible ? 'eyeClosed' : 'eye'}
                color="primary"
              />
            </EuiToolTip>
          </EuiFlexItem>
          <EuiFlexItem>
            {!isVisible ? (
              <EuiFieldPassword placeholder={label} value={value} readOnly compressed disabled />
            ) : (
              <EuiFieldText
                readOnly
                placeholder="Compressed"
                data-test-subj={`${testSubj}Input`}
                value={value}
                compressed
                onClick={inputSelectAll}
              />
            )}
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
