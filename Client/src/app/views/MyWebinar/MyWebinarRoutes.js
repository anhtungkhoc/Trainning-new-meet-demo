import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const MyWebinar = EgretLoadable({
  loader: () => import("./MyWebinar")
});
const ViewComponent = withTranslation()(MyWebinar);

const UserRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"myWebinar",
    exact: true,
    component: ViewComponent
  }
];

export default UserRoutes;
