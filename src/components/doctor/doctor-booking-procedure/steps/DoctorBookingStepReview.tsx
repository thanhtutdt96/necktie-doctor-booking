import { Dispatch, FC, SetStateAction } from "react";
import { toast } from "react-toastify";
import NecktieAvatar from "components/common/NecktieAvatar";
import FieldWrapper from "components/doctor/common/FieldWrapper";
import FormActions from "components/doctor/doctor-booking-procedure/common/FormActions";
import { useCreateBookingMutation } from "redux/services/necktieApi";
import useAvatarHelper from "hooks/useAvatarHelper";
import useDateTimeHelper from "hooks/useDateTimeHelper";
import { BookingFormData } from "types/Booking";
import { DoctorBookingStep } from "types/Common";
import { Doctor } from "types/Doctor";

interface Props {
  currentFormData: BookingFormData;
  setCurrentStep: Dispatch<SetStateAction<DoctorBookingStep>>;
  doctorName: Doctor["name"];
}

const DoctorBookingStepReview: FC<Props> = ({ currentFormData, setCurrentStep, doctorName }) => {
  const { initials, avatarColor } = useAvatarHelper(doctorName);
  const { formatDisplayDate, formatDisplayHourFromFloat } = useDateTimeHelper();
  const [createBooking, { isLoading }] = useCreateBookingMutation();

  const handleSubmitData = () => {
    createBooking(currentFormData)
      .unwrap()
      .then((isFulfilled) => {
        if (!isFulfilled) {
          return;
        }

        setCurrentStep(DoctorBookingStep.DONE);
      })
      .catch((error) => toast.error(error.data));
  };

  return (
    <div className="grid grid-cols-2">
      <FieldWrapper label="Patient name:">
        <p className="text-sm">{currentFormData.name}</p>
      </FieldWrapper>

      <FieldWrapper label="Booking detail">
        <p className="text-sm">
          {formatDisplayDate(currentFormData.date ?? "")} -{" "}
          {formatDisplayHourFromFloat(currentFormData.start ?? 0)}
        </p>
      </FieldWrapper>

      <FieldWrapper label="Selected doctor:">
        <div className="flex items-center">
          <NecktieAvatar
            className="w-8"
            avatarStyle={{ backgroundColor: avatarColor }}
            initials={initials}
            initialsSize="sm"
          />
          <span className="text-sm ml-2 font-medium">{doctorName}</span>
        </div>
      </FieldWrapper>

      <FormActions
        isFormValid={true}
        isLoading={isLoading}
        handlePreviousStep={() => setCurrentStep(DoctorBookingStep.APPOINTMENT)}
        handleNextStep={handleSubmitData}
        className="fixed left-6 right-6 bottom-4"
      />
    </div>
  );
};

export default DoctorBookingStepReview;
