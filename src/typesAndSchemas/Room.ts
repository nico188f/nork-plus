import z from "zod";
import { Room } from "@/classes/Room";

// Rooms
// Kitchen and Hall 276
const KITCHEN_AND_HALL_276_ID = 20114;
const KITCHEN_AND_HALL_276_NAME = "Book 276 Kitchen/Hall";
const KITCHEN_AND_HALL_276_RULE = 2265;

// Kitchen 176
const KITCHEN_176_ID = 20117;
const KITCHEN_176_NAME = "Book 176 Kitchen";
const KITCHEN_176_RULE = 2253;

// Hall 176
const HALL_176_ID = 20118;
const HALL_176_NAME = "Book 176 Hall";
const HALL_176_RULE = 2136;

// Cinema
const CINEMA_ID = 20120;
const CINEMA_NAME = "Book Cinema";
const CINEMA_RULE = 1255;

// Fitness Room 1
const FITNESS_ROOM_1_ID = 20121;
const FITNESS_ROOM_1_NAME = "Book Fitness 1";
const FITNESS_ROOM_1_RULE = 1258;

// Fitness Room 2
const FITNESS_ROOM_2_ID = 23659;
const FITNESS_ROOM_2_NAME = "Book Fitness 2";
const FITNESS_ROOM_2_RULE = 1774;

// Fitness Room 3
const FITNESS_ROOM_3_ID = 23660;
const FITNESS_ROOM_3_NAME = "Book Fitness 3";
const FITNESS_ROOM_3_RULE = 1775;

// Fitness Room 4
const FITNESS_ROOM_4_ID = 23661;
const FITNESS_ROOM_4_NAME = "Book Fitness 4";
const FITNESS_ROOM_4_RULE = 1776;

export const RoomIdSchema = z.union([
   z.literal(KITCHEN_AND_HALL_276_ID),
   z.literal(KITCHEN_176_ID),
   z.literal(HALL_176_ID),
   z.literal(CINEMA_ID),
   z.literal(FITNESS_ROOM_1_ID),
   z.literal(FITNESS_ROOM_2_ID),
   z.literal(FITNESS_ROOM_3_ID),
   z.literal(FITNESS_ROOM_4_ID),
]);

export type RoomId = z.infer<typeof RoomIdSchema>;

export const RoomNameSchema = z.union([
   z.literal(KITCHEN_AND_HALL_276_NAME),
   z.literal(KITCHEN_176_NAME),
   z.literal(HALL_176_NAME),
   z.literal(CINEMA_NAME),
   z.literal(FITNESS_ROOM_1_NAME),
   z.literal(FITNESS_ROOM_2_NAME),
   z.literal(FITNESS_ROOM_3_NAME),
   z.literal(FITNESS_ROOM_4_NAME),
]);

export type RoomName = z.infer<typeof RoomNameSchema>;

export const RoomRuleSchema = z.union([
   z.literal(KITCHEN_AND_HALL_276_RULE),
   z.literal(KITCHEN_176_RULE),
   z.literal(HALL_176_RULE),
   z.literal(CINEMA_RULE),
   z.literal(FITNESS_ROOM_1_RULE),
   z.literal(FITNESS_ROOM_2_RULE),
   z.literal(FITNESS_ROOM_3_RULE),
   z.literal(FITNESS_ROOM_4_RULE),
]);

export type RoomRule = z.infer<typeof RoomRuleSchema>;

export const rooms: Record<string, Room> = {
   kitchenAndHall276: new Room(
      KITCHEN_AND_HALL_276_ID,
      KITCHEN_AND_HALL_276_NAME,
      KITCHEN_AND_HALL_276_RULE,
   ),
   kitchen176: new Room(KITCHEN_176_ID, KITCHEN_176_NAME, KITCHEN_176_RULE),
   hall176: new Room(HALL_176_ID, HALL_176_NAME, HALL_176_RULE),
   cinema: new Room(CINEMA_ID, CINEMA_NAME, CINEMA_RULE),
   fitnessRoom1: new Room(
      FITNESS_ROOM_1_ID,
      FITNESS_ROOM_1_NAME,
      FITNESS_ROOM_1_RULE,
   ),
   fitnessRoom2: new Room(
      FITNESS_ROOM_2_ID,
      FITNESS_ROOM_2_NAME,
      FITNESS_ROOM_2_RULE,
   ),
   fitnessRoom3: new Room(
      FITNESS_ROOM_3_ID,
      FITNESS_ROOM_3_NAME,
      FITNESS_ROOM_3_RULE,
   ),
   fitnessRoom4: new Room(
      FITNESS_ROOM_4_ID,
      FITNESS_ROOM_4_NAME,
      FITNESS_ROOM_4_RULE,
   ),
} as const;
