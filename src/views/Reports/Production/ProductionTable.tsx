import { ProcessingReportList } from "@/Store/Reducer/ReportsSlice";
import Table from "@/components/tables/Table";
import { DateFiler, TableColumn } from "@/shared/config/types";
import { useDispatch, useSelector } from "react-redux";
import TableHeader from "@/views/Reports/TableHeader";
import moment from "moment";
import { AppDispatch } from "@/Store/Store";
import { setParamsData } from "@/Store/Reducer/CommonSlice";
import { Typography } from "@mui/material";
import { useEffect } from "react";

const ProductionTable = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { processingReportList } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);

  const sumClassified = processingReportList?.data.reduce(
    (total, report) => total + (report.pages_classified || 0),
    0
  );

  const sumRecognised = processingReportList?.data.reduce(
    (total, report) => total + (report.pages_recognised || 0),
    0
  );

  const columns: TableColumn[] = [
    {
      Header: "Start Date | Time ",
      accessor: "created",
      
    },
    {
      Header: "End Date | Time ",
      accessor: "completed",
    },
    {
      Header: "Document Name",
      accessor: "document_name",
      sort: true,
    },
    {
      Header: "Case ID",
      accessor: "case_id",
      sort: true,
    },
    {
      Header: "Form ID",
      accessor: "form_id",
      sort: true,
    },
    {
      Header: "Status",
      accessor: "status",

      Cell: (column) => {
        return (
          <div className="cursor-pointer">
            {column?.row?.original?.status == "Success" ? (
              <Typography variant="body2" color="#47D8A4">
                {column?.row?.original?.status}
              </Typography>
            ) : (
              <Typography variant="body2" color="#FF5F5F">
                {column?.row?.original?.status}
              </Typography>
            )}
          </div>
        );
      },
    },
    {
      Header: "Alias",
      accessor: "alias",
    },
    {
      Header: `Pages Classified (${sumClassified})`,
      accessor: "pages_classified",
    },
    {
      Header: `Pages Recognised (${sumRecognised})`,
      accessor: "pages_recognised",
    },
  ];

  // const dateTimeFilter = (item: DateFiler[]) => {
  //   let updateData = {
  //     from_date: moment(item[0].startDate).format("YYYY-M-D"),
  //     to_date: moment(item[0].endDate).format("YYYY-M-D"),
  //   };
  //   if (updateData.from_date && updateData.to_date) {
  //     dispatch(setParamsData (`?from_date=${updateData.from_date}&to_date=${updateData.to_date}&`))

  //     dispatch(
  //       ProcessingReportList(`?from_date=${updateData.from_date}&to_date=${updateData.to_date}
  // `)
  //     );
  //   }
  // };

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
      dispatch(ProcessingReportList(`?${combinedParams}`));
    }
  }, [searchParams]);

  return (
    <>
      <TableHeader
        tableHeader={[
          {
            Header: "Status",
            accessor: "status",
          },
          {
            Header: "Alias",
            accessor: "alias",
          },
        ]}
        // dateTimeFilter={(e) => dateTimeFilter(e)}
        // serachFunction={(e: string) => {dispatch(ProcessingReportList(e));
        //   dispatch(setParamsData(`${e}&`))
        // }}
      />
      <Table
        columns={columns}
        data={processingReportList && processingReportList?.data}
        pagination={true}
        isCheckbox={false}
        isStatus={false}
        dataPage={processingReportList?.meta}
        dispatchFunction={(e: number) => ProcessingReportList(e)}
      />
    </>
  );
};

export default ProductionTable;
