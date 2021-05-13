import { EgretLoadable } from "egret";
import ConstantList from "../../appConfig";
import { useTranslation, withTranslation, Trans } from 'react-i18next';
const Test = EgretLoadable({
  loader: () => import("./Test2")
});
const ViewComponent = withTranslation()(Test);

const TestRoutes = [
  {
    path:  ConstantList.ROOT_PATH+"Detail",
    exact: true,
    component: ViewComponent
  },
];

export default TestRoutes;