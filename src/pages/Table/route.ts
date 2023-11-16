import { lazy } from "react";
import { TABLE } from "routes/route.constant";
const Table = lazy(() => import("pages/Table"));

export default {
  path: TABLE,
  element: Table,
};
