/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import { MockRouter, mockRequestHandler, mockDependencies } from '../../__mocks__';

import { registerCredentialsRoutes } from './credentials';

describe('credentials routes', () => {
  describe('GET /internal/app_search/credentials', () => {
    let mockRouter: MockRouter;

    beforeEach(() => {
      jest.clearAllMocks();
      mockRouter = new MockRouter({
        method: 'get',
        path: '/internal/app_search/credentials',
      });

      registerCredentialsRoutes({
        ...mockDependencies,
        router: mockRouter.router,
      });
    });

    it('creates a request handler', () => {
      expect(mockRequestHandler.createRequest).toHaveBeenCalledWith({
        path: '/as/credentials/collection',
      });
    });

    describe('validates', () => {
      it('correctly', () => {
        const request = {
          query: {
            'page[current]': 1,
            'page[size]': 10,
          },
        };
        mockRouter.shouldValidate(request);
      });

      it('missing page query params', () => {
        const request = { query: {} };
        mockRouter.shouldThrow(request);
      });
    });
  });

  describe('POST /internal/app_search/credentials', () => {
    let mockRouter: MockRouter;

    beforeEach(() => {
      jest.clearAllMocks();
      mockRouter = new MockRouter({
        method: 'post',
        path: '/internal/app_search/credentials',
      });

      registerCredentialsRoutes({
        ...mockDependencies,
        router: mockRouter.router,
      });
    });

    it('creates a request handler', () => {
      expect(mockRequestHandler.createRequest).toHaveBeenCalledWith({
        path: '/as/credentials/collection',
      });
    });

    describe('validates', () => {
      describe('admin keys', () => {
        it('correctly', () => {
          const request = {
            body: {
              name: 'admin-key',
              type: 'admin',
            },
          };
          mockRouter.shouldValidate(request);
        });

        it('throws on unnecessary properties', () => {
          const request = {
            body: {
              name: 'admin-key',
              type: 'admin',
              read: true,
              access_all_engines: true,
            },
          };
          mockRouter.shouldThrow(request);
        });
      });

      describe('private keys', () => {
        it('correctly', () => {
          const request = {
            body: {
              name: 'private-key',
              type: 'private',
              read: true,
              write: false,
              access_all_engines: false,
              engines: ['engine1', 'engine2'],
            },
          };
          mockRouter.shouldValidate(request);
        });

        it('throws on missing keys', () => {
          const request = {
            body: {
              name: 'private-key',
              type: 'private',
            },
          };
          mockRouter.shouldThrow(request);
        });
      });

      describe('search keys', () => {
        it('correctly', () => {
          const request = {
            body: {
              name: 'search-key',
              type: 'search',
              access_all_engines: true,
            },
          };
          mockRouter.shouldValidate(request);
        });

        it('throws on missing keys', () => {
          const request = {
            body: {
              name: 'search-key',
              type: 'search',
            },
          };
          mockRouter.shouldThrow(request);
        });

        it('throws on extra keys', () => {
          const request = {
            body: {
              name: 'search-key',
              type: 'search',
              read: true,
              write: false,
              access_all_engines: false,
              engines: ['engine1', 'engine2'],
            },
          };
          mockRouter.shouldThrow(request);
        });
      });
    });
  });

  describe('GET /internal/app_search/credentials/details', () => {
    let mockRouter: MockRouter;

    beforeEach(() => {
      jest.clearAllMocks();
      mockRouter = new MockRouter({
        method: 'get',
        path: '/internal/app_search/credentials/details',
      });

      registerCredentialsRoutes({
        ...mockDependencies,
        router: mockRouter.router,
      });
    });

    it('creates a request handler', () => {
      expect(mockRequestHandler.createRequest).toHaveBeenCalledWith({
        path: '/as/credentials/details',
      });
    });
  });

  describe('PUT /internal/app_search/credentials/{name}', () => {
    let mockRouter: MockRouter;

    beforeEach(() => {
      jest.clearAllMocks();
      mockRouter = new MockRouter({
        method: 'put',
        path: '/internal/app_search/credentials/{name}',
      });

      registerCredentialsRoutes({
        ...mockDependencies,
        router: mockRouter.router,
      });
    });

    it('creates a request to enterprise search', () => {
      expect(mockRequestHandler.createRequest).toHaveBeenCalledWith({
        path: '/as/credentials/:name',
      });
    });

    describe('validates', () => {
      describe('admin keys', () => {
        it('correctly', () => {
          const request = {
            body: {
              name: 'admin-key',
              type: 'admin',
            },
          };
          mockRouter.shouldValidate(request);
        });

        it('throws on unnecessary properties', () => {
          const request = {
            body: {
              name: 'admin-key',
              type: 'admin',
              read: true,
              access_all_engines: true,
            },
          };
          mockRouter.shouldThrow(request);
        });
      });

      describe('private keys', () => {
        it('correctly', () => {
          const request = {
            body: {
              name: 'private-key',
              type: 'private',
              read: true,
              write: false,
              access_all_engines: false,
              engines: ['engine1', 'engine2'],
            },
          };
          mockRouter.shouldValidate(request);
        });

        it('throws on missing keys', () => {
          const request = {
            body: {
              name: 'private-key',
              type: 'private',
            },
          };
          mockRouter.shouldThrow(request);
        });
      });

      describe('search keys', () => {
        it('correctly', () => {
          const request = {
            body: {
              name: 'search-key',
              type: 'search',
              access_all_engines: true,
            },
          };
          mockRouter.shouldValidate(request);
        });

        it('throws on missing keys', () => {
          const request = {
            body: {
              name: 'search-key',
              type: 'search',
            },
          };
          mockRouter.shouldThrow(request);
        });

        it('throws on extra keys', () => {
          const request = {
            body: {
              name: 'search-key',
              type: 'search',
              read: true,
              write: false,
              access_all_engines: false,
              engines: ['engine1', 'engine2'],
            },
          };
          mockRouter.shouldThrow(request);
        });
      });
    });
  });

  describe('DELETE /internal/app_search/credentials/{name}', () => {
    let mockRouter: MockRouter;

    beforeEach(() => {
      jest.clearAllMocks();
      mockRouter = new MockRouter({
        method: 'delete',
        path: '/internal/app_search/credentials/{name}',
      });

      registerCredentialsRoutes({
        ...mockDependencies,
        router: mockRouter.router,
      });
    });

    it('creates a request to enterprise search', () => {
      expect(mockRequestHandler.createRequest).toHaveBeenCalledWith({
        path: '/as/credentials/:name',
      });
    });
  });
});
