import { lazy } from "react";
import { SCHEDULESLOWER } from "routes/route.constant";
const SchedulesLower = lazy(() => import("pages/SchedulesLower"));

export default {
  path: SCHEDULESLOWER,
  element: SchedulesLower,
};
