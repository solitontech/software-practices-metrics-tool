import { Navigate, Route, Routes } from "react-router-dom";

import { pathToHome, pathToCodeReviewMetrics, pathToMetrics, pathToTrunkBasedMetrics } from "src/constants";
import { ClientFilterProvider } from "src/context";
import { CodeReviewMetrics, Home, PageNotFound, TrunkBasedMetrics } from "src/pages";

export const AppRoutes = () => {
  return (
    <ClientFilterProvider>
      <Routes>
        <Route path={pathToHome} element={<Navigate to={pathToCodeReviewMetrics} />} />
        <Route path={pathToMetrics} element={<Home />}>
          <Route index element={<Navigate to={pathToCodeReviewMetrics} />} />
          <Route path={pathToCodeReviewMetrics} element={<CodeReviewMetrics />} />
          <Route path={pathToTrunkBasedMetrics} element={<TrunkBasedMetrics />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </ClientFilterProvider>
  );
};
