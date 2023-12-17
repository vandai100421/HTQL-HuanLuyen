import { lazy } from "react";
import { SCHEDULESYOURSELF } from "routes/route.constant";
const Schedules = lazy(() => import("pages/Schedules"));

export default {
  path: SCHEDULESYOURSELF,
  element: Schedules,
};
