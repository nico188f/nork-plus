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
   title: z.string(),
   info: z.string(),
   bookedTo: z.object({
      name: UserNameSchema,
      id: z.int(),
   }),
});

export type Booking = z.infer<typeof BookingSchema>;
