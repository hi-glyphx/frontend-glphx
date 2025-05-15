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

// Mock data for demo mode
const mockCheckboxesData = {
  data: {
    document_id: "DEMO-12345",
    document_type: "Form",
    document_name: "Sample Form.pdf",
    document_status: "pending",
    checkbox_groups: [
      {
        group_id: "group1",
        group_name: "Options Group A",
        checkboxes: [
          { id: "cb1", label: "Option 1", isChecked: true, confidence: 0.92 },
          { id: "cb2", label: "Option 2", isChecked: false, confidence: 0.88 },
          { id: "cb3", label: "Option 3", isChecked: false, confidence: 0.75 }
        ]
      },
      {
        group_id: "group2",
        group_name: "Options Group B",
        checkboxes: [
          { id: "cb4", label: "Yes", isChecked: true, confidence: 0.95 },
          { id: "cb5", label: "No", isChecked: false, confidence: 0.89 }
        ]
      }
    ],
    image_url: "https://via.placeholder.com/800x1000"
  }
};

const CheckBoxIndex = ({ isDemo = false }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { checkboxesDetail } = useSelector(
    ({ ExtractionSlice }) => ExtractionSlice
  );

  const [seconds, setSeconds] = useState<any>();
  const [isZoom, setIsZoom] = useState(false);
  const [intigateApi, setintigateApi] = useState(false);
  
  useEffect(() => {
    if (intigateApi && !isDemo) {
      const intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (isDemo) {
            // In demo mode, just set mock data
            dispatch({
              type: "extraction/getCheckboxes/fulfilled",
              payload: mockCheckboxesData
            });
            setintigateApi(false);
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
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
    
    // Cleanup function
    return () => {
      if (!isDemo) {
        dispatch(ClearCheckboxesData());
      }
    };
  }, [dispatch, seconds, intigateApi, isDemo]);

  useEffect(() => {
    if (!intigateApi) {
      if (isDemo) {
        // In demo mode, dispatch mock data instead of API call
        dispatch({
          type: "extraction/getCheckboxes/fulfilled",
          payload: mockCheckboxesData
        });
      } else {
        dispatch(GetCheckboxes()).then((res) => {
          if (!res?.payload?.data || Object.keys(res.payload.data).length === 0) {
            setintigateApi(true);
          } else {
            setintigateApi(false);
          }
        });
      }
    }
  }, [dispatch, intigateApi, isDemo]);

  var browserZoomLevel: any =
    typeof window !== "undefined" && Math.round(window.devicePixelRatio * 100);

  useEffect(() => {
    if (browserZoomLevel > 100) {
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
      
      <Index setintigateApi={setintigateApi} isDemo={isDemo} />
    </>
  );
};

export default CheckBoxIndex;
