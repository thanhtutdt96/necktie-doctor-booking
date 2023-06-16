import { CheckBadgeIcon } from "@heroicons/react/24/solid";

const DoctorBookingStepDone = () => {
  return (
    <>
      <div className="py-6 flex flex-col items-center">
        <CheckBadgeIcon className="w-20 text-success mb-2" />
        <div>Your booking has been successfully created!</div>
      </div>
    </>
  );
};

export default DoctorBookingStepDone;
