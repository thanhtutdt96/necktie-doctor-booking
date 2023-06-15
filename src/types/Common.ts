export enum ToastType {
  SUCCESS = "success",
  ERROR = "error"
}

export enum NecktieApiTagType {
  DOCTOR = "Doctor",
  BOOKING = "Booking"
}

export enum DoctorBookingStep {
  FILL = "fill",
  APPOINTMENT = "appointment",
  REVIEW = "review"
}

export interface StepperStep {
  key: string;
  label: string;
}
