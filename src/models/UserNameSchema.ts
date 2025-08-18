import z from "zod";

export const UserNameSchema = z.string().transform((userName): string => {
   if (isNaN(parseInt(userName[0]))) return userName;

   const firstDashIndex = userName.indexOf("-");
   return userName.substring(firstDashIndex + 1);
});
