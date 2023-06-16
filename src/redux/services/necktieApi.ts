import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BookingFormData } from "types/Booking";
import { NecktieApiTagType } from "types/Common";
import { Doctor } from "types/Doctor";

const API_PATH = import.meta.env.VITE_API_PATH;
const API_KEY = import.meta.env.VITE_API_KEY;

export const necktieApi = createApi({
  reducerPath: "necktieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_PATH,
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      headers.set("x-api-key", API_KEY);

      return headers;
    }
  }),
  tagTypes: [NecktieApiTagType.DOCTOR, NecktieApiTagType.BOOKING],
  endpoints: (builder) => ({
    getDoctors: builder.query<Doctor[], void>({
      query: () => "/doctor",
      providesTags: [NecktieApiTagType.DOCTOR]
    }),
    getDoctorById: builder.query<Doctor, string>({
      query: (doctorId: string) => `/doctor/${doctorId}`,
      providesTags: [NecktieApiTagType.DOCTOR]
    }),
    getBookings: builder.query<Doctor[], void>({
      query: () => "/booking",
      providesTags: [NecktieApiTagType.BOOKING]
    }),
    createBooking: builder.mutation<Boo, BookingFormData>({
      query(item) {
        return {
          url: "/booking",
          method: "POST",
          body: item
        };
      },
      invalidatesTags: [NecktieApiTagType.BOOKING]
    })
  })
});

export const {
  useGetDoctorsQuery,
  useGetDoctorByIdQuery,
  useGetBookingsQuery,
  useCreateBookingMutation
} = necktieApi;
