/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import moment from 'moment';
import { get } from 'lodash';
import { ElasticsearchMetric } from '../../../metrics';
import { createQuery } from '../../../create_query';
import { LegacyRequest, Bucket } from '../../../../types';

export async function getNodeIds(
  req: LegacyRequest,
  indexPattern: string,
  { clusterUuid }: { clusterUuid: string },
  size: number
) {
  const start = moment.utc(req.payload.timeRange.min).valueOf();
  const end = moment.utc(req.payload.timeRange.max).valueOf();

  const params = {
    index: indexPattern,
    size: 0,
    ignore_unavailable: true,
    filter_path: ['aggregations.composite_data.buckets'],
    body: {
      query: createQuery({
        type: 'node_stats',
        start,
        end,
        metric: ElasticsearchMetric.getMetricFields(),
        clusterUuid,
      }),
      aggs: {
        composite_data: {
          composite: {
            size,
            sources: [
              {
                name: {
                  terms: {
                    field: 'source_node.name',
                  },
                },
              },
              {
                uuid: {
                  terms: {
                    field: 'source_node.uuid',
                  },
                },
              },
            ],
          },
        },
      },
    },
  };

  const { callWithRequest } = req.server.plugins.elasticsearch.getCluster('monitoring');
  const response = await callWithRequest(req, 'search', params);
  return get(response, 'aggregations.composite_data.buckets', []).map(
    (bucket: Bucket) => bucket.key
  );
}
