import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/solid";
import FormActions from "components/doctor/doctor-booking-procedure/common/FormActions";
import { useMainLayoutContext } from "contexts/MainLayoutContext";

const DoctorBookingStepDone = () => {
  const { setModalVisible } = useMainLayoutContext();

  return (
    <>
      <div className="py-6 flex flex-col items-center">
        <CheckBadgeIcon className="w-20 text-success mb-2" />
        <div>Your booking has been successfully created!</div>
      </div>

      <FormActions
        nextButtonLabel="Finish"
        nextButtonIcon={<CheckIcon className="w-6" />}
        handleNextStep={() => setModalVisible?.(false)}
        isBackButtonVisible={false}
        className="fixed left-6 right-6 bottom-4"
      />
    </>
  );
};

export default DoctorBookingStepDone;
