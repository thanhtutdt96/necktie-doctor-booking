import { MouseEvent, useState } from "react";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/20/solid";
import NecktieStepper from "components/common/NecktieStepper";
import DoctorBookingStepAppointment from "components/doctor/doctor-booking-procedure/steps/DoctorBookingStepAppointment";
import DoctorBookingStepFill from "components/doctor/doctor-booking-procedure/steps/DoctorBookingStepFill";
import DoctorBookingStepReview from "components/doctor/doctor-booking-procedure/steps/DoctorBookingStepReview";
import { DoctorBookingStep } from "types/Common";

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
  }
];

const DoctorBookingProcedure = () => {
  const [currentStep, setCurrentStep] = useState(DoctorBookingStep.FILL);

  const bookingStepValues = bookingSteps.map((step) => step.key);
  const handleNextStep = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const currentStepIndex = bookingStepValues.indexOf(currentStep);
    const nextStep = bookingStepValues?.[currentStepIndex + 1];

    if (!nextStep) {
      return;
    }
    setCurrentStep(nextStep);
  };

  const handlePreviousStep = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const currentStepIndex = bookingStepValues.indexOf(currentStep);
    const previousStep = bookingStepValues?.[currentStepIndex - 1];

    if (!previousStep) {
      return;
    }
    setCurrentStep(previousStep);
  };

  return (
    <div>
      <div className="flex justify-center">
        <NecktieStepper steps={bookingSteps} currentStep={currentStep} />
      </div>

      {currentStep === DoctorBookingStep.FILL && <DoctorBookingStepFill />}
      {currentStep === DoctorBookingStep.APPOINTMENT && <DoctorBookingStepAppointment />}
      {currentStep === DoctorBookingStep.REVIEW && <DoctorBookingStepReview />}

      <div className="flex justify-between modal-actions">
        <button className="btn btn-primary btn-outline" onClick={handlePreviousStep}>
          <ChevronDoubleLeftIcon className="w-6" />
          Back
        </button>
        <button className="btn btn-primary btn-outline" onClick={handleNextStep}>
          Next <ChevronDoubleRightIcon className="w-6" />
        </button>
      </div>
    </div>
  );
};

export default DoctorBookingProcedure;
