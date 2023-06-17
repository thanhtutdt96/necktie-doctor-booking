import { useMemo, useState } from "react";
import NecktieAvatar from "components/common/NecktieAvatar";
import NecktieLoader from "components/common/NecktieLoader";
import NecktieSearchInput from "components/common/NecktieSearchInput";
import AccordionItem from "components/doctor/common/AccordionItem";
import FieldWrapper from "components/doctor/common/FieldWrapper";
import { useMainLayoutContext } from "contexts/MainLayoutContext";
import { useGetBookingsQuery, useLazyGetDoctorByIdQuery } from "redux/services/necktieApi";
import useAvatarHelper from "hooks/useAvatarHelper";
import useDateTimeHelper from "hooks/useDateTimeHelper";
import { BookingStatus } from "types/Booking";
import { Doctor } from "types/Doctor";

const MyBookings = () => {
  const [fetchDoctorById, { isFetching: isFetchingDoctor }] = useLazyGetDoctorByIdQuery();
  const [activeAccordionId, setActiveAccordionId] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const { initials, avatarColor } = useAvatarHelper(selectedDoctor?.name);
  const { searchTerm, debouncedSearchTerm } = useMainLayoutContext();
  const { formatDisplayDate, formatDisplayHourFromFloat } = useDateTimeHelper();

  const { data: bookings, isLoading } = useGetBookingsQuery();

  const filteredBookings = useMemo(() => {
    if (!bookings?.length) {
      return [];
    }

    return bookings.filter((booking) =>
      [
        booking.name.toLowerCase(),
        booking.date.toLowerCase(),
        booking.start.toString().toLowerCase(),
        booking.status?.toLowerCase() ?? ""
      ].some((element) => element.includes(debouncedSearchTerm.toLowerCase().trim()))
    );
  }, [bookings, debouncedSearchTerm]);

  const handleAccordionOpen = (accordionId: string, doctorId: string) => {
    setSelectedDoctor(undefined);
    setActiveAccordionId(accordionId);

    fetchDoctorById(doctorId)
      .unwrap()
      .then((doctorData) => {
        if (!doctorData) {
          return;
        }

        setSelectedDoctor(doctorData);
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <div className="flex justify-center mt-7">
        <NecktieSearchInput placeholder="Search bookings..." />
      </div>

      <div className="hero mt-5 items-start w-full">
        {isLoading && (
          <div className="flex justify-center items-center">
            <NecktieLoader />
          </div>
        )}

        {searchTerm.length > 0 && filteredBookings?.length === 0 && (
          <p className="text-sm">No doctors found</p>
        )}

        {filteredBookings.length > 0 && (
          <div className="flex-col hero-content flex-wrap gap-y-3 w-full md:max-w-[36rem]">
            {filteredBookings.map((booking) => (
              <AccordionItem
                key={booking.id}
                id={booking.id}
                isOpened={activeAccordionId === booking.id}
                title={
                  <div className="flex flex-1 justify-between">
                    <span>
                      Date: {formatDisplayDate(booking.date)} -{" "}
                      {formatDisplayHourFromFloat(parseFloat(booking.start))}
                    </span>
                    <div
                      className={`badge ${
                        booking.status === BookingStatus.CONFIRMED ? "badge-success" : "badge-error"
                      } badge-outline h-6`}
                    >
                      {booking.status}
                    </div>
                  </div>
                }
                content={
                  isFetchingDoctor ? (
                    <NecktieLoader size="sm" />
                  ) : (
                    <>
                      <FieldWrapper label="Patient name:">
                        <p className="text-sm">{booking.name}</p>
                      </FieldWrapper>

                      <FieldWrapper label="Selected doctor:">
                        <div className="flex items-center">
                          <NecktieAvatar
                            className="w-8"
                            avatarStyle={{ backgroundColor: avatarColor }}
                            initials={initials}
                            initialsSize="sm"
                          />
                          <span className="text-sm ml-2 font-medium">{selectedDoctor?.name}</span>
                        </div>
                      </FieldWrapper>
                    </>
                  )
                }
                onAccordionOpen={(accordionId) =>
                  handleAccordionOpen(accordionId.toString(), booking.doctorId)
                }
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;
