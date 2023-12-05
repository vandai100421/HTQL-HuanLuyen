import { lazy } from "react";
import { SCHEDULES } from "routes/route.constant";
const Schedules = lazy(() => import("pages/Schedules"));

export default {
  path: SCHEDULES,
  element: Schedules,
};
