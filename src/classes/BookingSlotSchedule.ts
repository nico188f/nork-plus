import type {
   BookingSlotScheduleId,
   BookingSlotScheduleName,
   BookingSlotScheduleRule,
} from "@/models/Room";
import type Room from "./Room";
import type { Booking } from "@/models/Booking";

export default class BookingSlotSchedule {
   readonly Id: BookingSlotScheduleId;
   readonly Name: BookingSlotScheduleName;
   readonly Rule: BookingSlotScheduleRule;

   readonly Room: Room;

   Bookings: Array<Booking> = [];

   constructor(
      room: Room,
      bookingSlotSchedule: {
         id: BookingSlotScheduleId;
         name: BookingSlotScheduleName;
         rule: BookingSlotScheduleRule;
      },
   ) {
      this.Id = bookingSlotSchedule.id;
      this.Name = bookingSlotSchedule.name;
      this.Rule = bookingSlotSchedule.rule;

      this.Room = room;
   }
}
