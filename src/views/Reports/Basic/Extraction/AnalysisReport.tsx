import { ValidationReportList } from "@/Store/Reducer/ReportsSlice";
import { Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../../TableHeader";
import { TableColumn } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import dynamic from "next/dynamic";
import { useEffect } from "react";
const Table = dynamic(() => import("@/components/tables/Table"), {
  ssr: false,
});
const AnalysisReport = ({ extractionDetailParams }: any) => {
  const { validationReportList } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);

  const columns: TableColumn[] = [
    {
      Header: "Sr No.",
      accessor: "srNo",
    },
    {
      Header: "Document 1",
      accessor: "document_name_1",
    },
    {
      Header: "Field 1",
      accessor: "field_name_1",
    },
    {
      Header: "Value1",
      accessor: "field_value_1",
    },
    {
      Header: "Document 2",
      accessor: "document_name_2",
    },
    {
      Header: "Field 2",
      accessor: "field_name_2",
    },
    {
      Header: "Value2",
      accessor: "field_value_2",
    },
    {
      Header: "Validation",
      accessor: "validation_rule",
    },
    {
      Header: "Result ",
      accessor: "validation_result",
      Cell: (column) => {
        return (
          <Typography
            style={{ color: column.value ? "#47D8A4" : "#FF5F5F" }}
            variant="body2"
          >
            {column.value ? "Passed" : "Failed"}
          </Typography>
        );
      },
    },
  ];

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
      dispatch(ValidationReportList(`${extractionDetailParams}?${combinedParams}`));
    }
  }, [searchParams]);
  return (
    <div className="analysis-report-table flex flex-col gap-y-4">
      <TableHeader
        tableHeader={[
          {
            Header: "Result ",
            accessor: "validation_result",
          },
          {
            Header: "Document 1",
            accessor: "document_name_1",
          },
          {
            Header: "Field 1",
            accessor: "field_name_1",
          },
          {
            Header: "Value1",
            accessor: "field_value_1",
          },
          {
            Header: "Document 2",
            accessor: "document_name_2",
          },
        ]}
       
      />

      {extractionDetailParams && (
        <Table
          columns={columns}
          data={validationReportList && validationReportList?.data}
          pagination={true}
          isCheckbox={true}
          isStatus={true}
          dataPage={validationReportList?.meta}
          dispatchFunction={(e: number) =>
            ValidationReportList(`${extractionDetailParams}${e}`)
          }
        />
      )}
    </div>
  );
};

export default AnalysisReport;
