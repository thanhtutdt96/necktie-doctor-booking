import { Suspense } from "react";
import { RouterProvider } from "react-router";
import NecktieLoader from "components/common/NecktieLoader";
import router from "router";

const App = () => (
  <Suspense fallback={<NecktieLoader />}>
    <RouterProvider router={router} />
  </Suspense>
);

export default App;
