import {
   setLocalStorageAuthToken,
   setLocalStorageMemberId,
   setLocalStorageName,
} from "../wrapper/localStorageWrapper";
import login from "@/api/auth/login";

type LoginHandlerInfo = {
   email?: string;
   phoneNo?: number;
   password: string;
};

export default async function (loginHandlerInfo: LoginHandlerInfo) {
   const profile = await login(loginHandlerInfo);

   // remove address from string
   const firstDashIndex = profile.name.indexOf("-");
   const onlyName = profile.name.substring(firstDashIndex + 1);

   setLocalStorageMemberId(profile.memberId);
   setLocalStorageName(onlyName);
   setLocalStorageAuthToken(profile.token);

   profile.name = onlyName;
   return profile;
}
