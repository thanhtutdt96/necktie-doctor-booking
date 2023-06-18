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
  REVIEW = "review",
  DONE = "done"
}

export interface StepperStep {
  key: string;
  label: string;
}

export enum LoaderType {
  PROGRESS = "progress",
  SPINNER = "spinner",
  DOT = "dot"
}

export interface AuthUser {
  id: string;
  name: string;
  token: string;
}
