import { useState, ReactNode, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { useRouter } from "next/router";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Store/Store";
import { GetClassificationBatches } from "@/Store/Reducer/ClassificationSlice";
import { CommonSlice, toggleSidebarOpen } from "@/Store/Reducer/CommonSlice";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isSidebarOpen } = useSelector(({ CommonSlice }) => CommonSlice);
  const dispatch = useDispatch<AppDispatch>();

  const toggleDrawer = () => {
    dispatch(toggleSidebarOpen());
  };

  const router = useRouter();
  const { asPath } = router;
  const url =
    typeof window !== "undefined" ? new URL(window.location.href) : null;
  const endPath: any = url?.pathname.split("/") || asPath.split("/");

  const commonHeaderPaths = [
    "verification",
    "checkboxes",
    "signature",
    "reportdata",
    "production",
    "tickets",
    "v2",
    "verify_edit",
    "accuracy",
  ];

  useEffect(() => {
    if (
      url?.pathname === "/classification/verify/verify_edit/" ||
      url?.pathname === "/extraction/textfield/verify/verification/" ||
      url?.pathname === "/extraction/checkboxes/verify/" ||
      url?.pathname === "/extraction/signature/verify/" ||
      url?.pathname === "/extraction/table/verify/"
    ) {
      toggleDrawer();
    }
  }, [url?.pathname]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === "b") {
        toggleDrawer();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Glyphx</title>
      </Head>
      <div
        className={`flex flex-row h-screen duration-300 ${
          !isSidebarOpen && "pr-5"
        }`}
      >
        <Sidebar isOpened={isSidebarOpen} toggleDrawer={toggleDrawer} />
        <div className="parent-main-layout-section">
          {!commonHeaderPaths.includes(endPath[endPath.length - 2]) && (
            <Header />
          )}

          <div className="main-layout-container">
            <div
              className={
                !commonHeaderPaths.includes(endPath[endPath.length - 2])
                  ? "main-layout-section"
                  : ""
              }
              style={{ flexGrow: 1 }}
            >
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainLayout;
