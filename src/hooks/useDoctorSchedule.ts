import { useMemo, useState } from "react";
import useDateTimeHelper from "hooks/useDateTimeHelper";
import { DoctorOpeningHour, DoctorScheduleDateItem, DoctorScheduleMap } from "types/Doctor";

const useDoctorSchedule = (
  doctorOpeningHours: DoctorOpeningHour[],
  defaultDate?: string,
  defaultHour?: number
) => {
  const {
    getCalendarDates,
    getTimeItems,
    getDefaultSelectedDate,
    getWorkingHours,
    getWorkingDays
  } = useDateTimeHelper();

  const [selectedDate, setSelectedDate] = useState<DoctorScheduleDateItem>(
    getDefaultSelectedDate(defaultDate ? defaultDate : new Date())
  );
  const [selectedHour, setSelectedHour] = useState(defaultHour ? defaultHour : undefined);

  const scheduleDates = useMemo(() => {
    return getCalendarDates(selectedDate.date, 1);
  }, [getCalendarDates, selectedDate.date]);

  const [startWorkingHour, endWorkingHour] = useMemo(() => {
    if (!doctorOpeningHours.length) {
      return ["", ""];
    }

    return getWorkingHours(doctorOpeningHours);
  }, [doctorOpeningHours, getWorkingHours]);

  const [startWorkingDay, endWorkingDay] = useMemo(() => {
    if (!doctorOpeningHours.length) {
      return ["", ""];
    }

    return getWorkingDays(doctorOpeningHours);
  }, [doctorOpeningHours, getWorkingDays]);

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
        ? timeItems
        : [];

      return accumulative;
    }, {});
  }, [doctorOpeningHours, getTimeItems, selectedDate.date]);

  const isAvailableToday = useMemo(() => {
    if (!doctorOpeningHours.length) {
      return false;
    }

    const today = getDefaultSelectedDate(new Date()).shortDay?.toUpperCase();

    return (scheduleTimeMap?.[today] ?? []).length > 0;
  }, [doctorOpeningHours.length, getDefaultSelectedDate, scheduleTimeMap]);

  return {
    selectedDate,
    setSelectedDate,
    selectedHour,
    setSelectedHour,
    scheduleDates,
    scheduleTimeMap,
    startWorkingDay,
    endWorkingDay,
    startWorkingHour,
    endWorkingHour,
    isAvailableToday
  };
};

export default useDoctorSchedule;
