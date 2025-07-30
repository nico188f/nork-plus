import z from "zod";
import {
   CINEMA,
   FITNESS_ROOM_1,
   FITNESS_ROOM_2,
   FITNESS_ROOM_3,
   FITNESS_ROOM_4,
   HALL_176,
   KITCHEN_176,
   KITCHEN_AND_HALL_276,
} from "@/data/rooms";

export const RoomIdSchema = z.union([
   z.literal(KITCHEN_AND_HALL_276.id),
   z.literal(KITCHEN_176.id),
   z.literal(HALL_176.id),
   z.literal(CINEMA.id),
   z.literal(FITNESS_ROOM_1.id),
   z.literal(FITNESS_ROOM_2.id),
   z.literal(FITNESS_ROOM_3.id),
   z.literal(FITNESS_ROOM_4.id),
]);

export type RoomId = z.infer<typeof RoomIdSchema>;

export const RoomNameSchema = z.union([
   z.literal(KITCHEN_AND_HALL_276.name),
   z.literal(KITCHEN_176.name),
   z.literal(HALL_176.name),
   z.literal(CINEMA.name),
   z.literal(FITNESS_ROOM_1.name),
   z.literal(FITNESS_ROOM_2.name),
   z.literal(FITNESS_ROOM_3.name),
   z.literal(FITNESS_ROOM_4.name),
]);

export type RoomName = z.infer<typeof RoomNameSchema>;

export const RoomRuleSchema = z.union([
   z.literal(KITCHEN_AND_HALL_276.rule),
   z.literal(KITCHEN_176.rule),
   z.literal(HALL_176.rule),
   z.literal(CINEMA.rule),
   z.literal(FITNESS_ROOM_1.rule),
   z.literal(FITNESS_ROOM_2.rule),
   z.literal(FITNESS_ROOM_3.rule),
   z.literal(FITNESS_ROOM_4.rule),
]);

export type RoomRule = z.infer<typeof RoomRuleSchema>;
