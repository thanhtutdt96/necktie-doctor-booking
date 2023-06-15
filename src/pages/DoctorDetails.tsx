import { lazy } from "react";

const Toast = lazy(() => import("components/Common/Toast"));

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
