import React, { useEffect } from "react";
import Table from "@/components/tables/Table";

import { DateFiler, TableColumn } from "@/shared/config/types";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  BasicReportList,
  setReportVersionDropdown,
} from "@/Store/Reducer/ReportsSlice";
import TableHeader from "@/views/Reports/TableHeader";
import { AppDispatch } from "@/Store/Store";

const BasicReportTable = () => {
  const { basicReportList_v1 } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);

  const dispatch = useDispatch<AppDispatch>();

  const router = useRouter();
  const columns: TableColumn[] = [
    {
      Header: "Date | Time of Creation",
      accessor: "created",
      Cell: (column) => {
        if (!column?.row?.original?.created) {
          return <></>;
        }
        const [time, date] = column?.row?.original?.created.split(" ");
        const [day, month, year] = date.split("-").map(Number);
        const [hours, minutes] = time.split(":").map(Number);
        const formattedDate = new Date(year, month - 1, day);
        const formattedDateString = formattedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        const formattedTime = `${hours}.${minutes}`;
        return (
          <div>
            {formattedDateString}
            <br />
            {formattedTime}
          </div>
        );
      },
    },

    {
      Header: "Date | Time of Completion",
      accessor: "completed",
      Cell: (column) => {
        if (!column?.row?.original?.completed) {
          return <></>;
        }
        const [time, date] = column?.row?.original?.completed.split(" ");
        const [day, month, year] = date.split("-").map(Number);
        const [hours, minutes] = time.split(":").map(Number);
        const formattedDate = new Date(year, month - 1, day);
        const formattedDateString = formattedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        const formattedTime = `${hours}.${minutes}`;
        return (
          <div>
            {formattedDateString}
            <br />
            {formattedTime}
          </div>
        );
      },
    },
    {
      Header: "Document Name",
      accessor: "form_num",
      sort: true,
    },
    {
      Header: "Project",
      accessor: "template",
    },
    {
      Header: "Case ID",
      accessor: "case_id",
      sort: true,
    },
    {
      Header: "Case Number ",
      accessor: "case_num",
      sort: true,
      Cell: (column) => {
        return (
          <div
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              if (column?.row?.original?.has_extraction_result) {
                
                router.push({
                  pathname: "/report/report-detail",
                  query: {
                    id: column?.row?.original?.case_id,
                    extraction: true,
                  },
                });
                dispatch(setReportVersionDropdown(4));
              }
              if (column?.row?.original?.has_classification_result) {
                console.log(column?.row?.original?.has_classification_result)
                router.push({
                  pathname: "/report/report-detail",
                  query: {
                    id: column?.row?.original?.case_id,
                    classify: true,
                  },
                });
                dispatch(setReportVersionDropdown(0));
              }
            }}
          >
            {column.value}
          </div>
        );
      },
    },
    {
      Header: "Classification",
      accessor: "has_classification_result",
      Cell: (column) => {
        return (
          <div>
            {column?.row?.original?.has_classification_result == false
              ? "False"
              : "True"}
          </div>
        );
      },
    },
    {
      Header: "Extraction",
      accessor: "has_extraction_result",
      Cell: (column) => {
        return (
          <div>
            {column?.row?.original?.has_extraction_result == false
              ? "False"
              : "True"}
          </div>
        );
      },
    },
  ];

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
      dispatch(BasicReportList(`?${combinedParams}`));
    }
  }, [searchParams]);

  return (
    <div className="mt-4 flex flex-col gap-y-4 ">
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
          {
            Header: "Document Name",
            accessor: "form_num",
          },
          {
            Header: "Project",
            accessor: "template",
          },
        ]}
      />
      <Table
        columns={columns}
        data={basicReportList_v1?.data}
        pagination={true}
        isCheckbox={false}
        isStatus={false}
        dataPage={basicReportList_v1?.meta}
        dispatchFunction={(e: number) => BasicReportList(e)}
      />
    </div>
  );
};

export default BasicReportTable;
