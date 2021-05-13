import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Webinar = EgretLoadable({
  loader: () => import("./Webinar")
});
const ViewComponent = withTranslation()(Webinar);

const WebinarRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"webinar",
    exact: true,
    component: ViewComponent
  },
];

export default WebinarRoutes;
