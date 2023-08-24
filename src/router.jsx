import { createBrowserRouter } from "react-router-dom";

import AdminPanel from "./pages/admin-panel";
import PlatformPanel from "./pages/platform-panel";
import Home from './pages/home';

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <AdminPanel />
  },
  {
    path: "/platform",
    element: <PlatformPanel />
  },
  {
    path: "/",
    element: <Home />
  },
]);

export default router;