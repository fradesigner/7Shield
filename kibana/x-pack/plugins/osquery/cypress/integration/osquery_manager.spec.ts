/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { HEADER } from '../screens/osquery';
import { OSQUERY_NAVIGATION_LINK } from '../screens/navigation';

import { OSQUERY, NEW_LIVE_QUERY, openNavigationFlyout, navigateTo } from '../tasks/navigation';
import { addIntegration } from '../tasks/integrations';
import { checkResults, inputQuery, selectAllAgents, submitQuery } from '../tasks/live_query';

describe('Osquery Manager', () => {
  before(() => addIntegration(Cypress.env('OSQUERY_POLICY')));

  it('Runs live queries', () => {
    navigateTo(NEW_LIVE_QUERY);
    selectAllAgents();
    inputQuery();
    submitQuery();
    checkResults();
  });

  it('Displays Osquery on the navigation flyout once installed ', () => {
    openNavigationFlyout();
    cy.get(OSQUERY_NAVIGATION_LINK).should('exist');
  });

  it('Displays Live queries history title when navigating to Osquery', () => {
    navigateTo(OSQUERY);
    cy.get(HEADER).should('have.text', 'Live queries history');
  });
});
