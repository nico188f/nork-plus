import type { RoomId, RoomName, RoomRule } from "@/typesAndSchemas/Room";
import { rooms } from "@/typesAndSchemas/Room";

const roomList: Readonly<Array<Room>> = Object.values(rooms);

export class Room {
   readonly Id: RoomId;
   readonly Name: RoomName;
   readonly Rule: RoomRule;

   constructor(id: RoomId, name: RoomName, rule: RoomRule) {
      this.Id = id;
      this.Name = name;
      this.Rule = rule;
   }

   static GetById(id: RoomId): Room {
      const room = roomList.find((r) => r.Id === id);

      if (room === undefined) throw new Error("Invalid Room id.");
      return room;
   }
}
