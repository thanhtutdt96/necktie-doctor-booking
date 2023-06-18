import { useNavigate } from "react-router";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import FormActions from "components/doctor/doctor-booking-procedure/common/FormActions";
import { useMainLayoutContext } from "contexts/MainLayoutContext";

const DoctorBookingStepDone = () => {
  const navigate = useNavigate();
  const { setModalVisible } = useMainLayoutContext();

  const handleNextStep = () => {
    setModalVisible?.(false);
    navigate("/bookings");
  };

  return (
    <>
      <div className="py-6 flex flex-col items-center">
        <CheckBadgeIcon className="w-20 text-success mb-2" />
        <div>Your booking has been successfully created!</div>
      </div>

      <FormActions
        nextButtonLabel="View Bookings"
        nextButtonIcon={<span className="invisible" />}
        handleNextStep={() => handleNextStep()}
        isBackButtonVisible={false}
        className="fixed left-6 right-6 bottom-4"
      />
    </>
  );
};

export default DoctorBookingStepDone;
