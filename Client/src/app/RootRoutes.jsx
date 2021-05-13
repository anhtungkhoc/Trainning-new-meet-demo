import React from "react";
import { Redirect } from "react-router-dom";
import homeRoutes from "./views/home/HomeRoutes";
import sessionRoutes from "./views/sessions/SessionRoutes";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import UserRoutes from "./views/User/UserRoutes";
import roleRoutes from "./views/Role/RoleRoutes";
import ConstantList from "./appConfig";
import MenuRoutes from "./views/Menus/MenuRoutes";
import pageLayoutRoutes from "./views/page-layouts/PageLayoutRoutees";
import webinarRoutes from "./views/Webinar/WebinarRoutes";
import RegistrationConfirmationRoutes from './views/RegistrationConfirmation/RegistrationConfirmationRoutes'

const redirectRoute = [
  {
    path: ConstantList.ROOT_PATH,
    exact: true,
    component: () => <Redirect to={ConstantList.HOME_PAGE} />//Luôn trỏ về HomePage được khai báo trong appConfig
  }
];

const errorRoute = [
  {
    component: () => <Redirect to={ConstantList.ROOT_PATH + "session/404"} />
  }
];

const routes = [
  ...redirectRoute,
  ...homeRoutes,
  ...sessionRoutes,
  ...dashboardRoutes,
  ...pageLayoutRoutes,
  ...UserRoutes,
  ...roleRoutes,
  ...MenuRoutes,
  ...webinarRoutes,
  ...RegistrationConfirmationRoutes,
  ...errorRoute
];

export default routes;
