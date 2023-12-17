import { lazy } from "react";
import { STATISTIC_BY_DILIGENCE } from "routes/route.constant";
const StatisticByDiligence = lazy(() => import("pages/StatisticByDiligence"));

export default {
  path: STATISTIC_BY_DILIGENCE,
  element: StatisticByDiligence,
};
