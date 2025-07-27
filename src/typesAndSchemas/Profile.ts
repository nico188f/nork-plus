import z from "zod";

export const ProfileSchema = z.object({
   memberId: z.int(),
   name: z.string(),
   token: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;
