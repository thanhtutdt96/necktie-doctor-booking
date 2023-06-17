import { Outlet } from "react-router";
import NecktieNavbar from "components/common/NecktieNavbar";
import MainLayoutContext from "contexts/MainLayoutContext";
const MainLayout = () => {
  return (
    <MainLayoutContext>
      <div className="App">
        <NecktieNavbar />
        <div className="container mx-auto">
          <Outlet />
        </div>
      </div>
    </MainLayoutContext>
  );
};

export default MainLayout;
