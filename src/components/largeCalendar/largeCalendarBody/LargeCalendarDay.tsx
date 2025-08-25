import { isSameDay } from "date-fns";
import LargeCalendarBooking from "../LargeCalendarBooking";
import type { JSX } from "react";
import { useLargeCalendarContext } from "@/hooks/largeCalendarContext";

type LargeCalendarDayProps = {
   day: Date;
};

export default function LargeCalendarDay({ day }: LargeCalendarDayProps) {
   const { currentRoom, intervalMinutes } = useLargeCalendarContext();

   const bookings = currentRoom.bookings.filter(
      (booking) =>
         isSameDay(day, booking.start, {}) || isSameDay(day, booking.end),
   );

   let currTime = 0;

   const timeSlots: Array<JSX.Element> = [];
   while (currTime / 60 <= 24) {
      timeSlots.push(
         <div key={currTime}>
            {currTime !== 0 && <div className="h-5"></div>}
            {/* <div>{currTime / 60}</div> */}
            <hr />
            {currTime / 60 !== 24 && <div className="h-5"></div>}
         </div>,
      );
      currTime += intervalMinutes;
   }

   return (
      <div className="relative">
         {/* <h2>{format(day, "iiii")}</h2> */}
         <div>{timeSlots}</div>
         <div>
            {bookings.map((booking) => (
               <LargeCalendarBooking key={booking.id} booking={booking} />
            ))}
         </div>
      </div>
   );
}
