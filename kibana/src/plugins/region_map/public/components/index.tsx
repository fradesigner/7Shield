/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { lazy } from 'react';
import { IServiceSettings } from 'src/plugins/maps_ems/public';
import { VisEditorOptionsProps } from 'src/plugins/visualizations/public';
import { RegionMapVisParams } from '../region_map_types';

const RegionMapOptions = lazy(() => import('./region_map_options'));

export const createRegionMapOptions =
  (getServiceSettings: () => Promise<IServiceSettings>) =>
  (props: VisEditorOptionsProps<RegionMapVisParams>) =>
    <RegionMapOptions {...props} getServiceSettings={getServiceSettings} />;
