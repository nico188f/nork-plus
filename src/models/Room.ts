import z from "zod";
import { ROOMS } from "@/data/rooms";

export const RoomIdSchema = z.union([
   ...Object.values(ROOMS).map((room) => z.literal(room.id)),
]);

export type RoomId = z.infer<typeof RoomIdSchema>;

export const RoomNameSchema = z.union([
   ...Object.values(ROOMS).map((room) => z.literal(room.name)),
]);

export type RoomName = z.infer<typeof RoomNameSchema>;

export const RoomRuleSchema = z.union([
   ...Object.values(ROOMS).map((room) => z.literal(room.rule)),
]);

export type RoomRule = z.infer<typeof RoomRuleSchema>;
