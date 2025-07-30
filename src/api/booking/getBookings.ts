import { default as axios } from "axios";
import z from "zod";
import { norkApi } from "./../apiConfig";
import type { RoomBooking } from "@/typesAndSchemas/RoomBookings";
import type { RoomId } from "@/typesAndSchemas/Room";
import { RoomBookingSchema } from "@/typesAndSchemas/RoomBookings";

type RoomList = Array<{ id: RoomId }>;

type GetBookingParams = {
   roomList: RoomList;
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
      resourceList: getBookingParams.roomList,
      from: getBookingParams.from.toISOString().slice(0, 19),
      to: getBookingParams.to.toISOString().slice(0, 19),
   });

   const data = GetBookingResponse.parse(res.data);

   return data;
};
