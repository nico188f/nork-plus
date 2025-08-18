import z from "zod";

import { BookingSchema } from "./Booking";
import {
   BookingSlotScheduleIdSchema,
   BookingSlotScheduleNameSchema,
} from "./Room";

export const RoomBookingSchema = z.object({
   resource: z.object({
      id: BookingSlotScheduleIdSchema,
      name: BookingSlotScheduleNameSchema,
   }),
   bookings: z.array(BookingSchema).nullable(),
});

export type RoomBooking = z.infer<typeof RoomBookingSchema>;
