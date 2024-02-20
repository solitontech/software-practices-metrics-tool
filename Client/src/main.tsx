import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.scss";
import { AppRouter } from "./AppRouter.tsx";
import { queryClient } from "./setup/queryClient.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <AppRouter></AppRouter>
          <ReactQueryDevtools initialIsOpen={false} />
        </StyledEngineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
