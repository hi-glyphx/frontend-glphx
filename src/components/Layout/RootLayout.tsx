import { useDispatch, useSelector } from "react-redux";
import AuthLayout from "./AuthLayout";
import MainLayout from "./MainLayout";
import { useEffect } from "react";
import { Classify } from '../.././Store/Reducer/ClassificationSlice';
import { GetClassificationBatches } from "@/Store/Reducer/ClassificationSlice";
import { AppDispatch } from "@/Store/Store";

const RootLayout = ({ children, router }) => {
  const isError = router.route.includes("/404");
  const path = router.asPath;
  const { token } = useSelector(({ AuthSlice }) => AuthSlice);

  const dispatch = useDispatch<AppDispatch>();

  const setCookie = (sessionKey, maxAge) => {
    const now = new Date();
    now.setTime(now.getTime() + maxAge * 1000); // Convert maxAge to milliseconds

    const expires = `expires=${now.toUTCString()}`;
    document.cookie = `sessionid=${sessionKey}; ${expires}; Max-Age=${maxAge}; Path=/;`;
  };
  // useEffect(() => {
  //   if (typeof window !== "undefined") {
  //     if (!token) {
  //       if (!path.startsWith("/auth")) {
  //         // Redirect to the signin page if there's no token
  //         router.push("/auth/signin");
  //       }
  //     } else if (path === "/") {
  //       // Redirect to the upload page if there's a token and the path is "/"
  //       router.push("/upload");
  //     } else {
  //       if (path.startsWith("/auth")) {
  //         router.push("/upload");
  //       }
  //     }
  //   }

  // }, [path, token]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!token) {
        if (!path.startsWith("/auth")) {
          // Redirect to the signin page if there's no token
          router.push("/auth/signin");
        }
        
      } else if (path === "/") {
        // Redirect to the upload page if there's a token and the path is "/"
        router.push("/upload");
        dispatch(GetClassificationBatches())
      } else {
        if (path.startsWith("/auth")) {
          router.push("/upload");
          dispatch(GetClassificationBatches())
        }
      }
    }

    // Add event listeners for key press and mouse click to update the cookie expiration time
    const updateCookieExpiration = () => {
      if (token) {
        setCookie(token, 7200);
      }
      // Update cookie to expire in 2 hours on each event
    };
    document.addEventListener("keypress", updateCookieExpiration);
    document.addEventListener("click", updateCookieExpiration);

    // Cleanup the event listeners on component unmount
    return () => {
      document.removeEventListener("keypress", updateCookieExpiration);
      document.removeEventListener("click", updateCookieExpiration);
    };
  }, [path, router, token, dispatch]);

  
  return (
    <>
      {isError ? (
        <div className="h-[100vh] flex justify-center items-center">
          {children}
        </div>
      ) : router.pathname.startsWith("/auth") ? (
        <AuthLayout>{children}</AuthLayout>
      ) : (
        <MainLayout>{children}</MainLayout>
      )}
    </>
  );
};

export default RootLayout;
