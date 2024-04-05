import { http, HttpResponse, delay } from "msw";

import {
  IFetchedTrunkBasedActiveBranchesResponse,
  IFetchedTrunkBranchesResponse,
  ApiEndPoint,
} from "src/services/api/api";

export const getBranchesHandler = (branches: IFetchedTrunkBranchesResponse, delayTime: number = 0) => {
  return http.get(ApiEndPoint.trunkBasedTotalBranches().href, async () => {
    await delay(delayTime);

    return HttpResponse.json(branches);
  });
};

export const getActiveBranchesHandler = (
  activeBranches: IFetchedTrunkBasedActiveBranchesResponse,
  delayTime: number = 0,
) => {
  return http.get(ApiEndPoint.trunkBasedActiveBranchesUrlWithoutParameters().href, async ({ request }) => {
    await delay(delayTime);

    const url = new URL(request.url);

    const paginationCursor = url.searchParams.get("paginationCursor");
    const paginationSize = url.searchParams.get("paginationSize");

    if (paginationCursor && paginationSize) {
      return HttpResponse.json(activeBranches);
    }

    return new HttpResponse("Not Found", { status: 404 });
  });
};

export const getServerErrorHandler = (path: string, delayTime: number = 0) => {
  return http.get(path, async () => {
    await delay(delayTime);

    return new HttpResponse("Server Error", { status: 500 });
  });
};
