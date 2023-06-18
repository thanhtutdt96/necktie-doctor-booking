import { useEffect } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { BellAlertIcon, CalendarIcon } from "@heroicons/react/24/solid";
import classNames from "classnames";
import NecktieAvatar from "components/common/NecktieAvatar";
import NecktieLoader from "components/common/NecktieLoader";
import NecktieModal from "components/common/NecktieModal";
import DoctorAvailableStatus from "components/doctor/common/DoctorAvailableStatus";
import FieldWrapper from "components/doctor/common/FieldWrapper";
import DoctorBookingProcedure from "components/doctor/doctor-booking-procedure";
import ScheduleItem from "components/doctor/doctor-booking-procedure/common/ScheduleItem";
import { useMainLayoutContext } from "contexts/MainLayoutContext";
import { useGetDoctorByIdQuery } from "redux/services/necktieApi";
import useAvatarHelper from "hooks/useAvatarHelper";
import useDateTimeHelper from "hooks/useDateTimeHelper";
import useDoctorSchedule from "hooks/useDoctorSchedule";
import useModal from "hooks/useModal";
import { DoctorScheduleDateItem } from "types/Doctor";

const DoctorsDetails = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { isModalVisible, setModalVisible, setSelectedDoctor } = useMainLayoutContext();

  const { data: doctor, isLoading } = useGetDoctorByIdQuery(doctorId as string);
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
    endWorkingDay,
    isAvailableToday
  } = useDoctorSchedule(doctor?.opening_hours ?? []);

  const { initials, avatarColor } = useAvatarHelper(doctor?.name);
  const { getDefaultSelectedDate } = useDateTimeHelper();
  const { isShowing: isCalendarVisible, toggleModal } = useModal();

  const handleCalendarChange = (value: Date) => {
    setSelectedDate(getDefaultSelectedDate(value));
    setSelectedHour(undefined);
    toggleModal(false);
  };

  const handleDateItemClick = (date: DoctorScheduleDateItem) => {
    setSelectedDate(date);
    setSelectedHour(undefined);
  };

  const handleBookClick = () => {
    setModalVisible?.(true);
  };

  useEffect(() => {
    if (!doctor) {
      return;
    }

    setSelectedDoctor?.(doctor);
  }, [doctor, setSelectedDoctor]);

  return (
    <div className="container mx-auto">
      <div className="hero mt-3">
        <div className="hero-content w-full flex-col items-start max-w-[45rem]">
          <button className="btn btn-sm btn-outline btn-primary" onClick={() => navigate(-1)}>
            <ChevronLeftIcon className="w-5" />
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="hero mt-3">
          <NecktieLoader />
        </div>
      )}

      {doctor && (
        <>
          <div className="hero">
            <div className="hero-content w-full md:flex-row flex-col items-center md:items-start max-w-[45rem] justify-start">
              <NecktieAvatar
                className="w-44 h-52 max-w-sm rounded-lg shadow-2xl text-5xl"
                initials={initials}
                avatarStyle={{ backgroundColor: avatarColor }}
              />
              <div>
                <h1 className="text-2xl font-bold mb-2">Dr. {doctor?.name}</h1>
                <DoctorAvailableStatus isAvailableToday={isAvailableToday} />
                <p className="mt-3">
                  {doctor.address.line_1}
                  {doctor.address.line_2 ? `, ${doctor.address.line_2}` : ""},{" "}
                  {doctor.address.district}
                </p>
              </div>
            </div>
          </div>

          <div className="hero mt-3">
            <div className="hero-content w-full flex-col items-start max-w-[45rem]">
              <FieldWrapper label="About:">
                <p className="text-sm">
                  {doctor.description ? doctor.description : "No data added"}
                </p>
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
                className="w-full mb-0"
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
                      <div className="grid grid-cols-7 gap-4 md:gap-12 mb-3">
                        {scheduleDates.map((date) => (
                          <ScheduleItem
                            className="pt-2 pb-1 md:py-3 px-1"
                            key={date.date}
                            isDisabled={date.isPast}
                            isSelected={selectedDate?.date === date.date}
                            onClick={() => handleDateItemClick(date)}
                          >
                            <div className="mb-2">{date.shortDay}</div>
                            <div
                              className={classNames(
                                "flex justify-center items-center w-8 h-8 md:w-10 md:h-10",
                                {
                                  "bg-secondary rounded-full text-white":
                                    selectedDate?.date === date.date
                                }
                              )}
                            >
                              {date.day}
                            </div>
                          </ScheduleItem>
                        ))}
                      </div>

                      {scheduleTimeMap?.[selectedDate.shortDay.toUpperCase()].length ? (
                        <div className="grid grid-cols-2 gap-2 md:gap-4 md:mt-4">
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

              <button
                className="self-center btn btn-secondary btn-sm"
                disabled={!selectedDate.date || !selectedHour}
                onClick={handleBookClick}
              >
                <BellAlertIcon className="w-4 h-auto" />
                Book
              </button>
            </div>
          </div>
        </>
      )}

      {isModalVisible && (
        <NecktieModal
          isVisible={isModalVisible}
          onModalClosed={() => setModalVisible?.(false)}
          containerClassName="pb-20"
        >
          <DoctorBookingProcedure selectedDate={selectedDate} selectedHour={selectedHour} />
        </NecktieModal>
      )}
    </div>
  );
};

export default DoctorsDetails;
