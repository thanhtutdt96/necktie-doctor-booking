import { Dispatch, FC, SetStateAction } from "react";
import { BookingFormData } from "types/Booking";
import { DoctorBookingStep } from "types/Common";

interface Props {
  setCurrentFormData: Dispatch<SetStateAction<BookingFormData>>;
  currentFormData: BookingFormData;
  setCurrentStep: Dispatch<SetStateAction<DoctorBookingStep>>;
}

const DoctorBookingStepReview: FC<Props> = () => {
  return <div>Summary</div>;
};

export default DoctorBookingStepReview;
