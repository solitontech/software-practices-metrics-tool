import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

/* https://tanstack.com/query/latest/docs/framework/react/typescript#registering-a-global-error */
declare module "@tanstack/react-query" {
  interface Register {
    defaultError: AxiosError<{
      error: string;
    }>;
  }
}

export const queryClient = new QueryClient();
