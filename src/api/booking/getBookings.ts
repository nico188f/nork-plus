import { default as axios } from "axios";
import z from "zod";
import { norkApi } from "./../apiConfig";
import type { RoomBooking } from "@/typesAndSchemas/RoomBookings";
import type { ResourceId } from "@/typesAndSchemas/Room";
import { RoomBookingSchema } from "@/typesAndSchemas/RoomBookings";

type roomListType = Array<{ id: ResourceId }>;

type BookingRequest = {
   roomList: roomListType;
   from: Date;
   to: Date;
};

const apiResource = "publicBooking/public/getBookings";

const Data = z.array(RoomBookingSchema);

export default async (
   bookingRequest: BookingRequest,
): Promise<Array<RoomBooking>> => {
   const res = await axios.post(norkApi.url + apiResource, {
      organization: norkApi.org,
      resourceList: bookingRequest.roomList,
      from: bookingRequest.from.toISOString().slice(0, 19),
      to: bookingRequest.to.toISOString().slice(0, 19),
   });

   const data = Data.parse(res.data);

   return data;
};
