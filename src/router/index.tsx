import { createBrowserRouter } from "react-router-dom";
import MainLayout from "layout/MainLayout";
import DoctorDetails from "pages/DoctorDetails";
import Doctors from "pages/Doctors";
import MyBookings from "pages/MyBookings";

const childrenRoutes = [
  {
    path: "/",
    element: <Doctors />
  },
  {
    path: "/doctors/:id",
    element: <DoctorDetails />
  },
  {
    path: "/bookings",
    element: <MyBookings />
  }
];

const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [...childrenRoutes]
  }
];

const router = createBrowserRouter(routes);

export default router;
