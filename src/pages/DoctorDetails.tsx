import { lazy } from "react";

const Toast = lazy(() => import("components/common/Toast"));

const DoctorsDetails = () => {
  return (
    <>
      <h2 className="text-center">Details</h2>
      <div className="container"></div>
      <Toast />
    </>
  );
};

export default DoctorsDetails;
