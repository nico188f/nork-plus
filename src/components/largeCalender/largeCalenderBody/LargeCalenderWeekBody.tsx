import LargeCalenderDay from "./LargeCalenderDay";
import { useLargeCalenderContext } from "@/hooks/largeCalenderContext";

export default function LargeCalenderWeekBody() {
   const { getActiveWeek } = useLargeCalenderContext();

   const { from, to } = getActiveWeek();

   const days: Array<Date> = [];
   const currentDate = new Date(from);
   const endDate = new Date(to);

   while (currentDate <= endDate) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
   }

   return (
      <div className="gap-1 grid grid-cols-7">
         {days.map((day) => (
            <LargeCalenderDay key={day.toISOString()} day={day} />
         ))}
      </div>
   );
}
