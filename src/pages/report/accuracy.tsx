import { useState } from "react";
import { Typography } from "@mui/material";
import AccuracyTable from "@/views/Reports/Accuracy/AccuracyTable";
import AccuracyCountCard from "@/views/Reports/Accuracy/AccuracyCountCard";
import {
  classificationsreportsdownload,
  extractionsreportsdownload,
} from "@/Store/Reducer/ReportsSlice";
import { downloadURI } from "@/utils/Functions";
import { HandleOpen, handleClose } from "@/shared/config/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Store/Store";
import CommonHeader from "@/components/Common/Header";
import Download_File from "@/components/modals/Download_File";

export default function Production() {
  const [classification, setClassification] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen: HandleOpen = () => setOpen(true);
  const handleClose: handleClose = () => setOpen(false);
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);

  const dispatch = useDispatch<AppDispatch>();

  const dispatchFunction = () => {
    if (classification) {
      if (searchParams?.column) {
        dispatch(classificationsreportsdownload(searchParams?.column)).then(
          (res) => {
            downloadURI(res.payload.url, "v1");
            handleClose();
          }
        );
      } else {
        dispatch(classificationsreportsdownload("")).then((res) => {
          downloadURI(res.payload.url, "v1");
          handleClose();
        });
      }
    } else {
      if (searchParams?.column) {
        dispatch(extractionsreportsdownload(searchParams?.column)).then(
          (res) => {
            downloadURI(res.payload.url, "v1");
            handleClose();
          }
        );
      } else {
        dispatch(extractionsreportsdownload("")).then((res) => {
          downloadURI(res.payload.url, "v1");
          handleClose();
        });
      }
    }
  };

  const handleDownload = () => {
    handleOpen();
  };
  return (
    <div className="flex flex-col gap-y-4">
      <Download_File
        open={open}
        handleClose={handleClose}
        dispatchFunction={dispatchFunction}
        csv={true}
      />
      <CommonHeader title="Error Analysis" handleDownload={handleDownload} />
      <div className="main-layout-section">
        <div className="flex flex-col gap-y-4">
          <AccuracyCountCard classification={classification} />
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-row  items-center gap-x-6 ml-10">
              <Typography
                className={`cursor-pointer text-lg font-bold leading-6 ${
                  !classification ? "text-gradient" : ""
                }`}
                color="text.secondary.lite"
                onClick={() => setClassification(false)}
              >
                Extraction Report
              </Typography>
              <Typography
                color="text.secondary.lite"
                className={`cursor-pointer text-lg font-bold leading-6 ${
                  classification ? "text-gradient" : ""
                }`}
                onClick={() => setClassification(true)}
              >
                Classification Report
              </Typography>
            </div>
            <AccuracyTable classification={classification} />
          </div>
        </div>
      </div>
    </div>
  );
}
