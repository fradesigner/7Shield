/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { SavedObjectsClientContract } from 'kibana/public';
import { SavedObjectLoader, SavedObjectsStart } from '../../../../saved_objects/public';
import { createSavedSearchClass } from './_saved_search';
import { getSavedSearchUrl } from '../saved_searches_utils';

interface Services {
  savedObjectsClient: SavedObjectsClientContract;
  savedObjects: SavedObjectsStart;
}

/** @deprecated **/
export function createSavedSearchesLoader({ savedObjectsClient, savedObjects }: Services) {
  const SavedSearchClass = createSavedSearchClass(savedObjects);
  const savedSearchLoader = new SavedObjectLoader(SavedSearchClass, savedObjectsClient);
  // Customize loader properties since adding an 's' on type doesn't work for type 'search' .
  savedSearchLoader.loaderProperties = {
    name: 'searches',
    noun: 'Saved Search',
    nouns: 'saved searches',
  };

  savedSearchLoader.urlFor = getSavedSearchUrl;

  return savedSearchLoader;
}
