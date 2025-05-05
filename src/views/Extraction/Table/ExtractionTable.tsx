import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Typography } from "@mui/material";
import TableHeader from "./TableHeader";
import CtxProvider from "@/components/Common/Context";
import { useDispatch, useSelector } from "react-redux";
import { Verification } from "@/Store/Reducer/ExtractionSlice";
import { TableColumn } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";

const CountCard = dynamic(() => import("@/components/Common/CountCard"), {
  ssr: false,
});
const Table = dynamic(() => import("@/components/tables/Table"), {
  ssr: false,
});

// Add interface here
interface ExtractionTableProps {
  onDeleteCases?: () => void;
  onExpiresVerifications?: () => void; 
}

const ExtractionTable: React.FC<ExtractionTableProps> = ({
  onDeleteCases, // Receive the function
  onExpiresVerifications, // Receive the function
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const { extractionBatchList } = useSelector(
    ({ ExtractionSlice }) => ExtractionSlice
  );
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);

  const data = [
    {
      title: "Total Documents",
      count: `${
        extractionBatchList?.meta?.total_count
          ? extractionBatchList?.meta?.total_count
          : 0
      }`,
    },

    {
      title: "Under Processing",
      count: `${
        extractionBatchList?.meta?.total_batches_pending
          ? extractionBatchList?.meta?.total_batches_pending
          : 0
      }`,
    },
    {
      title: "Not Started",
      count: `${
        extractionBatchList?.meta?.total_batches_ready
          ? extractionBatchList?.meta?.total_batches_ready
          : 0
      }`,
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
    },
    {
      Header: "Document Name",
      accessor: "document",
      sort: true,
    },
    {
      Header: "Expires In(min)",
      accessor: "expires",
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
      dispatch(Verification(`?${combinedParams}`));
    }
  }, [searchParams]);

  return (
    <div className="extraction">
      <CountCard data={data} lgGrid={0} />
      <div className="extraction-table mt-4 flex flex-col gap-y-4">
        <Typography variant="h5" color="text.secondary" className="ml-10">
          Verification List
        </Typography>
        <CtxProvider>
          {/* Pass the functions to TableHeader */}
          <TableHeader
            data={extractionBatchList && extractionBatchList?.items}
            tableHeader={columns}
            onDeleteCases={onDeleteCases} // Pass as prop
            onExpiresVerifications={onExpiresVerifications} // Pass as prop
          />
          {extractionBatchList?.items && (
            <Table
              columns={columns}
              data={extractionBatchList && extractionBatchList?.items}
              isCheckbox={true}
              pagination={true}
              dispatchFunction={(e) => Verification(e)}
              dataPage={extractionBatchList?.meta}
            />
          )}
        </CtxProvider>
      </div>
    </div>
  );
};

export default ExtractionTable;
