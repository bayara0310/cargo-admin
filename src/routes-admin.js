
// Soft UI Dashboard React layouts
import Dashboard from "layouts/dashboardAdmin";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import Request from "layouts/request";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import ApproveCargo from "layouts/approveCargo";
import Activate from "layouts/authentication/activate";

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
    name: "Профайл",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    // type: "collapse",
    name: "Нэвтрэх хуудас",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
  {
    name: "Нэвтрэх хуудас",
    key: "activate",
    path: "/authentication/activate/:id",
    route: "/authentication/activate/:id",
    icon: <Document size="12px" />,
    component: <Activate />,
    noCollapse: true,
  },
];

export default routes;
