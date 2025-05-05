import { setReportVersionDropdown } from "@/Store/Reducer/ReportsSlice";
import ClassificationReportTable from "@/views/Reports/Basic/Classification/ClassificationReportTable";
import AnalysisReport from "@/views/Reports/Basic/Extraction/AnalysisReport";
import ExtractionReport from "@/views/Reports/Basic/Extraction/ExtractionReport";
import ExtractionReportV1 from "@/views/Reports/Basic/Extraction/ExtractionReportV1";
import ExtractionReportV3 from "@/views/Reports/Basic/Extraction/ExtractionReportV3";
import ReportCaseDetail from "@/views/Reports/Basic/ReportData/ReportCaseDetails";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Reportdetail = () => {
  const router = useRouter();
  const { id, classify, extraction, analysis, form_id } = router.query;
  const { reportVersionDropdown } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );
  const dispatch = useDispatch();

  const [extractionDetailParams, setExtractionDetailParams] = useState<any>("");

  useEffect(() => {
    if (id) {
      setExtractionDetailParams(`?case_id=${id}&`);
    } else {
      setExtractionDetailParams("");
    }
    if (form_id) {
      setExtractionDetailParams(`?form_id=${form_id}&`);
    }
    if (extraction) {
      dispatch(setReportVersionDropdown(4));
    } else if (classify) {
      dispatch(setReportVersionDropdown(0));
    } else if (analysis) {
      dispatch(setReportVersionDropdown(5));
    }
  }, [id, classify, extraction, form_id]);
  return (
    <div className="flex flex-col gap-y-4">
      {(() => {
        switch (reportVersionDropdown) {
          case 0:
            return (
              <ClassificationReportTable
                extractionDetailParams={extractionDetailParams}
              />
            );

          case 1:
            return <ExtractionReportV1 />;

          case 2:
            return <ReportCaseDetail />;

          case 3:
            return <ExtractionReportV3 />;

          case 4:
            return (
              <ExtractionReport
              extractionDetailParams={extractionDetailParams}
            />
            );

          case 5:
            return (
              <AnalysisReport extractionDetailParams={extractionDetailParams} />
            );

          default:
            return null; // or some default component or message
        }
      })()}
    </div>
  );
};

export default Reportdetail;
