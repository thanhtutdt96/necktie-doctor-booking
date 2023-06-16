export interface Booking {
  name: string;
  doctorId: string;
  start: string;
  date: string;
}

export interface BookingFormData {
  id?: string;
  name?: Booking["name"];
  doctorId?: Booking["doctorId"];
  start?: Booking["start"];
  date?: Booking["date"];
}
