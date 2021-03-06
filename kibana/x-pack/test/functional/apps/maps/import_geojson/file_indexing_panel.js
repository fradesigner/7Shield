/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import expect from '@kbn/expect';
import path from 'path';
import uuid from 'uuid/v4';

export default function ({ getService, getPageObjects }) {
  const PageObjects = getPageObjects(['maps', 'common']);
  const log = getService('log');
  const security = getService('security');
  const browser = getService('browser');
  const retry = getService('retry');

  const IMPORT_FILE_PREVIEW_NAME = 'Import File';
  const FILE_LOAD_DIR = 'test_upload_files';
  const DEFAULT_LOAD_POINT_FILE_NAME = 'point.json';

  const indexPoint = async () => await loadFileAndIndex(DEFAULT_LOAD_POINT_FILE_NAME);

  async function loadFileAndIndex(loadFileName) {
    log.debug(`Uploading ${loadFileName} for indexing`);
    await PageObjects.maps.uploadJsonFileForIndexing(
      path.join(__dirname, FILE_LOAD_DIR, loadFileName)
    );
    await PageObjects.maps.waitForLayersToLoad();
    await PageObjects.maps.doesLayerExist(IMPORT_FILE_PREVIEW_NAME);
    await PageObjects.maps.hasFilePickerLoadedFile(loadFileName);

    const indexName = uuid();
    await PageObjects.maps.setIndexName(indexName);
    await retry.try(async () => {
      const importButtonActive = await PageObjects.maps.importFileButtonEnabled();
      expect(importButtonActive).to.be(true);
    });
    await PageObjects.maps.clickImportFileButton();
    return indexName;
  }

  describe('On GeoJSON index name & pattern operation complete', () => {
    before(async () => {
      await security.testUser.setRoles(
        ['global_maps_all', 'geoall_data_writer', 'global_index_pattern_management_all'],
        false
      );
      await PageObjects.maps.openNewMap();
    });

    after(async () => {
      await security.testUser.restoreDefaults();
    });

    beforeEach(async () => {
      await PageObjects.maps.clickAddLayer();
      await PageObjects.maps.selectGeoJsonUploadSource();
    });

    afterEach(async () => {
      await PageObjects.maps.closeOrCancelLayer();
      await PageObjects.maps.waitForLayerAddPanelClosed();
    });

    it('should not activate add layer button until indexing succeeds', async () => {
      await indexPoint();

      let layerAddReady = await PageObjects.maps.importFileButtonEnabled();
      expect(layerAddReady).to.be(false);

      layerAddReady = await PageObjects.maps.importLayerReadyForAdd();
      expect(layerAddReady).to.be(true);
    });

    it('should load geojson file as ES document source layer', async () => {
      const indexName = await indexPoint();
      const layerAddReady = await PageObjects.maps.importLayerReadyForAdd();
      expect(layerAddReady).to.be(true);

      await PageObjects.maps.clickImportFileButton();
      const geojsonTempLayerExists = await PageObjects.maps.doesLayerExist('Import File');
      expect(geojsonTempLayerExists).to.be(false);

      const newIndexedLayerExists = await PageObjects.maps.doesLayerExist(indexName);
      expect(newIndexedLayerExists).to.be(true);

      const hits = await PageObjects.maps.getHits();
      expect(hits).to.equal('1');
    });

    it('should remove index layer on cancel', async () => {
      const indexName = await indexPoint();

      const layerAddReady = await PageObjects.maps.importLayerReadyForAdd();
      expect(layerAddReady).to.be(true);

      await PageObjects.maps.cancelLayerAdd();
      const geojsonTempLayerExists = await PageObjects.maps.doesLayerExist('Import File');
      expect(geojsonTempLayerExists).to.be(false);

      const newIndexedLayerExists = await PageObjects.maps.doesLayerExist(indexName);
      expect(newIndexedLayerExists).to.be(false);
    });

    const GEO_POINT = 'geo_point';
    const pointGeojsonFiles = ['point.json', 'multi_point.json'];
    pointGeojsonFiles.forEach((pointFile) => {
      it(`should index with type geo_point for file: ${pointFile}`, async () => {
        if (!(await browser.checkBrowserPermission('clipboard-read'))) {
          return;
        }
        await loadFileAndIndex(pointFile);
        const indexPatternResults = await PageObjects.maps.getIndexPatternResults();
        const coordinatesField = indexPatternResults.fields.find(
          ({ name }) => name === 'coordinates'
        );
        expect(coordinatesField.type).to.be(GEO_POINT);
      });
    });

    const GEO_SHAPE = 'geo_shape';
    const nonPointGeojsonFiles = [
      'line_string.json',
      'multi_line_string.json',
      'multi_polygon.json',
      'polygon.json',
    ];
    nonPointGeojsonFiles.forEach((shapeFile) => {
      it(`should index with type geo_shape for file: ${shapeFile}`, async () => {
        if (!(await browser.checkBrowserPermission('clipboard-read'))) {
          return;
        }
        await loadFileAndIndex(shapeFile);
        const indexPatternResults = await PageObjects.maps.getIndexPatternResults();
        const coordinatesField = indexPatternResults.fields.find(
          ({ name }) => name === 'coordinates'
        );
        expect(coordinatesField.type).to.be(GEO_SHAPE);
      });
    });
  });
}
