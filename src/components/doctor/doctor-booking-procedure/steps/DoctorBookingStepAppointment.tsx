import { Dispatch, FC, SetStateAction, useMemo, useState } from "react";
import Calendar from "react-calendar";
import { CalendarIcon } from "@heroicons/react/24/solid";
import NecktieAvatar from "components/common/NecktieAvatar";
import FormActions from "components/doctor/doctor-booking-procedure/common/FormActions";
import ScheduleItem from "components/doctor/doctor-booking-procedure/common/ScheduleItem";
import useDateTimeHelper from "hooks/useDateTimeHelper";
import useModal from "hooks/useModal";
import useNecktieHelper from "hooks/useNecktieHelper";
import { BookingFormData } from "types/Booking";
import { DoctorBookingStep } from "types/Common";
import { Doctor, DoctorScheduleDateItem, DoctorScheduleMap } from "types/Doctor";

interface Props {
  setCurrentFormData: Dispatch<SetStateAction<BookingFormData>>;
  currentFormData: BookingFormData;
  setCurrentStep: Dispatch<SetStateAction<DoctorBookingStep>>;
  doctorName: Doctor["name"];
  doctorOpeningHours: Doctor["opening_hours"];
}

const DoctorBookingStepAppointment: FC<Props> = ({
  currentFormData,
  setCurrentFormData,
  setCurrentStep,
  doctorName,
  doctorOpeningHours
}) => {
  const { getInitialsFromName, stringToColor } = useNecktieHelper();
  const {
    getCalendarDates,
    getTimeItems,
    getDefaultSelectedDate,
    getWorkingHours,
    getWorkingDays
  } = useDateTimeHelper();
  const { isShowing: isCalendarVisible, toggleModal } = useModal();

  const [selectedDate, setSelectedDate] = useState<DoctorScheduleDateItem>(
    getDefaultSelectedDate(currentFormData.date ? currentFormData.date : new Date())
  );
  const [selectedHour, setSelectedHour] = useState(
    currentFormData.start ? currentFormData.start : ""
  );

  const initials = useMemo(
    () => getInitialsFromName(doctorName),
    [getInitialsFromName, doctorName]
  );
  const avatarColor = useMemo(() => stringToColor(doctorName), [doctorName, stringToColor]);

  const scheduleDates = useMemo(() => {
    return getCalendarDates(selectedDate.date, 1);
  }, [getCalendarDates, selectedDate.date]);

  const [startWorkingHour, endWorkingHour] = useMemo(
    () => getWorkingHours(doctorOpeningHours),
    [doctorOpeningHours, getWorkingHours]
  );

  const [startWorkingDay, endWorkingDay] = useMemo(
    () => getWorkingDays(doctorOpeningHours),
    [doctorOpeningHours, getWorkingDays]
  );

  const scheduleTimeMap = useMemo(() => {
    return doctorOpeningHours.reduce((accumulative: DoctorScheduleMap, currentValue) => {
      const timeItems = getTimeItems(
        parseFloat(currentValue.start),
        parseFloat(currentValue.end),
        60,
        selectedDate.date
      );

      const futureTimeItems = timeItems.filter((item) => !item.isPast);

      accumulative[currentValue.day] = currentValue.isClosed
        ? []
        : futureTimeItems.length
        ? futureTimeItems
        : [];

      return accumulative;
    }, {});
  }, [doctorOpeningHours, getTimeItems, selectedDate.date]);

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
    setSelectedHour("");
    toggleModal(false);
  };

  const handleDateItemClick = (date: DoctorScheduleDateItem) => {
    setSelectedDate(date);
    setSelectedHour("");
  };

  return (
    <div>
      <div className="mb-4">
        <h4 className="text-md mb-1 font-medium">Selected Doctor:</h4>
        <div className="flex items-center">
          <NecktieAvatar
            className="w-8"
            avatarStyle={{ backgroundColor: avatarColor }}
            initials={initials}
            initialsSize="sm"
          />
          <span className="text-sm ml-2 font-medium">{doctorName}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-md mb-1 font-medium">Working time:</h4>
        <p className="text-sm mb-1">
          {startWorkingDay} - {endWorkingDay} ({startWorkingHour}-{endWorkingHour})
        </p>
      </div>

      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <h4 className="text-md font-medium">Schedule:</h4>
          <button onClick={() => toggleModal()}>
            <CalendarIcon className="w-5" />
          </button>
        </div>

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
                    className="pt-2 pb-1"
                    key={date.date}
                    isDisabled={date.isPast}
                    isSelected={selectedDate?.date === date.date}
                    onClick={() => handleDateItemClick(date)}
                  >
                    <div className="mb-2">{date.shortDay}</div>
                    <div
                      className={`flex justify-center items-center w-8 h-8 ${
                        selectedDate?.date === date.date
                          ? "bg-secondary rounded-full text-white"
                          : ""
                      }`}
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
      </div>

      <FormActions
        isFormValid={isFormValid}
        handlePreviousStep={handlePreviousStep}
        handleNextStep={handleNextStep}
        className="fixed left-6 right-6 bottom-4"
      />
    </div>
  );
};

export default DoctorBookingStepAppointment;
