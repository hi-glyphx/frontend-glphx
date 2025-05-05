import dynamic from "next/dynamic";

import { extractionsCaseList } from "@/Store/Reducer/ReportsSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { DateFiler } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import { setParamsData } from "@/Store/Reducer/CommonSlice";
import { useEffect } from "react";

const Table = dynamic(() => import("@/components/tables/Table"), {
  ssr: false,
});
const TableHeader = dynamic(() => import("@/views/Reports/TableHeader"), {
  ssr: false,
});

const ExtractionReportV1 = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ExtractionsCaseList } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);

  let columns: any = [];

  const caseIdColumn = {
    Header: "Case ID",
    accessor: "case_id",
  };

  const caseNumberColumn = {
    Header: "Case Number",
    accessor: "case_num",
  };
  // Check if there is at least one data object

  if (ExtractionsCaseList?.data?.length > 0) {
    // Loop through the data to collect all unique keys
    const allKeys = new Set();
    ExtractionsCaseList.data.forEach((item) => {
      Object.keys(item).forEach((key) => {
        allKeys.add(key);
      });
    });

    // Create columns based on the unique keys (excluding case_id and case_num)
    columns = Array.from(allKeys)
      .filter((key) => key !== "case_id" && key !== "case_num")
      .map((key) => {
        return {
          Header: key,
          accessor: key,
          // className:
          //   key == "RegistrationAddress" || key == "PreviousInsurer"
          //     ? "min-w-[400px]"
          //     : "",
          Cell: (column) => {
            return (
              <div
                className={
                  column?.row?.original[`${key}`]?.length > 25
                    ? "min-w-[300px]"
                    : ""
                }
              >
                {column.value}
              </div>
            );
          },
        };
      });

    // Merge caseIdColumn and caseNumberColumn at the beginning of the columns array
    columns.unshift(caseIdColumn, caseNumberColumn);
  }

  // const dateTimeFilter = (item: DateFiler[]) => {
  //   let updateData = {
  //     from_date: moment(item[0].startDate).format("YYYY-M-D"),
  //     to_date: moment(item[0].endDate).format("YYYY-M-D"),
  //   };
  //   if (updateData.from_date && updateData.to_date) {
  //     dispatch(setParamsData (`?from_date=${updateData.from_date}&to_date=${updateData.to_date}&`))

  //     dispatch(
  //       extractionsCaseList(`?from_date=${updateData.from_date}&to_date=${updateData.to_date}
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
      dispatch(extractionsCaseList(`?${combinedParams}`));
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-y-4">
      <TableHeader
        tableHeader={[
          {
            Header: "Case ID",
            accessor: "case_id",
          },
          {
            Header: "Case Number ",
            accessor: "case_num",
          },
        ]}
        // dateTimeFilter={(e) => dateTimeFilter(e)}
        // serachFunction={(e: string) => {dispatch(extractionsCaseList(e));
        //   dispatch(setParamsData(`${e}&`))
        // }}
      />
      <Table
        columns={columns}
        data={ExtractionsCaseList && ExtractionsCaseList?.data}
        pagination={true}
        isCheckbox={false}
        isStatus={false}
        dataPage={ExtractionsCaseList?.meta}
        dispatchFunction={(e: number) => extractionsCaseList(e)}
      />
    </div>
  );
};

export default ExtractionReportV1;
