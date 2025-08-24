import { isSameDay } from "date-fns";
import LargeCalenderBooking from "../LargeCalenderBooking";
import type { JSX } from "react";
import { useLargeCalenderContext } from "@/hooks/largeCalenderContext";

type LargeCalenderDayProps = {
   day: Date;
};

export default function LargeCalenderDay({ day }: LargeCalenderDayProps) {
   const { currentRoom, intervalMinutes } = useLargeCalenderContext();

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
               <LargeCalenderBooking key={booking.id} booking={booking} />
            ))}
         </div>
      </div>
   );
}
