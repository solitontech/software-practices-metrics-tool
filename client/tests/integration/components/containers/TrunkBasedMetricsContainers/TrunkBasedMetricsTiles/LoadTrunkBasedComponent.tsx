import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { TrunkBasedMetricsTiles } from "../../../../../../src/components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/TrunkBasedMetricsTiles";
import { queryClient } from "../../../../../../src/fetchers/setup/queryClient";

export function LoadTrunkBasedComponent() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TrunkBasedMetricsTiles />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
