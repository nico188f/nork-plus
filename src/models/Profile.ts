import z from "zod";
import { UserNameSchema } from "./UserNameSchema";

export const ProfileSchema = z.object({
   memberId: z.int(),
   name: UserNameSchema,
   token: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;
