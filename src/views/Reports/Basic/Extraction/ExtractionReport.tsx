import React, { useEffect } from "react";
import { TableColumn } from "@/shared/config/types";
import { ExtractionsReports } from "@/Store/Reducer/ReportsSlice";
import { useDispatch, useSelector } from "react-redux";
import CtxProvider from "@/components/Common/Context";
import { AppDispatch } from "@/Store/Store";
import dynamic from "next/dynamic";
import { Typography } from "@mui/material";
// const ReportDataTableHeader = dynamic(
//   () => import("../ReportData/ReportDataTableHeader"),
//   {
//     ssr: false,
//   }
// );

const ExtractionTable = dynamic(() => import("./ExtractionTable"), {
  ssr: false,
});

const ExtractionReport = ({ extractionDetailParams }: any) => {
  const columns: TableColumn[] = [
    {
      Header: "Title",
      accessor: "field_name",
    },
    {
      Header: "Page",
      accessor: "page_index",
      Cell: (column) => {
        return (
          <Typography
         
            variant="body2"
          >
            {column.value + 1}
          </Typography>
        );
      },
    },
    {
      Header: "Data",
      accessor: "verified_value",
    },
  ];
  const { extractionsReports } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const params: any = new URLSearchParams(searchParams);
    let combinedParams = "";
    for (const [key, value] of params) {
      if (value != "") {
        combinedParams += `&${value.slice(1)}`;
      } else {
        combinedParams += `${value.slice(1)}`;
      }
    }

    combinedParams = combinedParams.slice(1);
    if (combinedParams) {
      dispatch(
        ExtractionsReports(`${extractionDetailParams}?${combinedParams}`)
      );
    }

  }, [searchParams]);

  return (
    <div>
      <CtxProvider>
        <div className="analysis-report-table flex flex-col gap-y-4 mb-5">
          {extractionsReports?.data && extractionDetailParams && (
            <ExtractionTable
              columns={columns}
              data={extractionsReports?.data}
              pagination={true}
              isCheckbox={false}
              dataPage={extractionsReports?.meta}
              dispatchFunction={(e: string) =>
                ExtractionsReports(`${extractionDetailParams}${e}`)
              }
            />
          )}
        </div>
      </CtxProvider>
    </div>
  );
};

export default ExtractionReport;
