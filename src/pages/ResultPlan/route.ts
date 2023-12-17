import { lazy } from "react";
import { RESULT_PLAN } from "routes/route.constant";
const ResultPlan = lazy(() => import("pages/ResultPlan"));

export default {
  path: RESULT_PLAN,
  element: ResultPlan,
};
