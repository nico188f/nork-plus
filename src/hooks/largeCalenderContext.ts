import { createContext, useContext } from "react";
import type Room from "@/classes/Room";

type PreviewEvent =
   | {
        start: Date;
        end?: Date;
     }
   | undefined;

export type LargeCalenderContext = {
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

export const LargeCalenderContext = createContext<
   LargeCalenderContext | undefined
>(undefined);

export function useLargeCalenderContext() {
   const largeCalenderContext = useContext(LargeCalenderContext);

   if (largeCalenderContext === undefined)
      throw new Error(
         "There is no LargeCalenderContext within the current scope.",
      );

   return largeCalenderContext;
}
