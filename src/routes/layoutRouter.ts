import { TRoute } from "@/types/commonTypes";
import HomeMainPage from "@/components/pages/home/HomeMainPage";

/**
 * Header, footer의 layout이 필요한 페이지
 * 라우트할 페이지의 path, component
 */
export const LAYOUT_ROUTES: TRoute[] = [
  {
    name: "메인 페이지",
    path: "/",
    component: HomeMainPage,
  },
];
