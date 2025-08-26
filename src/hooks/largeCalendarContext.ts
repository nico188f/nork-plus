import { createContext, useContext } from "react";
import type Room from "@/classes/Room";

type PreviewEvent =
   | {
        start: Date;
        end?: Date;
     }
   | undefined;

export type LargeCalendarContext = {
   currentRoom: Room;
   setCurrentRoom: (room: Room) => void;

   activeDate: Date;
   setActiveDate: (date: Date) => void;

   getActiveWeek: () => { from: Date; to: Date };

   isPending: boolean;

   intervalMinutes: number;

   previewEvent: PreviewEvent;
   setPreviewEvent: (previewEvent: PreviewEvent) => void;
   onPreviewSuccess: () => void;
};

export const LargeCalendarContext = createContext<
   LargeCalendarContext | undefined
>(undefined);

export function useLargeCalendarContext() {
   const largeCalendarContext = useContext(LargeCalendarContext);

   if (largeCalendarContext === undefined)
      throw new Error(
         "There is no LargeCalendarContext within the current scope.",
      );

   return largeCalendarContext;
}
