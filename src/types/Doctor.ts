interface DoctorAddress {
  district: string;
  line_1: string;
  line_2?: string;
}

interface DoctorOpeningHour {
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
