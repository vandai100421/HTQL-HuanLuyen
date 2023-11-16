import { lazy } from "react";
import { COMPANIES } from "routes/route.constant";
const Companies = lazy(() => import("pages/Companies"));

export default {
  path: COMPANIES,
  element: Companies,
};
