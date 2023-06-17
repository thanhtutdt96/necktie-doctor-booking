export enum BookingStatus {
  CONFIRMED = "confirmed",
  CANCEL = "cancel"
}

export interface Booking {
  id: string;
  name: string;
  doctorId: string;
  start: string;
  date: string;
  status?: "confirmed" | "cancel";
}

export interface BookingFormData {
  id?: string;
  name?: Booking["name"];
  doctorId?: Booking["doctorId"];
  start?: number;
  date?: Booking["date"];
}
