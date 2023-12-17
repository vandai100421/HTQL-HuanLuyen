import { lazy } from "react";
import { STATISTIC_BY_COMPANY } from "routes/route.constant";
const StatisticByCompany = lazy(() => import("pages/StatisticByCompany"));

export default {
  path: STATISTIC_BY_COMPANY,
  element: StatisticByCompany,
};
