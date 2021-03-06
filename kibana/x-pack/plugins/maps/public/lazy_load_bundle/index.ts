/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { IndexPatternsContract } from 'src/plugins/data/public';
import { AppMountParameters } from 'kibana/public';
import { Embeddable, IContainer } from '../../../../../src/plugins/embeddable/public';
import { LayerDescriptor } from '../../common/descriptor_types';
import { MapEmbeddableConfig, MapEmbeddableInput, MapEmbeddableOutput } from '../embeddable/types';
import type { CreateLayerDescriptorParams } from '../classes/sources/es_search_source';
import type { EMSTermJoinConfig, SampleValuesConfig } from '../ems_autosuggest';

let loadModulesPromise: Promise<LazyLoadedMapModules>;

interface LazyLoadedMapModules {
  MapEmbeddable: new (
    config: MapEmbeddableConfig,
    initialInput: MapEmbeddableInput,
    parent?: IContainer
  ) => Embeddable<MapEmbeddableInput, MapEmbeddableOutput>;
  getIndexPatternService: () => IndexPatternsContract;
  getMapsCapabilities: () => any;
  renderApp: (params: AppMountParameters, AppUsageTracker: React.FC) => Promise<() => void>;
  createSecurityLayerDescriptors: (
    indexPatternId: string,
    indexPatternTitle: string
  ) => LayerDescriptor[];
  createTileMapLayerDescriptor: ({
    label,
    mapType,
    colorSchema,
    indexPatternId,
    geoFieldName,
    metricAgg,
    metricFieldName,
  }: {
    label: string;
    mapType: string;
    colorSchema: string;
    indexPatternId?: string;
    geoFieldName?: string;
    metricAgg: string;
    metricFieldName?: string;
  }) => LayerDescriptor | null;
  createRegionMapLayerDescriptor: ({
    label,
    emsLayerId,
    leftFieldName,
    termsFieldName,
    termsSize,
    colorSchema,
    indexPatternId,
    indexPatternTitle,
    metricAgg,
    metricFieldName,
  }: {
    label: string;
    emsLayerId?: string;
    leftFieldName?: string;
    termsFieldName?: string;
    termsSize?: number;
    colorSchema: string;
    indexPatternId?: string;
    indexPatternTitle?: string;
    metricAgg: string;
    metricFieldName?: string;
  }) => LayerDescriptor | null;
  createBasemapLayerDescriptor: () => LayerDescriptor | null;
  createESSearchSourceLayerDescriptor: (params: CreateLayerDescriptorParams) => LayerDescriptor;
  suggestEMSTermJoinConfig: (config: SampleValuesConfig) => Promise<EMSTermJoinConfig | null>;
}

export async function lazyLoadMapModules(): Promise<LazyLoadedMapModules> {
  if (typeof loadModulesPromise !== 'undefined') {
    return loadModulesPromise;
  }

  loadModulesPromise = new Promise(async (resolve, reject) => {
    try {
      const {
        MapEmbeddable,
        getIndexPatternService,
        getMapsCapabilities,
        renderApp,
        createSecurityLayerDescriptors,
        createTileMapLayerDescriptor,
        createRegionMapLayerDescriptor,
        createBasemapLayerDescriptor,
        createESSearchSourceLayerDescriptor,
        suggestEMSTermJoinConfig,
      } = await import('./lazy');
      resolve({
        MapEmbeddable,
        getIndexPatternService,
        getMapsCapabilities,
        renderApp,
        createSecurityLayerDescriptors,
        createTileMapLayerDescriptor,
        createRegionMapLayerDescriptor,
        createBasemapLayerDescriptor,
        createESSearchSourceLayerDescriptor,
        suggestEMSTermJoinConfig,
      });
    } catch (error) {
      reject(error);
    }
  });
  return loadModulesPromise;
}
