import z from "zod";

import { BookingSchema } from "./Booking";
import { ResourceIdSchema, ResourceNameSchema } from "./Room";

export const RoomBookingSchema = z.object({
   resource: z.object({
      id: ResourceIdSchema,
      name: ResourceNameSchema,
   }),
   bookings: z.array(BookingSchema).nullable(),
});

export type RoomBooking = z.infer<typeof RoomBookingSchema>;
