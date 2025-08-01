import type { Profile } from "@/typesAndSchemas/Profile";
import login from "@/api/auth/login";

type LoginHandlerInfo = {
   email?: string;
   phoneNo?: number;
   password: string;
};

export default async function (
   loginHandlerInfo: LoginHandlerInfo,
   setProfile: (profile: Profile) => void,
) {
   const profile = await login(loginHandlerInfo);

   // remove address from string
   const firstDashIndex = profile.name.indexOf("-");
   const onlyName = profile.name.substring(firstDashIndex + 1);
   profile.name = onlyName;

   setProfile(profile);

   return profile;
}
