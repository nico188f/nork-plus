import { default as axios } from "axios";
import z from "zod";
import { norkApi } from "./../apiConfig";
import type { RoomBooking } from "@/models/RoomBookings";
import type BookingSlotSchedule from "@/classes/BookingSlotSchedule";
import { RoomBookingSchema } from "@/models/RoomBookings";

type BookingSlotSchedules = Array<BookingSlotSchedule>;

type GetBookingParams = {
   bookingSlotSchedules: BookingSlotSchedules;
   from: Date;
   to: Date;
};

const apiResource = "publicBooking/public/getBookings";

const GetBookingResponse = z.array(RoomBookingSchema);

export default async (
   getBookingParams: GetBookingParams,
): Promise<Array<RoomBooking>> => {
   const res = await axios.post(norkApi.url + apiResource, {
      organization: norkApi.org,
      resourceList: getBookingParams.bookingSlotSchedules.map(
         (slotSchedule) => slotSchedule.Id,
      ),
      from: getBookingParams.from.toISOString().slice(0, 19),
      to: getBookingParams.to.toISOString().slice(0, 19),
   });

   const data = GetBookingResponse.parse(res.data);

   return data;
};
