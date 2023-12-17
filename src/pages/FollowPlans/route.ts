import { lazy } from "react";
import { FOLLOWPLANS } from "routes/route.constant";
const FollowPlans = lazy(() => import("pages/FollowPlans"));

export default {
  path: FOLLOWPLANS,
  element: FollowPlans,
};
