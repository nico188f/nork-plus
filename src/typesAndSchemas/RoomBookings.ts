import z from "zod";

import { BookingSchema } from "./Booking";

export const RoomBookingSchema = z.object({
   id: z.int(),
   name: z.string(),
   bookings: z.object({ BookingSchema }),
});

export type Profile = z.infer<typeof RoomBookingSchema>;
