import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const WebinarComment = EgretLoadable({
  loader: () => import("./WebinarComment")
});
const ViewComponent = withTranslation()(WebinarComment);

const WebinarCommentRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"webinar_comment_manager/webinar_comment",
    exact: true,
    component: ViewComponent
  }
];

export default WebinarCommentRoutes;
