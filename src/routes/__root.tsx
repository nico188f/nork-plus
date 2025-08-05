import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Toaster } from "sonner";
import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";

import TanStackQueryLayout from "../integrations/tanstack-query/layout.tsx";

import type { QueryClient } from "@tanstack/react-query";
import type { Profile } from "@/models/Profile.ts";
import type {
   Auth,
   LoggedInUserState,
   NotLoggedInUserState,
} from "@/hooks/user.ts";
import { AuthContext } from "@/hooks/user.ts";
import getLocalStorageProfile from "@/utils/auth/getLocalStorageProfile.ts";
import {
   clearLocalStorageUser,
   setLocalStorageProfile as setLocalStorageUserProfile,
} from "@/utils/wrapper/localStorageUserWrapper.ts";

interface MyRouterContext {
   queryClient: QueryClient;
}

function createAuthState(
   profile: Profile | undefined,
): LoggedInUserState | NotLoggedInUserState {
   if (profile === undefined) {
      return { isLoggedIn: false };
   }

   return { isLoggedIn: true, profile };
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
   component: () => {
      const [auth, setAuth] = useState((): Auth => {
         const profile = getLocalStorageProfile();

         if (profile)
            axios.defaults.headers.common["Authorization"] = profile.token;

         return {
            ...createAuthState(profile),
            setProfile,
         };
      });

      function setProfile(profile: Profile | undefined) {
         if (profile) {
            axios.defaults.headers.common["Authorization"] = profile.token;
            setLocalStorageUserProfile(profile);
         } else {
            axios.defaults.headers.common["Authorization"] = undefined;
            clearLocalStorageUser();
         }

         setAuth((prevAuth) => ({
            ...prevAuth,
            ...createAuthState(profile),
         }));
      }

      return (
         <>
            <AuthContext value={auth}>
               <Header />

               <Outlet />
            </AuthContext>

            <Toaster position="bottom-right" />
            <TanStackRouterDevtools />
            <TanStackQueryLayout />
         </>
      );
   },
});
