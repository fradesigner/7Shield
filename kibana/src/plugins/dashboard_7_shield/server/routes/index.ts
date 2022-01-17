import { IRouter } from '../../../../core/server';

export function defineRoutes(router: IRouter) {
  router.get(
    {
      path: '/api/dashboard_7_shield/example',
      validate: false,
    },
    async (context, request, response) => {
      return response.ok({
        body: {
          time: new Date().toISOString(),
        },
      });
    }
  );
}
