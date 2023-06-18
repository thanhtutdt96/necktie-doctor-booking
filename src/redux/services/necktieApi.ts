import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "redux/store";
import { Booking, BookingFormData } from "types/Booking";
import { NecktieApiTagType } from "types/Common";
import { Doctor } from "types/Doctor";

const API_PATH = import.meta.env.VITE_API_PATH;

export const necktieApi = createApi({
  reducerPath: "necktieApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_PATH,
    prepareHeaders: (headers, { getState }) => {
      headers.set("Content-Type", "application/json");
      headers.set("x-api-key", (getState() as RootState).auth.user.token);

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
    getBookings: builder.query<Booking[], void>({
      query: () => "/booking",
      providesTags: [NecktieApiTagType.BOOKING]
    }),
    createBooking: builder.mutation<Booking, BookingFormData>({
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
  useLazyGetDoctorByIdQuery,
  useGetBookingsQuery,
  useCreateBookingMutation
} = necktieApi;
