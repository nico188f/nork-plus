import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { endOfWeek, setHours, startOfWeek } from "date-fns";
import LargeCalendarControls from "./largeCalendarControls/LargeCalendarControls";
import LargeCalendarWeekBody from "./largeCalendarBody/LargeCalendarWeekBody";
import Room from "@/classes/Room";
import { LargeCalendarContext } from "@/hooks/largeCalendarContext";

const defaultRoom = Room.Fitness;
const initialDate = new Date();

export default function LargeCalendar() {
   const [calendarContext, setContext] = useState<LargeCalendarContext>({
      currentRoom: defaultRoom,
      setCurrentRoom: (room) =>
         setContext((prevContext) => ({
            ...prevContext,
            currentRoom: room,
         })),

      activeDate: initialDate,
      setActiveDate: (activeDate) =>
         setContext((prevContext) => ({
            ...prevContext,
            activeDate,
         })),

      getActiveWeek: (): { from: Date; to: Date } => ({
         from: setHours(
            startOfWeek(calendarContext.activeDate, { weekStartsOn: 1 }),
            2,
         ),
         to: setHours(
            endOfWeek(calendarContext.activeDate, { weekStartsOn: 1 }),
            25,
         ),
      }),

      intervalMinutes: 30,

      isPending: true,

      previewEvent: undefined,
      setPreviewEvent: (previewEvent) =>
         setContext((prevContext) => ({
            ...prevContext,
            previewEvent,
         })),
      onPreviewSuccess: () => {},
   });

   const { from, to } = calendarContext.getActiveWeek();

   const { error, isPending } = useQuery({
      queryKey: ["bookings", calendarContext.currentRoom.name, from, to],
      queryFn: () => calendarContext.currentRoom.updateAndGetBookings(from, to),
   });

   useEffect(() => {
      if (isPending !== calendarContext.isPending) {
         setContext((prevState) => ({ ...prevState, isPending }));
      }
   }, [isPending, calendarContext.isPending]);

   if (error) {
      toast.error("Error", {
         description: "Something went wrong while trying to get the bookings!",
      });
   }

   return (
      <LargeCalendarContext.Provider value={calendarContext}>
         <LargeCalendarControls />
         <LargeCalendarWeekBody />
      </LargeCalendarContext.Provider>
   );
}
