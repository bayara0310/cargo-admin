
// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboardAdmin";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Request from "layouts/request";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import ApproveCargo from "layouts/approveCargo";

const routes = [
  {
    type: "collapse",
    name: "Нүүр",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Карго хүсэлтүүд",
    key: "request",
    route: "/request",
    icon: <Shop size="12px" />,
    component: <Request />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Каргонууд",
    key: "approved",
    route: "/approved",
    icon: <Shop size="12px" />,
    component: <ApproveCargo />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <SpaceShip size="12px" />,
    component: <SignUp />,
    noCollapse: true,
  },
];

export default routes;
