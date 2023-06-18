import { FC, useState } from "react";
import NecktieStepper from "components/common/NecktieStepper";
import DoctorBookingStepAppointment from "components/doctor/doctor-booking-procedure/steps/DoctorBookingStepAppointment";
import DoctorBookingStepDone from "components/doctor/doctor-booking-procedure/steps/DoctorBookingStepDone";
import DoctorBookingStepFill from "components/doctor/doctor-booking-procedure/steps/DoctorBookingStepFill";
import DoctorBookingStepReview from "components/doctor/doctor-booking-procedure/steps/DoctorBookingStepReview";
import { useMainLayoutContext } from "contexts/MainLayoutContext";
import { useAppSelector } from "redux/hooks";
import { BookingFormData } from "types/Booking";
import { DoctorBookingStep } from "types/Common";
import { DoctorScheduleDateItem } from "types/Doctor";

const bookingSteps = [
  {
    key: DoctorBookingStep.FILL,
    label: "Fill Info"
  },
  {
    key: DoctorBookingStep.APPOINTMENT,
    label: "Appointment"
  },
  {
    key: DoctorBookingStep.REVIEW,
    label: "Review"
  },
  {
    key: DoctorBookingStep.DONE,
    label: "Done"
  }
];

interface Props {
  selectedDate?: DoctorScheduleDateItem;
  selectedHour?: number;
}
const DoctorBookingProcedure: FC<Props> = ({ selectedDate, selectedHour }) => {
  const user = useAppSelector((state) => state.auth.user);

  const { selectedDoctor: doctor } = useMainLayoutContext();
  const [currentStep, setCurrentStep] = useState(DoctorBookingStep.FILL);
  const [currentFormData, setCurrentFormData] = useState<BookingFormData>({
    name: user.name,
    doctorId: doctor?.id,
    start: undefined,
    date: ""
  });

  const handleStepFillNext = () => {
    if (!!selectedDate?.date && !!selectedHour) {
      setCurrentFormData((prevState) => ({
        ...prevState,
        date: selectedDate.date,
        start: selectedHour
      }));
      setCurrentStep(DoctorBookingStep.REVIEW);

      return;
    }
    setCurrentStep(DoctorBookingStep.APPOINTMENT);
  };

  const handleStepReviewBack = () => {
    if (!!selectedDate?.date && !!selectedHour) {
      setCurrentStep(DoctorBookingStep.FILL);

      return;
    }
    setCurrentStep(DoctorBookingStep.APPOINTMENT);
  };

  return (
    <>
      <div className="flex justify-center mb-5">
        <NecktieStepper steps={bookingSteps} currentStep={currentStep} />
      </div>

      <div className="flex-1 max-h-[400px] -mx-6 px-6 overflow-y-auto">
        {currentStep === DoctorBookingStep.FILL && (
          <DoctorBookingStepFill
            currentFormData={currentFormData}
            setCurrentFormData={setCurrentFormData}
            onNextStep={handleStepFillNext}
          />
        )}
        {currentStep === DoctorBookingStep.APPOINTMENT && (
          <DoctorBookingStepAppointment
            currentFormData={currentFormData}
            setCurrentFormData={setCurrentFormData}
            setCurrentStep={setCurrentStep}
            doctorId={doctor?.id ?? ""}
            doctorName={doctor?.name ?? ""}
            doctorOpeningHours={doctor?.opening_hours ?? []}
          />
        )}
        {currentStep === DoctorBookingStep.REVIEW && (
          <DoctorBookingStepReview
            currentFormData={currentFormData}
            onBackStep={handleStepReviewBack}
            setCurrentStep={setCurrentStep}
            doctorName={doctor?.name ?? ""}
          />
        )}
        {currentStep === DoctorBookingStep.DONE && <DoctorBookingStepDone />}
      </div>
    </>
  );
};

export default DoctorBookingProcedure;
