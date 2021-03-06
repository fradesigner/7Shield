/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { get, sortBy } from 'lodash';
import React from 'react';
import { Shard } from './shard';
import { calculateClass } from '../lib/calculate_class';
import { EuiFlexGroup, EuiFlexItem, EuiIcon, EuiLink } from '@elastic/eui';
import { getSafeForExternalLink } from '../../../../lib/get_safe_for_external_link';

const generateQueryAndLink = (data) => {
  let type = 'indices';
  let ident = data.name;
  if (data.type === 'node') {
    type = 'nodes';
    ident = data.id;
  }
  return getSafeForExternalLink(`#/elasticsearch/${type}/${ident}`);
};

function sortByName(item) {
  if (item.type === 'node') {
    return [!item.master, item.name];
  }
  return [item.name];
}

export class Assigned extends React.Component {
  createShard = (shard) => {
    const type = get(shard, 'shard.primary', shard.primary) ? 'primary' : 'replica';
    const key = `${get(shard, 'index.name', shard.index)}.${get(
      shard,
      'node.name',
      shard.node
    )}.${type}.${get(shard, 'shard.state', shard.state)}.${get(
      shard,
      'shard.number',
      shard.shard
    )}`;
    return <Shard shard={shard} key={key} />;
  };

  createChild = (data) => {
    const key = data.id;
    const initialClasses = ['monChild'];
    if (data.type === 'index') {
      initialClasses.push('monChild--index');
    }
    const shardStats = get(this.props.shardStats.indices, key);
    if (shardStats) {
      switch (shardStats.status) {
        case 'red':
          initialClasses.push('monChild--danger');
          break;
        case 'yellow':
          initialClasses.push('monChild--warning');
          break;
      }
    }

    // TODO: redesign for shard allocation
    const name = <EuiLink href={generateQueryAndLink(data)}>{data.name}</EuiLink>;
    const master =
      data.node_type === 'master' ? <EuiIcon type="starFilledSpace" color="primary" /> : null;
    const shards = sortBy(data.children, 'shard').map(this.createShard);

    return (
      <EuiFlexItem
        grow={false}
        className={calculateClass(data, initialClasses.join(' '))}
        key={key}
        data-test-subj={`clusterView-Assigned-${key}`}
        data-status={shardStats && shardStats.status}
      >
        <EuiFlexGroup gutterSize="xs">
          <EuiFlexItem grow={false} className="monChild__title eui-textNoWrap">
            <EuiFlexGroup gutterSize="xs">
              <EuiFlexItem grow={false}>{name}</EuiFlexItem>
              <EuiFlexItem grow={false}>{master}</EuiFlexItem>
            </EuiFlexGroup>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiFlexGroup gutterSize="s">{shards}</EuiFlexGroup>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlexItem>
    );
  };

  render() {
    const data = sortBy(this.props.data, sortByName).map(this.createChild);
    return (
      <td className="monAssigned">
        <EuiFlexGroup wrap className="monAssigned__children">
          {data}
        </EuiFlexGroup>
      </td>
    );
  }
}
