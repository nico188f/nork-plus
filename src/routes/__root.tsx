import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Toaster } from "sonner";
import Header from "../components/Header";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import type { QueryClient } from "@tanstack/react-query";

interface MyRouterContext {
   queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
   component: () => (
      <>
         <Header />

         <Outlet />
         <Toaster position="bottom-right" />
         <TanStackRouterDevtools />
         <TanStackQueryLayout />
      </>
   ),
});
