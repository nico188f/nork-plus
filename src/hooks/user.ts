import { createContext, useContext } from "react";
import type { Profile } from "@/typesAndSchemas/Profile";

export type LoggedInUserState = {
   isLoggedIn: true;
   profile: Profile;
};

export type NotLoggedInUserState = {
   isLoggedIn: false;
};

export type Auth = (NotLoggedInUserState | LoggedInUserState) & {
   setProfile: (profile: Profile | undefined) => void;
};

export const AuthContext = createContext<Auth | undefined>(undefined);

export function useAuthContext() {
   const auth = useContext(AuthContext);

   if (auth === undefined)
      throw new Error("There is no AuthContext within the current scope.");

   return auth;
}
