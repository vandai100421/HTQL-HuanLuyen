import { lazy } from "react";
import { SCHEDULESUPPER } from "routes/route.constant";
const SchedulesUpper = lazy(() => import("pages/SchedulesUpper"));

export default {
  path: SCHEDULESUPPER,
  element: SchedulesUpper,
};
