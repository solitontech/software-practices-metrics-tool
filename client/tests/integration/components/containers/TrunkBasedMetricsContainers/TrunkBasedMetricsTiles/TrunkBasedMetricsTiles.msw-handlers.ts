import { http, HttpResponse, delay } from "msw";

import {
  IActiveBranches,
  ITotalBranches,
} from "../../../../../../src/components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/interfaces";
import { trunkBasedMetricsAPI } from "../../../../../../src/fetchers/fetchersUtils";

export const getBranchesHandler = (branches: ITotalBranches, delayTime: number = 0) => {
  return http.get(trunkBasedMetricsAPI + "/branches", async () => {
    await delay(delayTime);

    return HttpResponse.json(branches);
  });
};

export const getActiveBranchesHandler = (activeBranches: IActiveBranches, delayTime: number = 0) => {
  return http.get(trunkBasedMetricsAPI + "/activeBranches", async () => {
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
