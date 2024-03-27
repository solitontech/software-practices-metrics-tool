import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";

import { queryClient } from "../../../../../services/api/api";
import { TrunkBasedMetricsTiles } from "../TrunkBasedMetricsTiles";

export function LoadTrunkBasedComponent() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TrunkBasedMetricsTiles />
      </QueryClientProvider>
    </BrowserRouter>
  );
}
