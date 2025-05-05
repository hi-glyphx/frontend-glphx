import BasicReportCountCard from "@/views/Reports/Basic/ReportData/BasicReportCountCard";
import { Typography } from "@mui/material";
import TableHeader from "@/views/Reports/TableHeader";
import ExtractionReportV1 from "@/views/Reports/Basic/Extraction/ExtractionReportV1";
import Download_File from "@/components/modals/Download_File";
import CommonHeader from "@/components/Common/Header";
import { HandleOpen, handleClose } from "@/shared/config/types";
import { useState } from "react";
import { BASE_URL } from "@/utils/HTTP";
import { AppDispatch } from "@/Store/Store";
import { extractionsReportListDownload } from "@/Store/Reducer/ReportsSlice";
import { downloadURI } from "@/utils/Functions";
import { useDispatch, useSelector } from "react-redux";
import CountCard from "@/components/Common/CountCard";

const BasicReport = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen: HandleOpen = () => setOpen(true);
  const handleClose: handleClose = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const { ExtractionsCaseList } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );

  const handleDownload = () => {
    handleOpen();
  };

  const data = [
    {
      title: "Total Reports",
      count: ExtractionsCaseList?.meta?.total_reports,
    },
  ];

  return (
    <div className="flex flex-col gap-y-6">
      <Download_File
        open={open}
        handleClose={handleClose}
        dispatchFunction={() => {
          dispatch(extractionsReportListDownload()).then((res) => {
            if (res) {
              downloadURI(
                `${BASE_URL}/reports/downloads/case/extractions/`,
                "v1"
              );
              handleClose();
            }
          });
        }}
      />
      <CommonHeader title="Field Summary" handleDownload={handleDownload} />
      <div className="main-layout-section">
        <CountCard data={data} />
        <div className="mt-6 flex flex-col gap-y-4 ">
          <Typography
            variant="h5"
            color="text.secondary"
            textAlign="start"
            className="ms-10"
          >
            Report List
          </Typography>
        </div>
        <div className="report-table pt-4">
          <ExtractionReportV1 />
        </div>
      </div>
    </div>
  );
};

export default BasicReport;
