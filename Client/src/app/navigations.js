import ConstantList from "./appConfig";
export const navigations = [
  // {
  //   name: "Dashboard.dashboard",
  //   icon: "dashboard",
  //   path: ConstantList.ROOT_PATH + "dashboard/analytics",
  //   isVisible:true,
  // },
  {
    name: "webinar.list",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "webinar",
    isVisible: true,
  },
  {
    name: "webinar.myList",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "my-webinar",
    isVisible: true,
  },
  {
    name: "Zoom Meeting",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "zoom-meeting",
    isVisible: true,
  },
  {
    name: "Dashboard.manage",
    isVisible: true,
    icon: "engineering",
    children: [
      {
        name: "manage.user",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "user_manager/user",
        icon: "keyboard_arrow_right"
      },
      {
        name: "manage.menu",
        isVisible: true,
        path: ConstantList.ROOT_PATH + "list/menu",
        icon: "keyboard_arrow_right"
      },
      {
        name: "manage.webinar_comment",
        isVisible:true,
        path: ConstantList.ROOT_PATH + "webinar_comment_manager/webinar_comment",
        icon: "keyboard_arrow_right",
        name: "manage.categories",
        isVisible: true,
        children: [
          {
            name: "Danh mục",
            isVisible: true,
            path: ConstantList.ROOT_PATH + "list/category",
            icon: "keyboard_arrow_right"
          },
          {
            name: "Webinar Category",
            isVisible: true,
            path: ConstantList.ROOT_PATH + "list/webinarCategory",
            icon: "keyboard_arrow_right"
          }
        ]
      }
    ]
  },
  {
    name: "TEST",
    icon: "dashboard",
    path: ConstantList.ROOT_PATH + "Detail",
    isVisible: true,
  },
];
