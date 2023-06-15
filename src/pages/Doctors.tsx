import { createRef, lazy, useEffect, useState } from "react";
import NecktieLoader from "components/Common/NecktieLoader";
import NecktieModal from "components/Common/NecktieModal";
import DoctorBookingProcedure from "components/Doctor/DoctorBookingProcedure";
import DoctorItem from "components/Doctor/DoctorItem";
import { useGetDoctorsQuery } from "redux/services/necktieApi";
import useDebounceValue from "hooks/useDebounceValue";

const Toast = lazy(() => import("components/Common/Toast"));

const Doctors = () => {
  const { data: doctors, isLoading } = useGetDoctorsQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);
  const debouncedValue = useDebounceValue(searchTerm, 500);

  const modalRef = createRef<HTMLDialogElement>();

  // useEffect(() => {
  //   setModalVisible(true);
  //   modalRef.current?.showModal();
  // }, []);
  const handleShowModal = () => {
    setModalVisible(true);
    // console.log(modalRef.current);
    // modalRef.current?.showModal();
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

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

        {doctors?.length && (
          <div className="flex-col md:flex-row hero-content flex-wrap gap-y-6">
            {doctors.map((doctor) => (
              <DoctorItem
                key={doctor.id}
                name={doctor.name}
                description={doctor.description}
                address={doctor.address}
                onPrimaryButtonClick={handleShowModal}
              />
            ))}
          </div>
        )}

        {isModalVisible && (
          <NecktieModal isVisible={isModalVisible} onModalClosed={handleCloseModal}>
            <DoctorBookingProcedure />
          </NecktieModal>
        )}
      </div>
      <Toast />
    </>
  );
};

export default Doctors;
