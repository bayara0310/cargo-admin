
// Soft UI Dashboard React layouts
import Dashboard from "layouts/Cargo-Admin/dashboard";
import Profile from "layouts/Cargo-Admin/profile";
import SignIn from "layouts/authentication/sign-in";

// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Orders from "layouts/Cargo-Admin/orders";

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
    name: "Захиалгууд",
    key: "orders",
    route: "/orders",
    icon: <Office size="12px" />,
    component: <Orders />,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Миний хуудас",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
    noCollapse: true,
  },
  {
    // type: "collapses",
    name: "Нэвтрэх хуудас",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <SignIn />,
    noCollapse: true,
  },
];

export default routes;
