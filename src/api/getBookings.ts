import { default as axios } from "axios";
import z from "zod";
import {
   RoomBookingSchema,
   type RoomBooking,
} from "../typesAndSchemas/RoomBookings";

type roomListType = { id: number }[];

type BookingRequest = {
   roomList: roomListType;
   from: Date;
   to: Date;
};

const Data = z.array(RoomBookingSchema);

export default async (
   bookingRequest: BookingRequest,
): Promise<RoomBooking[]> => {
   const res = await axios.post(
      "https://www.conventus.dk/publicBooking/public/getBookings",
      {
         organization: {
            id: 10126,
         },
         resourceList: bookingRequest.roomList,
         from: bookingRequest.from.toISOString().slice(0, 19),
         to: bookingRequest.to.toISOString().slice(0, 19),
      },
   );

   const data = Data.parse(res.data);

   return data;
};
