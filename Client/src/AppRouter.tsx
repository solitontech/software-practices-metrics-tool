import { Navigate, Route, Routes } from "react-router-dom";

import {
  pathToCodeReviewMetrics,
  pathToMetrics,
  pathToTrunkBasedMetrics,
} from "./constants/routeConstants";
import { ClientFiltersProvider } from "./contexts/clientFiltersContext/clientFiltersContext";
import { ErrorBoundary } from "./errorBoundary/ErrorBoundary";
import { CodeReviewMetrics } from "./pages/CodeReviewMetrics/CodeReviewMetrics";
import { Home } from "./pages/Home/Home";
import { PageNotFound } from "./pages/PageNotFound/PageNotFound";
import { TrunkBasedMetrics } from "./pages/TrunkBasedMetrics/TrunkBasedMetrics";

export const AppRouter = () => {
  return (
    <ClientFiltersProvider>
      <Routes>
        <Route path="/" element={<Navigate to={pathToCodeReviewMetrics} />} />
        <Route
          path={pathToMetrics}
          element={
            <ErrorBoundary key="home">
              <Home />
            </ErrorBoundary>
          }
        >
          <Route index element={<Navigate to={pathToCodeReviewMetrics} />} />
          <Route
            path={pathToCodeReviewMetrics}
            element={
              <ErrorBoundary key="code-review">
                <CodeReviewMetrics />
              </ErrorBoundary>
            }
          />
          <Route
            path={pathToTrunkBasedMetrics}
            element={
              <ErrorBoundary key="trunk-based">
                <TrunkBasedMetrics />
              </ErrorBoundary>
            }
          />
          <Route
            path="*"
            element={
              <ErrorBoundary key="page-not-found">
                <PageNotFound />
              </ErrorBoundary>
            }
          />
        </Route>
        <Route
          path="*"
          element={
            <ErrorBoundary key="page-not-found">
              <PageNotFound />
            </ErrorBoundary>
          }
        />
      </Routes>
    </ClientFiltersProvider>
  );
};
