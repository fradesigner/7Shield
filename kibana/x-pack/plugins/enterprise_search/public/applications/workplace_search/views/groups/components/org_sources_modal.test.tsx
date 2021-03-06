/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { setMockActions, setMockValues } from '../../../../__mocks__/kea_logic';
import { groups } from '../../../__mocks__/groups.mock';

import React from 'react';

import { shallow } from 'enzyme';

import { GroupManagerModal } from './group_manager_modal';
import { OrgSourcesModal } from './org_sources_modal';
import { SourcesList } from './sources_list';

const group = groups[0];

const addGroupSource = jest.fn();
const selectAllSources = jest.fn();
const hideOrgSourcesModal = jest.fn();
const removeGroupSource = jest.fn();
const saveGroupSources = jest.fn();

describe('OrgSourcesModal', () => {
  it('renders', () => {
    setMockActions({
      addGroupSource,
      selectAllSources,
      hideOrgSourcesModal,
      removeGroupSource,
      saveGroupSources,
    });

    setMockValues({
      group,
      selectedGroupSources: [],
      contentSources: group.contentSources,
    });

    const wrapper = shallow(<OrgSourcesModal />);

    expect(wrapper.find(SourcesList)).toHaveLength(1);
    expect(wrapper.find(GroupManagerModal)).toHaveLength(1);
  });
});
