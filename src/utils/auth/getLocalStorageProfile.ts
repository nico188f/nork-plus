import {
   getLocalStorageUserAuthToken,
   getLocalStorageUserMemberId,
   getLocalStorageUserName,
} from "../wrapper/localStorageUserWrapper";
import type { Profile } from "@/typesAndSchemas/Profile";

export default function (): Profile | undefined {
   const memberId = getLocalStorageUserMemberId();
   const name = getLocalStorageUserName();
   const token = getLocalStorageUserAuthToken();

   if (memberId !== null && name !== null && token !== null) {
      return {
         memberId,
         name,
         token,
      };
   }

   return undefined;
}
