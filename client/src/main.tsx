import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider } from "@mui/material/styles";
import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/index.scss";
import { queryClient } from "./fetchers/setup/queryClient.ts";
import { App } from "./pages/index.pages.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <CssBaseline />
          <App />
          <ReactQueryDevtools initialIsOpen={false} />
        </StyledEngineProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
);
