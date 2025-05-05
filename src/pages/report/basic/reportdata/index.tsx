import React, { useState } from "react";
import ClassificationReportTable from "@/views/Reports/Basic/Classification/ClassificationReportTable";
import ExtractionReport from "@/views/Reports/Basic/Extraction/ExtractionReport";
import ReportCaseDetail from "@/views/Reports/Basic/ReportData/ReportCaseDetails";
import ReportDataHeader from "@/views/Reports/Basic/ReportData/ReportDataHeader";
import CommonHeader from "@/components/Common/Header";
import Download_File from "@/components/modals/Download_File";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import ExtractionReportV1 from "@/views/Reports/Basic/Extraction/ExtractionReportV1";
import ExtractionReportV3 from "@/views/Reports/Basic/Extraction/ExtractionReportV3";
import AnalysisReport from "@/views/Reports/Basic/Extraction/AnalysisReport";
import { HandleOpen, handleClose } from "@/shared/config/types";
import { setReportVersionDropdown } from "@/Store/Reducer/ReportsSlice";
import { useDispatch, useSelector } from "react-redux";

const ReportData = () => {
  const [detailPage, toggleDetailPage] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen: HandleOpen = () => setOpen(true);
  const handleClose: handleClose = () => setOpen(false);
  const dispatch = useDispatch();
  const handleDownload = () => {
    handleOpen();
  };
  const { reportVersionDropdown } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );

  return (
    <>
      <Download_File open={open} handleClose={handleClose} />
      <CommonHeader handleDownload={handleDownload} />

      <div className="m-[2.5rem] flex flex-col gap-y-4">
        <ReportDataHeader toggleDetailPage={toggleDetailPage}>
          <div className="my-2 flex justify-end">
            <FormControl sx={{ minWidth: 200 }}>
              <Select
                variant="outlined"
                value={reportVersionDropdown}
                onChange={(e: SelectChangeEvent<string | number>) => {
                  let value = e.target.value;

                  dispatch(setReportVersionDropdown(value));
                  // toggleReportChild(value);
                  // if (value == 2 || value == 3 || value == 4) {
                  //   toggleDetailPage(true);
                  // } else {
                  //   toggleDetailPage(false);
                  // }
                }}
                className="h-12 "
              >
                <MenuItem value={0}>Classificaiton Report</MenuItem>
                <MenuItem value={1}>Extraction Report V1</MenuItem>
                <MenuItem value={2}>Extraction Report V2</MenuItem>
                <MenuItem value={3}>Extraction Report V3</MenuItem>
                <MenuItem value={4}>Extraction Report V5</MenuItem>
                <MenuItem value={5}>Analysis Report</MenuItem>
              </Select>
            </FormControl>
          </div>
        </ReportDataHeader>

        {(() => {
          switch (reportVersionDropdown) {
            case 0:
              return <ClassificationReportTable />;

            case 1:
              return <ExtractionReportV1 />;

            case 2:
              return <ReportCaseDetail />;

            case 3:
              return <ExtractionReportV3 />;

            case 4:
              return <ExtractionReport />;

            case 5:
              return <AnalysisReport />;

            default:
              return null; // or some default component or message
          }
        })()}

      </div>
    </>
  );
};

export default ReportData;
