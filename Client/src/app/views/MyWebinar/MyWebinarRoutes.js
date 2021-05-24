import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const MyWebinar = EgretLoadable({
  loader: () => import("./MyWebinar")
});
const ViewComponent = withTranslation()(MyWebinar);

const UserWebinarRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"my-webinar",
    exact: true,
    component: ViewComponent
  }
];

export default UserWebinarRoutes;