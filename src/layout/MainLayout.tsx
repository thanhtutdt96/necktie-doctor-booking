import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import NecktieNavbar from "components/common/NecktieNavbar";
import MainLayoutContext from "contexts/MainLayoutContext";

const MainLayout = () => {
  return (
    <MainLayoutContext>
      <div className="App">
        <NecktieNavbar />
        <div className="container mx-auto">
          <Outlet />
          <ToastContainer className="md:mt-12" hideProgressBar />
        </div>
      </div>
    </MainLayoutContext>
  );
};

export default MainLayout;
