/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import http from 'http';

import { FtrProviderContext } from '../../../../common/ftr_provider_context';
import { ObjectRemover as ActionsRemover } from '../../../../../alerting_api_integration/common/lib';

import { getPostCaseRequest } from '../../../../common/lib/mock';
import {
  pushCase,
  deleteAllCaseItems,
  createCaseWithConnector,
  getServiceNowSimulationServer,
} from '../../../../common/lib/utils';
import {
  globalRead,
  noKibanaPrivileges,
  obsOnlyReadSpacesAll,
  obsSecReadSpacesAll,
  secOnlySpacesAll,
  secOnlyReadSpacesAll,
} from '../../../../common/lib/authentication/users';
import { secOnlyDefaultSpaceAuth } from '../../../utils';

// eslint-disable-next-line import/no-default-export
export default ({ getService }: FtrProviderContext): void => {
  const supertest = getService('supertest');
  const es = getService('es');

  describe('push_case', () => {
    const actionsRemover = new ActionsRemover(supertest);
    let serviceNowSimulatorURL: string = '';
    let serviceNowServer: http.Server;

    before(async () => {
      const { server, url } = await getServiceNowSimulationServer();
      serviceNowServer = server;
      serviceNowSimulatorURL = url;
    });

    afterEach(async () => {
      await deleteAllCaseItems(es);
      await actionsRemover.removeAll();
    });

    after(async () => {
      serviceNowServer.close();
    });

    const supertestWithoutAuth = getService('supertestWithoutAuth');

    it('should push a case that the user has permissions for', async () => {
      const { postedCase, connector } = await createCaseWithConnector({
        supertest,
        serviceNowSimulatorURL,
        actionsRemover,
      });

      await pushCase({
        supertest: supertestWithoutAuth,
        caseId: postedCase.id,
        connectorId: connector.id,
        auth: secOnlyDefaultSpaceAuth,
      });
    });

    it('should not push a case that the user does not have permissions for', async () => {
      const { postedCase, connector } = await createCaseWithConnector({
        supertest,
        serviceNowSimulatorURL,
        actionsRemover,
        createCaseReq: getPostCaseRequest({ owner: 'observabilityFixture' }),
      });

      await pushCase({
        supertest: supertestWithoutAuth,
        caseId: postedCase.id,
        connectorId: connector.id,
        auth: secOnlyDefaultSpaceAuth,
        expectedHttpCode: 403,
      });
    });

    for (const user of [
      globalRead,
      secOnlyReadSpacesAll,
      obsOnlyReadSpacesAll,
      obsSecReadSpacesAll,
      noKibanaPrivileges,
    ]) {
      it(`User ${
        user.username
      } with role(s) ${user.roles.join()} - should NOT push a case`, async () => {
        const { postedCase, connector } = await createCaseWithConnector({
          supertest,
          serviceNowSimulatorURL,
          actionsRemover,
        });

        await pushCase({
          supertest: supertestWithoutAuth,
          caseId: postedCase.id,
          connectorId: connector.id,
          auth: { user, space: null },
          expectedHttpCode: 403,
        });
      });
    }

    it('should return a 404 when attempting to access a space', async () => {
      const { postedCase, connector } = await createCaseWithConnector({
        supertest,
        serviceNowSimulatorURL,
        actionsRemover,
      });

      await pushCase({
        supertest: supertestWithoutAuth,
        caseId: postedCase.id,
        connectorId: connector.id,
        auth: { user: secOnlySpacesAll, space: 'space1' },
        expectedHttpCode: 404,
      });
    });
  });
};
