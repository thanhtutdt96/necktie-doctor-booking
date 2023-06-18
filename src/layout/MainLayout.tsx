import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import NecktieNavbar from "components/common/NecktieNavbar";
import MainLayoutContext from "contexts/MainLayoutContext";

const MainLayout = () => {
  return (
    <MainLayoutContext>
      <div className="App">
        <NecktieNavbar />
        <Outlet />
        <ToastContainer className="md:mt-12" hideProgressBar />
      </div>
    </MainLayoutContext>
  );
};

export default MainLayout;
