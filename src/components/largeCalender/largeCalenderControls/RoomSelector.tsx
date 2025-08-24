import Room from "@/classes/Room";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useLargeCalenderContext } from "@/hooks/largeCalenderContext";

export default function RoomSelector() {
   const { currentRoom, setCurrentRoom } = useLargeCalenderContext();

   return (
      <ToggleGroup
         type="single"
         variant="outline"
         defaultValue={currentRoom.name}
         onValueChange={(roomName) =>
            setCurrentRoom(Room.getRoomByName(roomName))
         }
      >
         {Room.allRooms.map((room) => (
            <ToggleGroupItem
               key={room.name}
               value={room.name}
               aria-label={"Toggle " + room.name}
               className="w-3xs"
            >
               {<room.icon className="size-5" />}
               <span className="text-lg">{room.name}</span>
            </ToggleGroupItem>
         ))}
      </ToggleGroup>
   );
}
