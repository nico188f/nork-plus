import { ChefHat, Dumbbell, Film, PartyPopper, Users } from "lucide-react";
import BookingSlotSchedule from "./BookingSlotSchedule";
import type { LucideProps } from "lucide-react";
import type {
   BookingSlotScheduleId,
   BookingSlotScheduleName,
   BookingSlotScheduleRule,
} from "@/models/Room";
import type { Booking } from "@/models/Booking";
import { BookingSlotScheduleData } from "@/data/BookingSlotScheduleData";
import getBookings from "@/api/booking/getBookings";

export default class Room {
   public readonly name: string;
   public readonly icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref">
   >;

   private readonly bookingSlotSchedules: Array<BookingSlotSchedule> = [];

   private static readonly rooms: Array<Room> = [];
   public static get allRooms(): ReadonlyArray<Room> {
      return Room.rooms;
   }

   public get bookings(): ReadonlyArray<Booking> {
      return this.bookingSlotSchedules.flatMap(
         (slotSchedule) => slotSchedule.Bookings,
      );
   }

   private getBookingSlotScheduleById(
      slotId: BookingSlotScheduleId,
   ): BookingSlotSchedule | undefined {
      return this.bookingSlotSchedules.find((slot) => slot.Id === slotId);
   }

   private constructor(
      name: string,
      icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref">>,
      bookingSlotSchedules: Array<{
         id: BookingSlotScheduleId;
         name: BookingSlotScheduleName;
         rule: BookingSlotScheduleRule;
      }>,
   ) {
      this.name = name;
      this.icon = icon;

      for (const slot of bookingSlotSchedules) {
         const slotSchedule = new BookingSlotSchedule(this, slot);
         this.bookingSlotSchedules.push(slotSchedule);
      }

      Room.rooms.push(this);
   }

   public async getCurrentBookings(
      from: Date,
      to: Date,
   ): Promise<ReadonlyArray<Booking>> {
      const bookings = await getBookings({
         bookingSlotSchedules: this.bookingSlotSchedules,
         from,
         to,
      });

      for (const slotBooking of bookings) {
         if (slotBooking.bookings === null) continue;

         const bookingSlot = this.getBookingSlotScheduleById(
            slotBooking.resource.id,
         );

         if (bookingSlot === undefined) {
            console.warn(
               `No booking slot schedule found for id: ${slotBooking.resource.id}`,
            );
            continue;
         }

         bookingSlot.Bookings = slotBooking.bookings;
      }

      return this.bookings;
   }

   static readonly KitchenAndHall276 = new Room(
      "Kitchen/Hall 276",
      PartyPopper,
      [BookingSlotScheduleData.KitchenAndHall276],
   );

   static readonly Kitchen176 = new Room("Kitchen 176", ChefHat, [
      BookingSlotScheduleData.Kitchen176,
   ]);

   static readonly Hall176 = new Room("Hall 176", Users, [
      BookingSlotScheduleData.Hall176,
   ]);

   static readonly Cinema = new Room("Cinema", Film, [
      BookingSlotScheduleData.Cinema,
   ]);

   static readonly Fitness = new Room("Fitness Room", Dumbbell, [
      BookingSlotScheduleData.FitnessRoom1,
      BookingSlotScheduleData.FitnessRoom2,
      BookingSlotScheduleData.FitnessRoom3,
      BookingSlotScheduleData.FitnessRoom4,
   ]);
}
