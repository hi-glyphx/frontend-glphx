import MenuItemsList from "../MenuItemsList";
import { MENU_ITEMS } from "@/shared/config/menu-items";
// import Sidebarlogo from "../../assets/svg/logos/InfosysLogo.png";
import GlyphxLogo from "../../assets/svg/logos/sidebar-logo.svg";

import Image from "next/image";
import rightArrow from "../../assets/svg/logos/right-arrow-close.svg";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { LogOut, removeSession, removeToken } from "@/Store/Reducer/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Store/Store";

type SidebarProps = {
  isOpened: boolean;
  toggleDrawer: () => void;
};
export default function Sidebar({ isOpened, toggleDrawer }: SidebarProps) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { session } = useSelector(({ AuthSlice }) => AuthSlice);

  return (
    <>
      <div
        className={`${!isOpened ? "close-model" : "open-model"} sidebar-main`}
      >
        <div className="flex justify-center  sidebar-logo-section    ">
          <Image
            src={GlyphxLogo}
            height={40}
            alt="Follow us on Twitter"
            placeholder="blur"
            blurDataURL={"../../assets/svg/logos/right-arrow-close.svg"}
            className="w-1/2"
          />
        </div>
        <MenuItemsList options={MENU_ITEMS} />
        <Button
          color="primary"
          size="small"
          onClick={() => {
            dispatch(LogOut()).then((res) => {
              if (!session.isRememberMe) {
                router.push("/auth/signin");
                dispatch(removeSession());
                dispatch(removeToken());
              } else {
                dispatch(removeToken());
                router.push("/auth/signin");
              }
            });
          }}
          className="h-8 m-4"
        >
          {" "}
          Logout
        </Button>
      </div>
      <div className="sidebar-main-sec">
        <button
          className={`${
            isOpened ? "sidebar-close-button" : "sidebar-close-time-button"
          }`}
          onClick={toggleDrawer}
        >
          <Image
            src={rightArrow}
            height={20}
            width={20}
            alt=""
            style={{ transform: !isOpened ? "rotate(180deg)" : "" }}
          />
        </button>
      </div>
    </>
  );
}
