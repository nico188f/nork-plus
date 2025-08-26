import z from "zod";
import { UserNameSchema } from "./UserNameSchema";

export const BookingSchema = z.object({
   id: z.int(),
   start: z
      .int()
      .min(0)
      .transform((value) => new Date(value)),
   end: z
      .int()
      .min(0)
      .transform((value) => new Date(value)),
   title: UserNameSchema,
   bookedTo: z.union([
      z
         .object({
            id: z.int(),
         })
         .transform((p) => p.id),
      z.null(),
   ]),
});

export type Booking = z.infer<typeof BookingSchema>;
