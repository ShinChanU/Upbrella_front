import { TRoute } from "@/types/commonTypes";
import RentalLocationPage from "@/components/pages/RentalLocation/RentalLocationPage";
import RentalOfficePage from "@/components/pages/rentalOffice/RentalOfficePage";
import InfoPage from "@/components/pages/Info/InfoPage";
import MypageRentPage from "@/components/pages/Mypage/MypageRentPage";
import MypageAccountPage from "@/components/pages/Mypage/MypageAccountPage";
import MypageInfoPage from "@/components/pages/Mypage/MypageInfoPage";
import TermsOfService from "@/components/pages/tos";
import PrivacyPolicy from "@/components/pages/pp";
import MypageContactPage from "@/components/pages/Mypage/MypageContactPage";

/**
 * Header, footer의 layout이 필요한 페이지
 * 라우트할 페이지의 path, component
 */
// TODO: route 개선
export const LAYOUT_ROUTES: TRoute[] = [
  {
    name: "대여소 위치 페이지",
    path: "/rentalLocation",
    component: RentalLocationPage,
  },
  {
    name: "협업지점 소개 페이지",
    path: "/rentalOffice",
    component: RentalOfficePage,
  },
  {
    name: "이용안내 페이지",
    path: "/information",
    component: InfoPage,
  },
  {
    name: "마이페이지_이용내역",
    path: "/members/mypage/rent",
    component: MypageRentPage,
  },
  {
    name: "마이페이지_계좌등록변경",
    path: "/members/mypage/account",
    component: MypageAccountPage,
  },
  {
    name: "마이페이지_개인정보조회",
    path: "/members/mypage/info",
    component: MypageInfoPage,
  },
  {
    name: "마이페이지_문의하기",
    path: "/members/mypage/contact",
    component: MypageContactPage,
  },
  {
    name: "이용약관 페이지",
    path: "/info/tos",
    component: TermsOfService,
  },
  {
    name: "개인정보처리방침 페이지",
    path: "/info/pp",
    component: PrivacyPolicy,
  },
];
