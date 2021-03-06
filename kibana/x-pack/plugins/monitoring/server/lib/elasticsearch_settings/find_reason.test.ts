/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { findReason } from './find_reason';

describe('Elasticsearch Settings Find Reason for No Data', () => {
  const context = { context: 'unit_test' };

  describe('cascading reasons', () => {
    it('should trump { enabled: false } over other possible causes', async () => {
      const result = await findReason(
        {
          enabled: 'false',
          collection: {
            interval: -1,
          },
        },
        context,
        false
      );
      expect(result).toEqual({
        found: true,
        reason: {
          context: 'unit_test',
          data: 'false',
          property: 'xpack.monitoring.enabled',
        },
      });
    });

    it('should trump { collection.enabled: false } over interval setting', async () => {
      const result = await findReason(
        {
          collection: {
            interval: -1,
            enabled: false,
          },
        },
        context,
        false
      );
      expect(result).toEqual({
        found: true,
        reason: {
          context: 'unit_test',
          data: 'false',
          property: 'xpack.monitoring.collection.enabled',
        },
      });
    });

    it('should trump { collection.interval: -1 } over exporter setting', async () => {
      const result = await findReason(
        {
          collection: {
            interval: -1,
          },
          exporters: {
            coolExporterToIgnore: {},
          },
        },
        context,
        false
      );
      expect(result).toEqual({
        found: true,
        reason: {
          context: 'unit_test',
          data: '-1',
          property: 'xpack.monitoring.collection.interval',
        },
      });
    });
  });

  describe('collection interval', () => {
    it('should not flag collection interval if value is > 0', async () => {
      const result = await findReason({ collection: { interval: 1 } }, context, false);
      expect(result).toEqual({ found: false });
    });

    it('should flag collection interval for any invalid value', async () => {
      let result;

      result = await findReason({ collection: { interval: 0 } }, context, false);
      expect(result).toEqual({
        found: true,
        reason: {
          context: 'unit_test',
          data: '0',
          property: 'xpack.monitoring.collection.interval',
        },
      });

      result = await findReason({ collection: { interval: -10 } }, context, false);
      expect(result).toEqual({
        found: true,
        reason: {
          context: 'unit_test',
          data: '-10',
          property: 'xpack.monitoring.collection.interval',
        },
      });

      result = await findReason({ collection: { interval: null } }, context, false);
      expect(result).toEqual({
        found: true,
        reason: {
          context: 'unit_test',
          data: 'null',
          property: 'xpack.monitoring.collection.interval',
        },
      });
    });
  });

  it('should not flag enabled if value is true', async () => {
    const result = await findReason({ enabled: true }, context, false);
    expect(result).toEqual({ found: false });
  });

  it('should not flag exporters if value is undefined/null', async () => {
    let result;
    result = await findReason({ exporters: undefined }, context, false);
    expect(result).toEqual({ found: false });

    result = await findReason({ exporters: null }, context, false);
    expect(result).toEqual({ found: false });
  });

  describe('exporters', () => {
    it('should warn if all exporters are disabled', async () => {
      const input = {
        exporters: {
          my_local: {
            type: 'local',
            enabled: false,
          },
          my_local_2: {
            type: 'local',
            enabled: false,
          },
          my_http: {
            type: 'http',
            enabled: false,
          },
          my_http_2: {
            type: 'http',
            enabled: false,
          },
        },
      };
      const result = await findReason(input, context, false);
      expect(result).toEqual({
        found: true,
        reason: {
          context: 'unit_test',
          data: 'Exporters are disabled: my_local, my_local_2, my_http, my_http_2',
          property: 'xpack.monitoring.exporters',
        },
      });
    });

    it('should detect if we are on cloud and remote exporters are enabled but local exporters are not enabled', async () => {
      const input = {
        exporters: {
          my_http: {
            type: 'http',
            enabled: true,
          },
          my_local: {
            type: 'local',
            enabled: false,
          },
        },
      };

      const result = await findReason(input, context, true); // last element is to enable cloud
      expect(result).toEqual({
        found: true,
        reason: {
          context: 'unit_test',
          data: 'Cloud detected',
          property: 'xpack.monitoring.exporters.cloud_enabled',
        },
      });
    });

    it('should warn if all enabled exporters are remote', async () => {
      const input = {
        exporters: {
          my_local: {
            type: 'local',
            enabled: false,
          },
          my_http: {
            type: 'http',
            enabled: true,
          },
          my_http_2: {
            type: 'http',
            enabled: false,
          },
        },
      };
      const result = await findReason(input, context, false);
      expect(result).toEqual({
        found: true,
        reason: {
          context: 'unit_test',
          data: 'Remote exporters indicate a possible misconfiguration: my_http',
          property: 'xpack.monitoring.exporters',
        },
      });
    });

    it('should not warn if one local exporter is enabled', async () => {
      const input = {
        exporters: {
          my_local: {
            type: 'local',
            enabled: true,
          },
          my_local_2: {
            type: 'local',
            enabled: false,
          },
          my_http: {
            type: 'http',
            enabled: true,
          },
          my_http_2: {
            type: 'http',
            enabled: false,
          },
        },
      };
      const result = await findReason(input, context, false);
      expect(result).toEqual({ found: false });
    });
  });
});
