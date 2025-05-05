import {
  DownloadProcessing,
  ProcessingReportList,
} from "@/Store/Reducer/ReportsSlice";
import { AppDispatch } from "@/Store/Store";
import CommonHeader from "@/components/Common/Header";
import Download_File from "@/components/modals/Download_File";
import { HandleOpen, handleClose } from "@/shared/config/types";
import { downloadURI } from "@/utils/Functions";
import ProductionCountCard from "@/views/Reports/Production/ProductionCountCard";
import ProductionTable from "@/views/Reports/Production/ProductionTable";
import TableHeader from "@/views/Reports/TableHeader";
import { Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Production() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen: HandleOpen = () => setOpen(true);
  const handleClose: handleClose = () => setOpen(false);

  const dispatch = useDispatch<AppDispatch>();

  const dispatchFunction = () => {
    dispatch(DownloadProcessing()).then((res) => {
      downloadURI(res.payload.url, "v1");

      handleClose();
    });
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
      <CommonHeader title="Output Report" handleDownload={handleDownload} />
      <div className="main-layout-section">
        <ProductionCountCard />
        <div className="flex flex-col gap-y-4">
          <Typography className="mt-4	ml-10" variant="h5" color="text.secondary">
            Report List
          </Typography>
          <ProductionTable />
        </div>
      </div>
    </div>
  );
}
