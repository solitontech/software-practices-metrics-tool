import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { TrunkBasedMetricsTiles } from "../../../../../../src/components/containers/TrunkBasedMetricsContainers/TrunkBasedMetricsTiles/TrunkBasedMetricsTiles";
import { queryClient } from "../../../../../../src/setup/queryClient";

export function loadTrunkBasedComponent() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TrunkBasedMetricsTiles />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
