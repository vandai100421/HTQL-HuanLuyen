import { lazy } from "react";
import { CUSTOMERS } from "routes/route.constant";
const Customers = lazy(() => import("pages/Customers"));

export default {
  path: CUSTOMERS,
  element: Customers,
};
