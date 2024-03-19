import { http, HttpResponse, delay } from "msw";

import {
  IFetchedTrunkBasedActiveBranchesResponse,
  IFetchedTrunkBranchesResponse,
  ApiEndPoint,
} from "src/fetchers/fetchers";

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
  return http.get(ApiEndPoint.trunkBasedActiveBranches().href, async () => {
    await delay(delayTime);

    return HttpResponse.json(activeBranches);
  });
};

export const getServerErrorHandler = (path: string, delayTime: number = 0) => {
  return http.get(path, async () => {
    await delay(delayTime);

    return new HttpResponse("Server Error", { status: 500 });
  });
};
