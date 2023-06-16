import { lazy, useCallback, useMemo, useState } from "react";
import NecktieLoader from "components/common/NecktieLoader";
import NecktieModal from "components/common/NecktieModal";
import DoctorItem from "components/doctor/DoctorItem";
import { useGetDoctorsQuery } from "redux/services/necktieApi";
import useDebounceValue from "hooks/useDebounceValue";
import { Doctor } from "types/Doctor";

const Toast = lazy(() => import("components/common/Toast"));
const DoctorBookingProcedure = lazy(() => import("components/doctor/doctor-booking-procedure"));

const Doctors = () => {
  const { data: doctors, isLoading } = useGetDoctorsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor>();
  const [isModalVisible, setModalVisible] = useState(false);
  const debouncedSearchTerm = useDebounceValue(searchTerm, 500);

  const handleShowModal = useCallback((doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setModalVisible(false);
  }, []);

  const filteredDoctors = useMemo(() => {
    if (!doctors?.length) {
      return [];
    }

    return doctors.filter((doctor) =>
      doctor.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase().trim())
    );
  }, [doctors, debouncedSearchTerm]);

  return (
    <>
      <div className="flex justify-center mt-7">
        <input
          value={searchTerm}
          type="text"
          placeholder="Search..."
          className="input input-bordered w-60 input-sm"
          onChange={(event) => setSearchTerm(event.target.value)}
          disabled={!doctors?.length}
        />
      </div>

      <div className="hero mt-5 items-start w-full">
        {isLoading && (
          <div className="flex justify-center items-center">
            <NecktieLoader />
          </div>
        )}

        {filteredDoctors.length && (
          <div className="flex-col md:flex-row hero-content flex-wrap gap-y-6">
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
            <DoctorBookingProcedure doctor={selectedDoctor} />
          </NecktieModal>
        )}
      </div>
      <Toast />
    </>
  );
};

export default Doctors;
