import { lazy } from "react";
import { STUDENTS } from "routes/route.constant";
const Students = lazy(() => import("pages/Students"));

export default {
  path: STUDENTS,
  element: Students,
};
