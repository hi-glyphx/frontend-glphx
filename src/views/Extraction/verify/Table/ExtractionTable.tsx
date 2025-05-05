import React from "react";
import dynamic from "next/dynamic";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";
import TableHeader from "./TableHeader";
import CtxProvider from "@/components/Common/Context";
import { useSelector } from "react-redux";
import { TableColumn } from "@/shared/config/types";

// ** pages dynamic imports
const CountCard = dynamic(() => import("@/components/Common/CountCard"), {
  ssr: false,
});
const Table = dynamic(() => import("@/components/tables/Table"), {
  ssr: false,
});

const ExtractionTable = () => {
  const router = useRouter();
  const data = [
    {
      title: "Total Documents",
      count: 681,
    },
    {
      title: "Received Documents",
      count: 560,
    },
    {
      title: "Under Processing",
      count: 81,
    },
    {
      title: "Not Started",
      count: 18,
    },
  ];

  const columns: TableColumn[] = [
    {
      Header: "Batch ID",
      accessor: "batch_id",
      sort: true,
    },

    {
      Header: "Status",
      accessor: "status",
      sort: true,
    },
    {
      Header: "Verifier",
      accessor: "verifier",
    },
    {
      Header: "Case Number",
      accessor: "case",
      sort: true,
      Cell: (column) => {
        return (
          <div
            onClick={() => {
              router.push("/extraction/verify/textfield/verification");
            }}
          >
            {column.value}
          </div>
        );
      },
    },
    {
      Header: "Document Name",
      accessor: "document",
      sort: true,
    },
    {
      Header: "Expired In(min)",
      accessor: "expires",
    },
  ];

  const { extractionVerifyList } = useSelector(
    ({ ExtractionSlice }) => ExtractionSlice
  );

  return (
    <div className="extraction">
      {/* <CountCard data={data} lgGrid={0} /> */}
      <div className="extraction-table mt-4 flex flex-col gap-y-4">
        <Typography variant="h5" color="text.secondary" className="ml-10">
          Verification List
        </Typography>
        <CtxProvider>
          <TableHeader
            data={extractionVerifyList && extractionVerifyList?.items}
          />
          <Table
            columns={columns}
            data={extractionVerifyList && extractionVerifyList?.items}
            isCheckbox={true}
            pagination={true}
            // dispatchFunction={(e) => Verify(e)}
            dataPage={extractionVerifyList?.meta}
          />
        </CtxProvider>
      </div>
    </div>
  );
};

export default ExtractionTable;
