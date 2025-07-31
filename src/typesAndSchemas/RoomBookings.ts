import z from "zod";

import { BookingSchema } from "./Booking";
import { RoomIdSchema, RoomNameSchema } from "./Room";

export const RoomBookingSchema = z.object({
   resource: z.object({
      id: RoomIdSchema,
      name: RoomNameSchema,
   }),
   bookings: z.array(BookingSchema).nullable(),
});

export type RoomBooking = z.infer<typeof RoomBookingSchema>;
