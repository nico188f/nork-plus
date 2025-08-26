import { differenceInMinutes, format } from "date-fns";
import type { Booking } from "@/models/Booking";

type LargeCalendarBookingProps = { booking: Booking };

export default function LargeCalendarBooking({
   booking,
}: LargeCalendarBookingProps) {
   return (
      <div
         className="absolute bg-chart-1 opacity-30 w-full"
         style={{
            top: `${((booking.start.getHours() + booking.start.getMinutes() / 60) / 24) * 100}%`,
            height: `${(differenceInMinutes(booking.end, booking.start) / (24 * 60)) * 100}%`,
         }}
      >
         <h2>{booking.title}</h2>
         <span>
            {format(booking.start, "HH:mm")}-{format(booking.end, "HH:mm")}
         </span>
      </div>
   );
}
