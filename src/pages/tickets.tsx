import TicketSlice, {
  downloadTicket,
  ticketList,
} from "@/Store/Reducer/TicketSlice";
import { AppDispatch } from "@/Store/Store";
import CtxProvider from "@/components/Common/Context";
import CountCard from "@/components/Common/CountCard";
import CommonHeader from "@/components/Common/Header";
import RightContext from "@/components/Common/RightClickMenu";
import Download_File from "@/components/modals/Download_File";
import Raised_Ticket_Details from "@/components/modals/Raised_Ticket_Details";
import Ticket_raise from "@/components/modals/Ticket_raise";
import Status from "@/components/status/Status";
import Table from "@/components/tables/Table";
import {
  DateFiler,
  HandleOpen,
  TableColumn,
  handleClose,
} from "@/shared/config/types";
import { downloadURI } from "@/utils/Functions";
import IconService from "@/utils/Icons";
import TableHeader from "@/views/Tickets/TableHeader";
import { Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Tickets() {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen: HandleOpen = () => setOpen(true);
  const handleClose: handleClose = () => setOpen(false);
  const dispatch = useDispatch<AppDispatch>();
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);
  const [selectedRowData, setSelectedRowData] = useState(null);

  const handleOpenRaisedTicketDetails = (rowData: any) => {
    setSelectedRowData(rowData);
    setIsRaisedTicketDetailsOpen(true);
  };

  const [isRaisedTicketDetailsOpen, setIsRaisedTicketDetailsOpen] =
    useState(false);



  const handleCloseRaisedTicketDetails = () => {
    setIsRaisedTicketDetailsOpen(false);
  };

  const { TicketList } = useSelector(({ TicketSlice }) => TicketSlice);

  const data = [
    {
      title: "Completed",
      count: TicketList?.meta?.total_tickets,
    },
    {
      title: "In Progress",
      count: TicketList?.meta?.in_progress_tickets,
    },
    {
      title: "Pending",
      count: TicketList?.meta?.pending_tickets,
    },
  ];

  const columns: TableColumn[] = [
    {
      Header: "Issue Priority",
      accessor: "priority_level",
      sort: true,
    },

    {
      Header: "Case Number ",
      accessor: "case_num",
      sort: true,
    },
    {
      Header: "Document Name",
      accessor: "document_name",
      sort: true,
    },
    {
      Header: "Ticket Type",
      accessor: "ticket_type",
      sort: true,
    },
    {
      Header: "Reported By",
      accessor: "reported_by",
    },
    {
      Header: "Created Date",
      accessor: "created_at",
    },
    {
      Header: "Completed Date",
      accessor: "completed_at",
    },
    {
      Header: "Status",
      accessor: "status",
      sort: true,
      Cell: (column) => {
        return <Status text={column?.row?.original?.status} />;
      },
    },
    {
      Header: "Details",
      accessor: "report",
      Cell: (column) => {
        return (
          <div>
            <Image
              src={IconService.report}
              alt=""
              height={24}
              width={24}
              onClick={() => handleOpenRaisedTicketDetails(column.row.original)}
              style={{ cursor: "pointer" }}
            />
          </div>
        );
      },
    },
  ];

  const handleRaiseTicket = () => {
    handleOpen();
  };

  const [open1, setOpen1] = useState<boolean>(false);
  const handleOpen1: HandleOpen = () => setOpen1(true);
  const handleClose1: handleClose = () => setOpen1(false);

  const dispatchFunction = () => {
    if(searchParams?.column){
      dispatch(downloadTicket(searchParams?.column)).then((res) => {
        downloadURI(res.payload.url, "v1");
        handleClose1();
      });

    } else{
      dispatch(downloadTicket("")).then((res) => {
        downloadURI(res.payload.url, "v1");
        handleClose1();
      });
    }
    
  };

  const handleDownload = () => {
    handleOpen1();
  };

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
      dispatch(ticketList(`?${combinedParams}`));
    }
  }, [searchParams]);
  return (
    <>
      <Download_File
        open={open1}
        handleClose={handleClose1}
        dispatchFunction={dispatchFunction}
        csv={true}
      />
      <CommonHeader
        title="Tickets"
        handleDownload={handleDownload}
        handleRaiseTicket={handleRaiseTicket}
      />

      <div className="p-[2.5rem]">
        <Ticket_raise handleClose={handleClose} open={open} />
        <RightContext />
        <CountCard data={data} lgGrid={0} />

        <div className="mt-6 flex flex-col gap-y-4">
          <Typography
            variant="h5"
            color="text.secondary"
            textAlign="start"
            className="ms-10 mb-4"
          >
            Ticket List
          </Typography>
        </div>
        <CtxProvider>
          <TableHeader
            data={TicketList ? TicketList?.data : []}
            tableHeader={columns}
            // dateTimeFilter={(e) => dateTimeFilter(e)}
            // serachFunction={(e: string) => dispatch(ticketList(e))}
          />
          <div className="ticket_table pt-4">
            <Table
              columns={columns}
              data={TicketList && TicketList?.data}
              pagination={true}
              //check box enabled
              isCheckbox={true}
              isStatus={false}
              dataPage={TicketList?.meta}
              dispatchFunction={(e: number) => ticketList(e)}
            />
          </div>
        </CtxProvider>
      </div>
      <Raised_Ticket_Details
        open={isRaisedTicketDetailsOpen}
        handleClose={handleCloseRaisedTicketDetails}
        rowData={selectedRowData}
      />
    </>
  );
}
