import { lazy } from "react";
import { EQUIPMENTS } from "routes/route.constant";
const Equipments = lazy(() => import("pages/Equipments"));

export default {
  path: EQUIPMENTS,
  element: Equipments,
};
