import { default as axios } from "axios";
import z from "zod";
import { ProfileSchema } from "@/typesAndSchemas/Profile";

type LoginInfo = {
   email?: string;
   phoneNo?: number;
   password: string;
};

const Data = z.object({
   profiles: z.array(ProfileSchema),
});

export default async (loginInfo: LoginInfo) => {
   const { password, email, phoneNo } = loginInfo;

   const res = await axios.post(
      "https://www.conventus.dk/heimdall/rest/auth/member",
      {
         country: 61,
         phoneNumber: phoneNo,
         email: email,
         password: password,
         passwordHashed: false,
         organization: 10126,
      },
   );

   const data = Data.parse(res.data);

   return data.profiles[0];
};
