/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { nodeTypeLabel, nodeTypeClass } from './lookups';
import {
  ElasticsearchLegacySource,
  ElasticsearchMetricbeatNode,
} from '../../../../common/types/es';

/*
 * Note: currently only `node` and `master` are supported due to
 * https://github.com/elastic/x-pack-kibana/issues/608
 * @param {Object} node - a node object from getNodes / getNodeSummary
 * @param {Object} type - the node type calculated from `calculateNodeType`
 */
export function getNodeTypeClassLabel(
  node: ElasticsearchLegacySource['source_node'] | ElasticsearchMetricbeatNode,
  type: keyof typeof nodeTypeLabel
) {
  const nodeType = node && 'master' in node ? 'master' : type;
  const returnObj = {
    nodeType,
    nodeTypeLabel: nodeTypeLabel[nodeType],
    nodeTypeClass: nodeTypeClass[nodeType],
  };
  return returnObj;
}
