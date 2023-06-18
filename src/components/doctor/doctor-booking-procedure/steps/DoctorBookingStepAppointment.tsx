import { Dispatch, FC, SetStateAction, useMemo } from "react";
import Calendar from "react-calendar";
import { NavLink } from "react-router-dom";
import { CalendarIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import NecktieAvatar from "components/common/NecktieAvatar";
import FieldWrapper from "components/doctor/common/FieldWrapper";
import FormActions from "components/doctor/doctor-booking-procedure/common/FormActions";
import ScheduleItem from "components/doctor/doctor-booking-procedure/common/ScheduleItem";
import useAvatarHelper from "hooks/useAvatarHelper";
import useDateTimeHelper from "hooks/useDateTimeHelper";
import useDoctorSchedule from "hooks/useDoctorSchedule";
import useModal from "hooks/useModal";
import { BookingFormData } from "types/Booking";
import { DoctorBookingStep } from "types/Common";
import { Doctor, DoctorScheduleDateItem } from "types/Doctor";

interface Props {
  setCurrentFormData: Dispatch<SetStateAction<BookingFormData>>;
  currentFormData: BookingFormData;
  setCurrentStep: Dispatch<SetStateAction<DoctorBookingStep>>;
  doctorName: Doctor["name"];
  doctorOpeningHours: Doctor["opening_hours"];
  doctorId: Doctor["id"];
}

const DoctorBookingStepAppointment: FC<Props> = ({
  currentFormData,
  setCurrentFormData,
  setCurrentStep,
  doctorId,
  doctorName,
  doctorOpeningHours
}) => {
  const { initials, avatarColor } = useAvatarHelper(doctorName);
  const {
    selectedDate,
    setSelectedDate,
    selectedHour,
    setSelectedHour,
    scheduleDates,
    scheduleTimeMap,
    startWorkingHour,
    endWorkingHour,
    startWorkingDay,
    endWorkingDay
  } = useDoctorSchedule(doctorOpeningHours, currentFormData.date, currentFormData.start);
  const { getDefaultSelectedDate } = useDateTimeHelper();
  const { isShowing: isCalendarVisible, toggleModal } = useModal();

  const isFormValid = useMemo(
    () => !!selectedDate?.date && !!selectedHour,
    [selectedDate?.date, selectedHour]
  );

  const handlePreviousStep = () => {
    setCurrentFormData({
      ...currentFormData,
      ...(selectedDate && { date: selectedDate.date }),
      ...(selectedHour && { start: selectedHour })
    });
    setCurrentStep(DoctorBookingStep.FILL);
  };

  const handleNextStep = () => {
    setCurrentFormData({
      ...currentFormData,
      date: selectedDate.date,
      start: selectedHour
    });
    setCurrentStep(DoctorBookingStep.REVIEW);
  };

  const handleCalendarChange = (value: Date) => {
    setSelectedDate(getDefaultSelectedDate(value));
    setSelectedHour(undefined);
    toggleModal(false);
  };

  const handleDateItemClick = (date: DoctorScheduleDateItem) => {
    setSelectedDate(date);
    setSelectedHour(undefined);
  };

  return (
    <>
      <FieldWrapper label="Selected doctor:">
        <NavLink to={`/doctors/${doctorId}`} className="flex items-center">
          <NecktieAvatar
            className="w-8"
            avatarStyle={{ backgroundColor: avatarColor }}
            initials={initials}
            initialsSize="sm"
          />
          <span className="text-sm ml-2 font-medium">{doctorName}</span>
        </NavLink>
      </FieldWrapper>

      <FieldWrapper label="Working time:">
        <p className="text-sm">
          {startWorkingDay} - {endWorkingDay} ({startWorkingHour}-{endWorkingHour})
        </p>
      </FieldWrapper>

      <FieldWrapper
        label="Schedule:"
        labelRight={
          <button onClick={() => toggleModal()}>
            <CalendarIcon className="w-5" />
          </button>
        }
      >
        <div className="relative mb-3">
          {isCalendarVisible ? (
            <Calendar
              className="w-full rounded-lg border-neutral-content"
              value={selectedDate.date}
              selectRange={false}
              allowPartialRange={false}
              minDate={new Date()}
              onChange={(value) => handleCalendarChange(value as Date)}
            />
          ) : (
            <>
              <div className="grid grid-cols-7 gap-4 md:gap-7 mb-3">
                {scheduleDates.map((date) => (
                  <ScheduleItem
                    className="pt-2 pb-1 px-1"
                    key={date.date}
                    isDisabled={date.isPast}
                    isSelected={selectedDate?.date === date.date}
                    onClick={() => handleDateItemClick(date)}
                  >
                    <div className="mb-2">{date.shortDay}</div>
                    <div
                      className={classNames("flex justify-center items-center w-8 h-8", {
                        "bg-secondary rounded-full text-white": selectedDate?.date === date.date
                      })}
                    >
                      {date.day}
                    </div>
                  </ScheduleItem>
                ))}
              </div>

              {scheduleTimeMap?.[selectedDate.shortDay.toUpperCase()].length ? (
                <div className="grid grid-cols-2 gap-2">
                  {scheduleTimeMap?.[selectedDate.shortDay.toUpperCase()]?.map(
                    (timeItem, index) => (
                      <ScheduleItem
                        className="py-2"
                        key={index}
                        isSelected={selectedHour === timeItem.start}
                        isDisabled={timeItem.isPast}
                        onClick={() => setSelectedHour(timeItem.start)}
                      >
                        {timeItem.displayStartTime} - {timeItem.displayEndTime}
                      </ScheduleItem>
                    )
                  )}
                </div>
              ) : (
                <p className="text-sm">No time slot available</p>
              )}
            </>
          )}
        </div>
      </FieldWrapper>

      <FormActions
        isFormValid={isFormValid}
        handlePreviousStep={handlePreviousStep}
        handleNextStep={handleNextStep}
        className="fixed left-6 right-6 bottom-4"
      />
    </>
  );
};

export default DoctorBookingStepAppointment;
