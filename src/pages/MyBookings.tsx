import { lazy } from "react";

const Toast = lazy(() => import("components/common/Toast"));

const MyBookings = () => {
  return (
    <>
      <h2 className="text-center">My Bookings</h2>
      <div className="container"></div>
      <Toast />
    </>
  );
};

export default MyBookings;
