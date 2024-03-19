import { Navigate, Route, Routes } from "react-router-dom";

import { routePaths } from "src/constants/constants";
import { ClientFilterProvider } from "src/context/context";
import { CodeReviewMetrics, Home, PageNotFound, TrunkBasedMetrics } from "src/pages/pages";

export const AppRoutes = () => {
  return (
    <ClientFilterProvider>
      <Routes>
        <Route path={routePaths.home} element={<Navigate to={routePaths.codeReviewMetrics} />} />
        <Route path={routePaths.metrics} element={<Home />}>
          <Route index element={<Navigate to={routePaths.codeReviewMetrics} />} />
          <Route path={routePaths.codeReviewMetrics} element={<CodeReviewMetrics />} />
          <Route path={routePaths.trunkBasedMetrics} element={<TrunkBasedMetrics />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ClientFilterProvider>
  );
};
