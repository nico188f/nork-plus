import axios from "axios";
import z from "zod";
import { norkApi } from "../apiConfig";

type PostBookingParams = {
   roomId: number;
   roomRule: number;
   from: Date;
   to: Date;
   sendConfirmationEmail: boolean;
};

const apiResource = "publicBooking/online/book";

const formatDateForApi = (date: Date): string => {
   return date.toISOString().slice(0, 19).replace("T", " ");
};

export default async (postBookingParams: PostBookingParams) => {
   if (axios.defaults.headers.common["Authorization"] === undefined)
      throw new Error("Authorization header is unset.");

   const res = await axios.post(norkApi.url + apiResource, {
      bookingTime: {
         start: formatDateForApi(postBookingParams.from),
         end: formatDateForApi(postBookingParams.to),
         resource: {
            id: postBookingParams.roomId,
         },
         rule: {
            rule: postBookingParams.roomRule,
         },
      },
      sendEmailReceipt: postBookingParams.sendConfirmationEmail,
   });

   const data = z
      .object({ bookingId: z.int().min(0) })
      .transform((b) => b.bookingId)
      .brand()
      .parse(res.data);

   return data;
};
