import LargeCalendarDay from "./LargeCalendarDay";
import { useLargeCalendarContext } from "@/hooks/largeCalendarContext";

export default function LargeCalendarWeekBody() {
   const { getActiveWeek } = useLargeCalendarContext();

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
            <LargeCalendarDay key={day.toISOString()} day={day} />
         ))}
      </div>
   );
}
