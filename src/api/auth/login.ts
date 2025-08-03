import { default as axios } from "axios";
import z from "zod";
import { norkApi } from "../apiConfig";
import type { Profile } from "@/models/Profile";
import { ProfileSchema } from "@/models/Profile";

type LoginInfo = {
   email?: string;
   phoneNo?: number;
   password: string;
};

const LoginResponse = z.object({
   profiles: z.array(ProfileSchema),
});

const apiResource = "heimdall/rest/auth/member";

export default async (loginInfo: LoginInfo): Promise<Profile> => {
   const { password, email, phoneNo } = loginInfo;

   const res = await axios.post(`${norkApi.url}${apiResource}`, {
      country: norkApi.countryCode,
      phoneNumber: phoneNo,
      email: email,
      password: password,
      passwordHashed: false,
      organization: norkApi.org.id,
   });

   const data = LoginResponse.parse(res.data);

   return data.profiles[0];
};
