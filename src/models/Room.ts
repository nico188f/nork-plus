import z from "zod";
import { BookingSlotScheduleData } from "@/data/BookingSlotScheduleData";

export const BookingSlotScheduleIdSchema = z.union([
   ...Object.values(BookingSlotScheduleData).map((room) => z.literal(room.id)),
]);

export type BookingSlotScheduleId = z.infer<typeof BookingSlotScheduleIdSchema>;

export const BookingSlotScheduleNameSchema = z.union([
   ...Object.values(BookingSlotScheduleData).map((room) =>
      z.literal(room.name),
   ),
]);

export type BookingSlotScheduleName = z.infer<
   typeof BookingSlotScheduleNameSchema
>;

export const BookingSlotScheduleRuleSchema = z.union([
   ...Object.values(BookingSlotScheduleData).map((room) =>
      z.literal(room.rule),
   ),
]);

export type BookingSlotScheduleRule = z.infer<
   typeof BookingSlotScheduleRuleSchema
>;
