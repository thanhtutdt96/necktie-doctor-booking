import { useCallback, useMemo } from "react";
import NecktieLoader from "components/common/NecktieLoader";
import NecktieModal from "components/common/NecktieModal";
import NecktieSearchInput from "components/common/NecktieSearchInput";
import DoctorItem from "components/doctor/DoctorItem";
import DoctorBookingProcedure from "components/doctor/doctor-booking-procedure";
import { useMainLayoutContext } from "contexts/MainLayoutContext";
import { useGetDoctorsQuery } from "redux/services/necktieApi";
import { Doctor } from "types/Doctor";

const Doctors = () => {
  const { data: doctors, isLoading } = useGetDoctorsQuery();
  const { searchTerm, setSelectedDoctor, debouncedSearchTerm, isModalVisible, setModalVisible } =
    useMainLayoutContext();

  const handleShowModal = useCallback(
    (doctor: Doctor) => {
      setSelectedDoctor?.(doctor);
      setModalVisible?.(true);
    },
    [setModalVisible, setSelectedDoctor]
  );

  const handleCloseModal = useCallback(() => {
    setModalVisible?.(false);
  }, [setModalVisible]);

  const filteredDoctors = useMemo(() => {
    if (!doctors?.length) {
      return [];
    }

    return doctors.filter((doctor) =>
      [
        doctor.name.toLowerCase(),
        doctor.description?.toLowerCase() ?? "",
        doctor.address.line_1.toLowerCase(),
        doctor.address.line_2?.toLowerCase() ?? "",
        doctor.address.district.toLowerCase()
      ].some((element) => element.includes(debouncedSearchTerm.toLowerCase().trim()))
    );
  }, [doctors, debouncedSearchTerm]);

  return (
    <>
      <div className="flex justify-center mt-7">
        <NecktieSearchInput isDisabled={!doctors?.length} placeholder="Search doctors..." />
      </div>

      <div className="hero mt-5 items-start w-full">
        {isLoading && (
          <div className="flex justify-center items-center">
            <NecktieLoader />
          </div>
        )}

        {searchTerm.length > 0 && filteredDoctors?.length === 0 && (
          <p className="text-sm">No doctors found</p>
        )}

        {filteredDoctors.length > 0 && (
          <div className="flex-col md:flex-row hero-content flex-wrap gap-y-6 w-full">
            {filteredDoctors.map((doctor) => (
              <DoctorItem
                key={doctor.id}
                name={doctor.name}
                description={doctor.description}
                address={doctor.address}
                onPrimaryButtonClick={() => handleShowModal(doctor)}
              />
            ))}
          </div>
        )}

        {isModalVisible && (
          <NecktieModal
            isVisible={isModalVisible}
            onModalClosed={handleCloseModal}
            containerClassName="pb-20"
          >
            <DoctorBookingProcedure />
          </NecktieModal>
        )}
      </div>
      {/*<Toast />*/}
    </>
  );
};

export default Doctors;
