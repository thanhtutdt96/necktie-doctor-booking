import { Outlet } from "react-router";
import NecktieNavbar from "components/common/NecktieNavbar";
const MainLayout = () => {
  return (
    <div className="App">
      <NecktieNavbar />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
