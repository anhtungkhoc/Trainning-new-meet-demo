import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const WebinarCategory = EgretLoadable({
  loader: () => import("./WebinarCategory")
});
const ViewComponent = withTranslation()(WebinarCategory);

const WebinarCategoryRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"list/webinarCategory",
    exact: true,
    component: ViewComponent
  },
];

export default WebinarCategoryRoutes;
