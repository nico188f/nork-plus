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

   if (memberId && name && token) {
      return {
         memberId,
         name,
         token,
      };
   }

   return undefined;
}
