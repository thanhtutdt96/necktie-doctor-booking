import { addDays, addMinutes, format, isAfter, isDate, startOfWeek } from "date-fns";
import { capitalize, maxBy } from "lodash-es";
import { Doctor, DoctorScheduleTimeItem } from "types/Doctor";

const DAY_LIMIT = 7;
const DATE_FORMAT = "yyyy-MM-dd";
const SHORT_DAY_FORMAT = "iii";
const DAY_FORMAT = "dd";
const DISPLAY_DATE_FORMAT = "MMM, dd, yyyy";

export const HOUR_FORMAT = "HH.mm";
const DISPLAY_HOUR_FORMAT = "hh:mmaaa";

export const FORM_HOUR_FORMAT = "HH:mm";

const DAYS_OF_WEEK_SORTER: Record<string, number> = {
  MON: 0,
  TUE: 1,
  WED: 2,
  THU: 3,
  FRI: 4,
  SAT: 5,
  SUN: 6
};

const useDateTimeHelper = () => {
  const formatDisplayDate = (date: string | Date) => {
    const dateValue = isDate(date) ? (date as Date) : new Date(date);

    return format(dateValue, DISPLAY_DATE_FORMAT);
  };

  const getDefaultSelectedDate = (date: string | Date) => {
    const dateValue = isDate(date) ? (date as Date) : new Date(date);

    return {
      date: format(dateValue, DATE_FORMAT),
      day: format(dateValue, DAY_FORMAT),
      shortDay: format(dateValue, SHORT_DAY_FORMAT).toUpperCase()
    };
  };

  const convertFloatToTime = (floatNumber: number) => {
    const hour = Math.floor(floatNumber);
    let decimal = floatNumber - hour;

    const min = 1 / 60;
    decimal = min * Math.round(decimal / min);

    let minute = Math.floor(decimal * 60) + "";

    if (minute.length < 2) {
      minute = "0" + minute;
    }

    return `${hour}.${minute}`;
  };

  const formatDisplayHour = (date: Date) => format(date, DISPLAY_HOUR_FORMAT);
  const formatDisplayHourFromFloat = (inputHour: number) => {
    const [hour, minute] = getHourMinuteArray(inputHour);

    const date = new Date();

    date.setHours(hour, minute);

    return formatDisplayHour(date);
  };

  const formatHour = (date: Date) => format(date, HOUR_FORMAT);

  const getWorkingHours = (openingHours: Doctor["opening_hours"]) => {
    const maxStartOpeningHour = maxBy(openingHours, "start");
    const maxEndOpeningHour = maxBy(openingHours, "end");

    return [
      formatDisplayHourFromFloat(parseFloat(maxStartOpeningHour?.start ?? "")),
      formatDisplayHourFromFloat(parseFloat(maxEndOpeningHour?.start ?? ""))
    ];
  };

  const getWorkingDays = (openingHours: Doctor["opening_hours"]) => {
    const sortedHours = openingHours
      .filter((hour) => !hour.isClosed)
      .sort((a, b) => DAYS_OF_WEEK_SORTER[a.day] - DAYS_OF_WEEK_SORTER[b.day])
      .map((item) => capitalize(item.day));

    return [sortedHours.at(0), sortedHours.at(-1)];
  };

  const convertTimeToFloat = (time: string) => {
    const floatTime = parseFloat(time);

    const hour = Math.floor(floatTime);
    let decimal = floatTime - hour;

    const min = 60;
    decimal = Math.round(decimal * 100) / 100;

    const minute = (decimal / min) * 100;

    return parseFloat((hour + minute).toFixed(2));
  };

  const addDay = (date: string | Date, amount: number) => {
    const dateValue = isDate(date) ? (date as Date) : new Date(date);
    return addDays(dateValue, amount);
  };

  const getHourMinuteArray = (timeInput: number) =>
    convertFloatToTime(timeInput)
      .split(".")
      .map((time) => parseInt(time));

  const getCalendarDates = (date: string | Date, weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6) => {
    const dates = [];

    const dateValue = isDate(date) ? (date as Date) : new Date(date);
    const startDate = startOfWeek(dateValue, { weekStartsOn });

    for (let i = 0; i < DAY_LIMIT; i++) {
      const date = addDay(startDate, i);

      const today = new Date();
      today.setHours(0, 0, 0, 0);

      dates.push({
        date: format(date, DATE_FORMAT),
        shortDay: format(date, SHORT_DAY_FORMAT),
        day: format(date, DAY_FORMAT),
        isPast: isAfter(today, date)
      });
    }

    return dates;
  };

  const getTimeItems = (
    startTimeInput: number,
    endTimeInput: number,
    durationInMinutes: number,
    date: string | Date
  ) => {
    const timeItems: DoctorScheduleTimeItem[] = [];

    const dateValue = isDate(date) ? (date as Date) : new Date(date);
    const [startHour, startMinute] = getHourMinuteArray(startTimeInput);
    const [endHour, endMinute] = getHourMinuteArray(endTimeInput);

    let startTime = new Date(dateValue);
    startTime.setHours(startHour, startMinute);

    const endTime = new Date(dateValue);
    endTime.setHours(endHour, endMinute);

    do {
      const displayStartTime = formatDisplayHour(startTime);
      const displayEndTime = formatDisplayHour(addMinutes(startTime, durationInMinutes));

      timeItems.push({
        start: convertTimeToFloat(formatHour(startTime)),
        displayStartTime,
        end: convertTimeToFloat(formatHour(addMinutes(startTime, durationInMinutes))),
        displayEndTime,
        isPast: isAfter(new Date(), startTime)
      });

      startTime = addMinutes(startTime, durationInMinutes);
    } while (!isAfter(addMinutes(startTime, durationInMinutes), endTime));

    return timeItems;
  };

  return {
    getDefaultSelectedDate,
    getCalendarDates,
    getTimeItems,
    getWorkingHours,
    getWorkingDays,
    formatDisplayDate,
    formatDisplayHour,
    formatDisplayHourFromFloat
  };
};

export default useDateTimeHelper;
