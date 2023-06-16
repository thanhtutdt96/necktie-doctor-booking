interface DoctorAddress {
  district: string;
  line_1: string;
  line_2?: string;
}

export interface DoctorOpeningHour {
  day: string;
  isClosed: boolean;
  start: string;
  end: string;
}

export interface Doctor {
  id: string;
  address: DoctorAddress;
  description?: string;
  name: string;
  opening_hours: DoctorOpeningHour[];
}

export interface DoctorScheduleDateItem {
  date: string;
  shortDay: string;
  day: string;
}

export type DoctorScheduleTimeItem = Pick<DoctorOpeningHour, "start" | "end"> & {
  displayStartTime: string;
  displayEndTime: string;
  isPast: boolean;
};

export interface DoctorScheduleMap {
  [key: string]: DoctorScheduleTimeItem[];
}
