import { useEffect, useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import classNames from "classnames";
import NecktieAvatar from "components/common/NecktieAvatar";
import NecktieLoader from "components/common/NecktieLoader";
import NecktieSearchInput from "components/common/NecktieSearchInput";
import AccordionItem from "components/doctor/common/AccordionItem";
import FieldWrapper from "components/doctor/common/FieldWrapper";
import { useMainLayoutContext } from "contexts/MainLayoutContext";
import { orderBy } from "lodash-es";
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
  const { searchTerm, debouncedSearchTerm, resetContextData } = useMainLayoutContext();
  const { formatDisplayDate, formatDisplayHourFromFloat } = useDateTimeHelper();

  const { data: bookings, isLoading } = useGetBookingsQuery();

  const filteredBookings = useMemo(() => {
    if (!bookings?.length) {
      return [];
    }

    const matchedBookings = bookings.filter((booking) =>
      [
        booking.name.toLowerCase(),
        booking.date.toLowerCase(),
        booking.start.toString().toLowerCase(),
        booking.status?.toLowerCase() ?? ""
      ].some((element) => element.includes(debouncedSearchTerm.toLowerCase().trim()))
    );

    return orderBy(matchedBookings, "date", "desc");
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
      .catch((error) => toast.error(error.data));
  };

  useEffect(() => {
    return () => {
      resetContextData();
    };
  }, [resetContextData]);

  return (
    <div className="hero mt-3">
      <div className="hero-content w-full flex-col">
        <div className="flex justify-center mb-3">
          <NecktieSearchInput placeholder="Search bookings..." />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center">
            <NecktieLoader />
          </div>
        )}

        {searchTerm.length > 0 && filteredBookings?.length === 0 && (
          <p className="text-sm">No bookings found</p>
        )}

        {filteredBookings.length > 0 && (
          <div className="flex-col flex justify-center flex-wrap gap-y-3 w-full md:max-w-[36rem]">
            {filteredBookings.map((booking) => (
              <AccordionItem
                key={booking.id}
                id={booking.id}
                isOpened={activeAccordionId === booking.id}
                className="animate-slideup"
                title={
                  <div className="flex flex-1 justify-between items-center">
                    <span>
                      Date: {formatDisplayDate(booking.date)} -{" "}
                      {formatDisplayHourFromFloat(parseFloat(booking.start))}
                    </span>
                    <div
                      className={classNames("badge badge-outline h-6", {
                        "badge-success": booking.status === BookingStatus.CONFIRMED,
                        "badge-error": booking.status === BookingStatus.CANCEL
                      })}
                    >
                      {booking.status}
                    </div>
                  </div>
                }
                content={
                  isFetchingDoctor ? (
                    <NecktieLoader size="sm" />
                  ) : (
                    <div className="grid grid-cols-2">
                      <FieldWrapper label="Selected doctor:" className="mb-0">
                        <NavLink
                          to={`/doctors/${selectedDoctor?.id}`}
                          className="flex items-center"
                        >
                          <NecktieAvatar
                            className="w-8"
                            avatarStyle={{ backgroundColor: avatarColor }}
                            initials={initials}
                            initialsSize="sm"
                          />
                          <span className="text-sm ml-2 font-medium">{selectedDoctor?.name}</span>
                        </NavLink>
                      </FieldWrapper>

                      <FieldWrapper label="Patient name:" className="mb-0">
                        <p className="text-sm">{booking.name}</p>
                      </FieldWrapper>
                    </div>
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
    </div>
  );
};

export default MyBookings;
