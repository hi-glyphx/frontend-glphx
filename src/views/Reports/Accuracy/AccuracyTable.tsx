import { Typography } from "@mui/material";
import Table from "@/components/tables/Table";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "../TableHeader";
import {
  ClassificationsReports,
  ExtractionsReports,
} from "@/Store/Reducer/ReportsSlice";
import moment from "moment";
import { DateFiler, TableColumn } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import { setParamsData } from "@/Store/Reducer/CommonSlice";
import { useEffect } from "react";

type PageProps = {
  classification: boolean;
};

const AccuracyTable = ({ classification }: PageProps) => {
  const { classificationsReports, extractionsReports } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);

  const columns: TableColumn[] =
    classification === true
      ? [
          {
            Header: "Case Number ",
            accessor: "case_num",
            sort: "true",
          },
          {
            Header: "Page",
            accessor: "page_index",
            sort: true,
          },
          {
            Header: "Predicted Class Name",
            accessor: "scanned_value",
          },
          {
            Header: "Confidence",
            accessor: "confidence",
            sort: true,
          },
          {
            Header: "Do Classification",
            accessor: "do_classification",
            Cell: (column) => {
              let data = column.value;
              let color = "#7E75A3";

              switch (data) {
                case true:
                  color = "#47D8A4";
                  break;
                case false:
                  color = "#FF5F5F";
                  break;

                default:
                  break;
              }
              return (
                <Typography style={{ color: color }} variant="body2">
                  {data ? "True" : "False"}
                </Typography>
              );
            },
          },
          {
            Header: "Edited",
            accessor: "edited",
            Cell: (column) => {
              let data = column.value;
              let color = "#7E75A3";

              switch (data) {
                case true:
                  color = "#47D8A4";
                  break;
                case false:
                  color = "#FF5F5F";
                  break;

                default:
                  break;
              }
              return (
                <Typography style={{ color: color }} variant="body2">
                  {data ? "True" : "False"}
                </Typography>
              );
            },
          },
          {
            Header: "Final Class Name",
            accessor: "verified_value",
          },
          {
            Header: "True Data - QC",
            accessor: "qced_value",
          },
          {
            Header: "Accurate",
            accessor: "is_accurate",
            Cell: (column) => {
              let data = column.value;
              let color = "#7E75A3";

              switch (data) {
                case true:
                  color = "#47D8A4";
                  break;
                case false:
                  color = "#FF5F5F";
                  break;

                default:
                  break;
              }
              return (
                <Typography style={{ color: color }} variant="body2">
                  {data ? "Yes" : "No"}
                </Typography>
              );
            },
          },
        ]
      : [
          {
            Header: "Case Number ",
            accessor: "case_num",
          },
          {
            Header: "Case ID",
            accessor: "case_id",
            sort: true,
          },
          {
            Header: "Document Name",
            accessor: "document_name",
            sort: true,
          },
          {
            Header: "Field Name",
            accessor: "field_name",
          },
          {
            Header: "Predicted Field Value",
            accessor: "scanned_value",
          },
          {
            Header: "Glyphx Final Result",
            accessor: "verified_value",
          },
          {
            Header: "Verification Flag",
            accessor: "do_verification",
            Cell: (column) => {
              let data = column.value;
              let color = "#7E75A3";

              switch (data) {
                case true:
                  color = "#47D8A4";
                  break;
                case false:
                  color = "#FF5F5F";
                  break;

                default:
                  break;
              }
              return (
                <Typography style={{ color: color }} variant="body2">
                  {data ? "Yes" : "No"}
                </Typography>
              );
            },
          },
          {
            Header: "Edited",
            accessor: "edited",
            Cell: (column) => {
              let data = column.value;
              let color = "#7E75A3";

              switch (data) {
                case true:
                  color = "#47D8A4";
                  break;
                case false:
                  color = "#FF5F5F";
                  break;

                default:
                  break;
              }
              return (
                <Typography style={{ color: color }} variant="body2">
                  {data ? "True" : "False"}
                </Typography>
              );
            },
          },
          {
            Header: "True Data - QC",
            accessor: "qced_value",
          },
          {
            Header: "Accurate",
            accessor: "is_accurate",
            Cell: (column) => {
              let data = column.value;
              let color = "#7E75A3";

              switch (data) {
                case true:
                  color = "#47D8A4";
                  break;
                case false:
                  color = "#FF5F5F";
                  break;

                default:
                  break;
              }
              return (
                <Typography style={{ color: color }} variant="body2">
                  {data ? "True" : "False"}
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
    if (combinedParams && classification == true) {
      dispatch(ClassificationsReports(`?${combinedParams}`));
    } else {
      if (combinedParams) {
        dispatch(ExtractionsReports(`?${combinedParams}`));
      }
    }
  }, [searchParams, classification]);

  if (classification === true) {
    return (
      <div className="flex flex-col gap-y-4">
        <TableHeader
          tableHeader={columns}
          // dateTimeFilter={(e) => dateTimeFilter(e, 1)}
          // serachFunction={(e: string) => {dispatch(ClassificationsReports(e));
          //   dispatch(setParamsData(`${e}&`))
          // }}
        />
        <Table
          columns={columns}
          data={classificationsReports && classificationsReports?.data}
          pagination={true}
          isCheckbox={false}
          isStatus={false}
          dataPage={classificationsReports?.meta}
          dispatchFunction={(e: number) => ClassificationsReports(e)}
        />
      </div>
    );
  } else {
    return (
      <div className="flex flex-col gap-y-4">
        <TableHeader
          tableHeader={columns}
          // dateTimeFilter={(e) => dateTimeFilter(e, 0)}
          // serachFunction={(e: string) => dispatch(ExtractionsReports(e))}
        />{" "}
        <Table
          columns={columns}
          data={extractionsReports && extractionsReports?.data}
          pagination={true}
          isCheckbox={false}
          isStatus={false}
          dataPage={extractionsReports?.meta}
          dispatchFunction={(e: number) => ExtractionsReports(e)}
        />
      </div>
    );
  }
};

export default AccuracyTable;
