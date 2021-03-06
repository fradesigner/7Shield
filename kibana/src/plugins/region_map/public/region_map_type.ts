/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { i18n } from '@kbn/i18n';

import { VisTypeDefinition } from '../../visualizations/public';
import { VectorLayer } from '../../maps_ems/public';
import { ORIGIN } from '../../maps_ems/common';

import { getDeprecationMessage } from './get_deprecation_message';
import { RegionMapVisualizationDependencies } from './plugin';
import { createRegionMapOptions } from './components';
import { toExpressionAst } from './to_ast';
import { RegionMapVisParams } from './region_map_types';
import { mapToLayerWithId } from './util';
import { setTmsLayers, setVectorLayers } from './kibana_services';

export function createRegionMapTypeDefinition({
  uiSettings,
  regionmapsConfig,
  getServiceSettings,
}: RegionMapVisualizationDependencies): VisTypeDefinition<RegionMapVisParams> {
  return {
    name: 'region_map',
    getInfoMessage: getDeprecationMessage,
    title: i18n.translate('regionMap.mapVis.regionMapTitle', { defaultMessage: 'Region Map' }),
    description: i18n.translate('regionMap.mapVis.regionMapDescription', {
      defaultMessage:
        'Show metrics on a thematic map. Use one of the \
provided base maps, or add your own. Darker colors represent higher values.',
    }),
    icon: 'visMapRegion',
    visConfig: {
      defaults: {
        legendPosition: 'bottomright',
        addTooltip: true,
        colorSchema: 'Yellow to Red',
        emsHotLink: '',
        isDisplayWarning: true,
        wms: uiSettings.get('visualization:tileMap:WMSdefaults'),
        mapZoom: 2,
        mapCenter: [0, 0],
        outlineWeight: 1,
        showAllShapes: true, // still under consideration
      },
    },
    editorConfig: {
      optionsTemplate: createRegionMapOptions(getServiceSettings),
      schemas: [
        {
          group: 'metrics',
          name: 'metric',
          title: i18n.translate('regionMap.mapVis.regionMapEditorConfig.schemas.metricTitle', {
            defaultMessage: 'Value',
          }),
          min: 1,
          max: 1,
          aggFilter: [
            'count',
            'avg',
            'sum',
            'min',
            'max',
            'cardinality',
            'top_hits',
            'sum_bucket',
            'min_bucket',
            'max_bucket',
            'avg_bucket',
          ],
          defaults: [{ schema: 'metric', type: 'count' }],
        },
        {
          group: 'buckets',
          name: 'segment',
          title: i18n.translate('regionMap.mapVis.regionMapEditorConfig.schemas.segmentTitle', {
            defaultMessage: 'Shape field',
          }),
          min: 1,
          max: 1,
          aggFilter: ['terms'],
        },
      ],
    },
    toExpressionAst,
    setup: async (vis) => {
      const serviceSettings = await getServiceSettings();
      const tmsLayers = await serviceSettings.getTMSServices();
      setTmsLayers(tmsLayers);
      setVectorLayers([]);

      if (!vis.params.wms.selectedTmsLayer && tmsLayers.length) {
        vis.params.wms.selectedTmsLayer = tmsLayers[0];
      }

      const vectorLayers = regionmapsConfig.layers.map(
        mapToLayerWithId.bind(null, ORIGIN.KIBANA_YML)
      );
      let selectedLayer = vectorLayers[0];
      let selectedJoinField = selectedLayer ? selectedLayer.fields[0] : undefined;
      if (regionmapsConfig.includeElasticMapsService) {
        const layers = await serviceSettings.getFileLayers();
        const newLayers = layers
          .map(mapToLayerWithId.bind(null, ORIGIN.EMS))
          .filter(
            (layer: VectorLayer) =>
              !vectorLayers.some((vectorLayer) => vectorLayer.layerId === layer.layerId)
          );

        // backfill v1 manifest for now
        newLayers.forEach((layer: VectorLayer) => {
          if (layer.format === 'geojson') {
            layer.format = {
              type: 'geojson',
            };
          }
        });

        const allVectorLayers = [...vectorLayers, ...newLayers];
        setVectorLayers(allVectorLayers);

        [selectedLayer] = allVectorLayers;
        selectedJoinField = selectedLayer ? selectedLayer.fields[0] : undefined;

        if (selectedLayer && !vis.params.selectedLayer && selectedLayer.isEMS) {
          vis.params.emsHotLink = await serviceSettings.getEMSHotLink(selectedLayer);
        }
      }

      if (!vis.params.selectedLayer) {
        vis.params.selectedLayer = selectedLayer;
        vis.params.selectedJoinField = selectedJoinField;
      }

      return vis;
    },
    requiresSearch: true,
  };
}
