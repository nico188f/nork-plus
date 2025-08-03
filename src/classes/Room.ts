import type { RoomId, RoomName, RoomRule } from "@/models/Room";
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

export class Room {
   readonly Id: RoomId;
   readonly Name: RoomName;
   readonly Rule: RoomRule;

   constructor(room: { id: RoomId; name: RoomName; rule: RoomRule }) {
      this.Id = room.id;
      this.Name = room.name;
      this.Rule = room.rule;
   }

   static KitchenAndHall276 = new Room(KITCHEN_AND_HALL_276);
   static Kitchen176 = new Room(KITCHEN_176);
   static Hall176 = new Room(HALL_176);
   static Cinema = new Room(CINEMA);
   static FitnessRoom1 = new Room(FITNESS_ROOM_1);
   static FitnessRoom2 = new Room(FITNESS_ROOM_2);
   static FitnessRoom3 = new Room(FITNESS_ROOM_3);
   static FitnessRoom4 = new Room(FITNESS_ROOM_4);

   private static roomList = [
      Room.KitchenAndHall276,
      Room.Kitchen176,
      Room.Hall176,
      Room.Cinema,
      Room.FitnessRoom1,
      Room.FitnessRoom2,
      Room.FitnessRoom3,
      Room.FitnessRoom4,
   ];

   static GetById(id: RoomId): Room {
      const room = Room.roomList.find((r) => r.Id === id);

      if (room === undefined) throw new Error(`Invalid Room id: ${id}`);
      return room;
   }
}
