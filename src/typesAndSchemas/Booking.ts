import z from "zod";

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
      id: z.int(),
   }),
});

export type Booking = z.infer<typeof BookingSchema>;
