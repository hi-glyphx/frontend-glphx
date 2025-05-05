import React, { createContext, useEffect, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import Lottie, { Options } from "react-lottie"; // Make sure you have the appropriate type definitions for Lottie
import animationData from "../../assets/json/loader.json";
import { AlertEnum } from "@/utils/Enums";
import { setMessage } from "@/Store/Reducer/LayoutsSice";

interface LayoutState {
  isLoading: boolean;
  message?: {
    type: string;
    show: boolean;
    text: string;
  };
}

interface LayoutContextType extends LayoutState {}

const LayoutContext = createContext<LayoutContextType>({
  isLoading: false,
  message: { type: "", show: false, text: "" }, // You can provide default values here
});

interface LayoutProviderProps {
  children: ReactNode;
}

function LayoutProvider({ children }: LayoutProviderProps) {
  return (
    <LayoutContext.Provider value={{ isLoading: true }}>
      <Loader />
      <SnackBar />
      {children}
    </LayoutContext.Provider>
  );
}

export function Loader() {
  const { isLoading } = useSelector((state: any) => state.LayoutSlice);
  const defaultOptions: Options = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    renderer: "svg",
  };
  return isLoading ? (
    <div className="loader-container">
      <div className="loader-item">
        <Lottie options={defaultOptions} />
      </div>
    </div>
  ) : (
    <></>
  );
}

function SnackBar() {
  const { type, show, text } = useSelector(
    (state: any) => state.LayoutSlice.message
  );
  const dispatch = useDispatch();
  useEffect(() => {
    show &&
      setTimeout(() => {
        dispatch(setMessage({ type: "", text: "", show: false }));
      }, 3000);
  }, [show, dispatch]);

  switch (type) {
    case AlertEnum.Success:
      return (
        <div
          className={`alert alert-success ${
            show ? "alert-shown" : "alert-hidden"
          }`}
        >
          {text}
        </div>
      );
    // case AlertEnum.Error:
    //   return (
    //     <div
    //       className={`alert alert-danger ${
    //         show ? "alert-shown" : "alert-hidden"
    //       }`}
    //     >
    //       {text}
    //     </div>
    //   );
    case AlertEnum.Warning:
      return (
        <div
          className={`alert alert-warning ${
            show ? "alert-shown" : "alert-hidden"
          }`}
        >
          {text}
        </div>
      );
    default:
      return (
        <div
          className={`alert alert-primary ${
            show ? "alert-shown" : "alert-hidden"
          }`}
        >
          {/* {text} */}
        </div>
      );
  }
}

export default LayoutProvider;
