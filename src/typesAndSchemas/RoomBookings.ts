import z from "zod";

import { BookingSchema } from "./Booking";

export const RoomBookingSchema = z.object({
   resource: z.object({
      id: z.int(),
      name: z.string(),
   }),
   bookings: z.array(BookingSchema).nullable(),
});

export type RoomBooking = z.infer<typeof RoomBookingSchema>;
