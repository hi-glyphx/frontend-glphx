import Table from "@/components/tables/Table";
import CountCard from "@/components/Common/CountCard";
import { useRouter } from "next/router";
import TableHeader from "@/views/case/TableHeader";
import CtxProvider from "@/components/Common/Context";
import { CaseList } from "@/Store/Reducer/CaseSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { TableColumn } from "@/shared/config/types";
import { Typography } from "@mui/material";
import { AppDispatch } from "@/Store/Store";
import { useEffect } from "react";

const Case = () => {
  const router = useRouter();
  const { caseList } = useSelector(({ CaseSlice }) => CaseSlice);
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);



  const dispatch = useDispatch<AppDispatch>();
  const columns: TableColumn[] = [
    {
      Header: "Case ID",
      accessor: "case_id",
      sort: "true",
      Cell: (column) => {
        return (
          <div
            className="cursor-pointer"
            onClick={() => {
              router.push({
                pathname: "/case/case-detail",
                query: { id: column?.row?.original?.case_id },
              });
            }}
          >
            {column?.row?.original?.case_id}
          </div>
        );
      },
    },
    {
      Header: "Case Number",
      accessor: "case_num",
      sort: "true",
      Cell: (column) => {
        return (
          <div
            className="cursor-pointer"
            style={{ textDecoration: "underline", cursor: "pointer" }}
            onClick={() => {
              console.log("colums-->",column)
              router.push({
                pathname: "/case/case-detail",
                query: { id: column?.row?.original?.case_id },
              });
            }}
          >
            {column?.row?.original?.case_num}
          </div>
        );
      },
    },
    {
      Header: "Created By",
      accessor: "created_by",
    },

    {
      Header: "Date | Time of Creation",
      accessor: "created",
      Cell: ({ value }) => {
        if (!value) {
          return "";
        }
        const [time, date] = value.split(" ");
        const [day, month, year] = date.split("-").map(Number);
        const [hours, minutes] = time.split(":").map(Number);
        const formattedDate = new Date(year, month - 1, day);
        const formattedDateString = formattedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        let formattedTime;
        let period = hours >= 12 ? "PM" : "AM";

        if (hours === 0) {
          formattedTime = `12:${minutes < 10 ? "0" : ""}${minutes}`;
        } else if (hours > 12) {
          formattedTime = `${hours - 12 < 10 ? "0" : ""}${hours - 12}:${
            minutes < 10 ? "0" : ""
          }${minutes}`;
        } else {
          formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
            minutes < 10 ? "0" : ""
          }${minutes}`;
        }

        return (
          <div>
            {formattedDateString}
            <br />
            {formattedTime} {period}
          </div>
        );
      },
    },

    {
      Header: "Date | Time of Completion",
      accessor: "completed",
      Cell: ({ value }) => {
        if (!value) {
          return "";
        }
        const [time, date] = value.split(" ");
        const [day, month, year] = date.split("-").map(Number);
        const [hours, minutes] = time.split(":").map(Number);
        const formattedDate = new Date(year, month - 1, day);
        const formattedDateString = formattedDate.toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "2-digit",
        });
        let formattedTime;

        if (hours === 0) {
          formattedTime = `12:${minutes < 10 ? "0" : ""}${minutes}`;
        } else if (hours > 12) {
          formattedTime = `${hours - 12 < 10 ? "0" : ""}${hours - 12}:${
            minutes < 10 ? "0" : ""
          }${minutes}`;
        } else {
          formattedTime = `${hours < 10 ? "0" : ""}${hours}:${
            minutes < 10 ? "0" : ""
          }${minutes}`;
        }

        return (
          <div>
            {formattedDateString}
            <br />
            {formattedTime} {hours >= 12 ? "PM" : "AM"}
          </div>
        );
      },
    },
    {
      Header: "Duration",
      accessor: "duration",
      Cell: ({ row }) => {
        const { created, completed } = row.original;
        let finalDate: any = "";

        if (created) {
          let Created = moment(created, "HH:mm DD-MM-YYYY");
          let Completed = completed
            ? moment(completed, "HH:mm DD-MM-YYYY")
            : moment();

          let difference = moment.duration(Completed.diff(Created));

          let days = Math.floor(difference.asDays());
          let hours = Math.floor(difference.hours());
          let minutes = Math.floor(difference.minutes());

          if (days > 0) {
            finalDate += `${days} day${days !== 1 ? "s" : ""} `;
          }
          if (hours > 0) {
            finalDate += `${hours} hour${hours !== 1 ? "s" : ""} `;
          }
          if (minutes > 0) {
            finalDate += `${minutes} min${minutes !== 1 ? "s" : ""}`;
          }
        }

        return finalDate.trim();
      },
    },
    {
      Header: "Status",
      accessor: "processed",
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

  const data = [
    {
      title: "Total Cases",
      count: caseList?.meta?.total_cases,
    },
    {
      title: "Pending Cases",
      count: caseList?.meta?.pending_cases,
    },
    {
      title: "Completed Cases",
      count: caseList?.meta?.completed_cases,
    },
  ];

  // useEffect(() => {
  //   const params: any = new URLSearchParams(searchParams);
  //   let combinedParams = "";
  //   for (const [key, value] of params) {
  //     if (value != "") {
  //       combinedParams += `&${value.slice(1)}`;
  //     } else {
  //       combinedParams += `${value.slice(1)}`;
  //     }
  //   }
  //   combinedParams = combinedParams.slice(1);
  //   if (combinedParams) {
  //     dispatch(CaseList(`?${combinedParams}`));
  //   }

  //   // else {
  //   //   dispatch(CaseList(`?page=1`));
  //   // }

  //   console.log("caselist->",caseList)
  //   console.log("search params->",searchParams)


  // }, [searchParams]);

  // useEffect(() => {
  //   dispatch(CaseList(`?page=1`));
  // }, []);

  return (
    <>
       <div className="flex flex-col gap-y-4 max-[1400px]:gap-y-4">
        <CountCard data={data} />
        <div className="flex flex-col gap-y-4 overflow-x-auto">
          <CtxProvider>
            <TableHeader
              data={caseList && caseList?.data}
              tableHeader={[
                {
                  Header: "Case ID",
                  accessor: "case_id",
                  sort: "true",
                },
                {
                  Header: "Case Number",
                  accessor: "case_num",
                },
                {
                  Header: "Created By",
                  accessor: "created_by",
                },
                {
                  Header: "Status",
                  accessor: "processed",
                },
              ]}
            />
            {caseList?.data && (
              <Table
                columns={columns}
                data={caseList && caseList?.data}
                pagination={true}
                isCheckbox={true}
                isStatus={true}
                dataPage={caseList?.meta}
                dispatchFunction={(e: number) => CaseList(e)}
              />
            )}
          </CtxProvider>
        </div>
      </div>
    </>
  );
};

export default Case;
