import {
  ClearCheckboxesData,
  GetCheckboxes,
} from "@/Store/Reducer/ExtractionSlice";
import { AppDispatch } from "@/Store/Store";
import Index from "@/views/Extraction/verify/checkboxes";
import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import CloseIcon from "@mui/icons-material/Close";

const CheckBoxIndex = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { checkboxesDetail } = useSelector(
    ({ ExtractionSlice }) => ExtractionSlice
  );

  const [seconds, setSeconds] = useState<any>();
  const [isZoom, setIsZoom] = useState(false);

  const [intigateApi, setintigateApi] = useState(false);
  useEffect(() => {
    if (intigateApi) {
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          dispatch(GetCheckboxes()).then((res) => {
            if (
              !res?.payload?.data ||
              Object.keys(res.payload.data).length === 0
            ) {
              setSeconds(20);
              setintigateApi(true);
            } else {
              setintigateApi(false);
            }
          });
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
    return () => dispatch(ClearCheckboxesData());
  }, [dispatch, seconds, intigateApi]);

  useEffect(() => {
    if (!intigateApi) {
      dispatch(GetCheckboxes()).then((res) => {
        if (!res?.payload?.data || Object.keys(res.payload.data).length === 0) {
          setintigateApi(true);
        } else {
          setintigateApi(false);
        }
      });
    }
  }, [dispatch]);

  var browserZoomLevel: any =
    typeof window !== "undefined" && Math.round(window.devicePixelRatio * 100);

  useEffect(() => {
    if (browserZoomLevel > 100) {
      // alert("Desired view will be at 100%");
      setIsZoom(true);
    } else {
      setIsZoom(false);
    }
  }, [browserZoomLevel]);

  return (
    <>
      {isZoom && (
        <div className="zoom-div">
          <div></div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <VerifiedOutlinedIcon style={{ fontSize: "1rem" }} />
            <p className="text-[10px]">
              For the best GlyphX experience, set your display to 100%
              resolution{" "}
            </p>{" "}
            <a
              href="https://support.microsoft.com/en-us/windows/view-display-settings-in-windows-37f0e05e-98a9-474c-317a-e85422daa8bb#WindowsVersion=Windows_11"
              target="_blank"
              style={{ color: "#ffffff" }}
            >
              <Typography
                textAlign="center"
                style={{
                  fontSize: "10px",
                  textDecoration: "underline",
                  cursor: "pointer",
                }}
                onClick={() => {}}
              >
                Configure Display
              </Typography>
            </a>
          </div>
          <div onClick={() => setIsZoom(false)}>
            <CloseIcon style={{ fontSize: "1rem", marginTop: "5px" }} />
          </div>
        </div>
      )}
      {!checkboxesDetail?.data ||
      Object.keys(checkboxesDetail?.data)?.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="flex flex-col gap-y-4">
            <Typography variant="h4" color="text.secondary" textAlign="center">
              Reloading Page in {!seconds ? "20" : seconds} Seconds . . .
            </Typography>
            <Typography variant="h1" color="text.secondary" textAlign="center">
              No more checkboxes to verify. Try after some time.
            </Typography>
          </div>
        </div>
      ) : (
        <Index setintigateApi={setintigateApi} />
      )}
    </>
  );
};

export default CheckBoxIndex;
