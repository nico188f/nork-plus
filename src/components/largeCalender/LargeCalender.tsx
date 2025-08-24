import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { endOfWeek, setHours, startOfWeek } from "date-fns";
import LargeCalenderControls from "./largeCalenderControls/LargeCalenderControls";
import LargeCalenderWeekBody from "./largeCalenderBody/LargeCalenderWeekBody";
import Room from "@/classes/Room";
import { LargeCalenderContext } from "@/hooks/largeCalenderContext";

const defaultRoom = Room.Fitness;
const initialDate = new Date();

export default function LargeCalender() {
   const [calenderContext, setContext] = useState<LargeCalenderContext>({
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
            startOfWeek(calenderContext.activeDate, { weekStartsOn: 1 }),
            2,
         ),
         to: setHours(
            endOfWeek(calenderContext.activeDate, { weekStartsOn: 1 }),
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

   const { from, to } = calenderContext.getActiveWeek();

   const { error, isPending } = useQuery({
      queryKey: ["bookings", calenderContext.currentRoom.name, from, to],
      queryFn: () => calenderContext.currentRoom.updateAndGetBookings(from, to),
   });

   if (isPending !== calenderContext.isPending)
      setContext((prevState) => ({ ...prevState, isPending }));

   if (error) {
      toast.error("Error", {
         description: "Something went wrong while trying to get the bookings!",
      });
   }

   return (
      <LargeCalenderContext.Provider value={calenderContext}>
         <LargeCalenderControls />
         <LargeCalenderWeekBody />
      </LargeCalenderContext.Provider>
   );
}
