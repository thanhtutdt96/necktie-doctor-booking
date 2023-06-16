import { FC, useState } from "react";
import NecktieStepper from "components/common/NecktieStepper";
import DoctorBookingStepAppointment from "components/doctor/doctor-booking-procedure/steps/DoctorBookingStepAppointment";
import DoctorBookingStepDone from "components/doctor/doctor-booking-procedure/steps/DoctorBookingStepDone";
import DoctorBookingStepFill from "components/doctor/doctor-booking-procedure/steps/DoctorBookingStepFill";
import DoctorBookingStepReview from "components/doctor/doctor-booking-procedure/steps/DoctorBookingStepReview";
import { BookingFormData } from "types/Booking";
import { DoctorBookingStep } from "types/Common";
import { Doctor } from "types/Doctor";

const bookingSteps = [
  {
    key: DoctorBookingStep.FILL,
    label: "Fill Info"
  },
  {
    key: DoctorBookingStep.APPOINTMENT,
    label: "Select Appointment"
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
  doctor?: Doctor;
}

const DoctorBookingProcedure: FC<Props> = ({ doctor }) => {
  const [currentStep, setCurrentStep] = useState(DoctorBookingStep.FILL);
  const [currentFormData, setCurrentFormData] = useState<BookingFormData>({
    name: "",
    doctorId: doctor?.id,
    start: undefined,
    date: ""
  });

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
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === DoctorBookingStep.APPOINTMENT && (
          <DoctorBookingStepAppointment
            currentFormData={currentFormData}
            setCurrentFormData={setCurrentFormData}
            setCurrentStep={setCurrentStep}
            doctorName={doctor?.name ?? ""}
            doctorOpeningHours={doctor?.opening_hours ?? []}
          />
        )}
        {currentStep === DoctorBookingStep.REVIEW && (
          <DoctorBookingStepReview
            currentFormData={currentFormData}
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
