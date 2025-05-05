import Table from "@/components/tables/Table";
import TableHeader from "./TableHeader";
import CtxProvider from "@/components/Common/Context";
import { useDispatch, useSelector } from "react-redux";
import { Classification } from "@/Store/Reducer/ClassificationSlice";
import { TableColumn } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import { useEffect } from "react";

const ClassificationTable = () => {
  const dispatch = useDispatch<AppDispatch>();

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
      Header: "Case",
      accessor: "case",
      sort: true,
    },
    {
      Header: "Document Name",
      accessor: "document",
      sort: true,
    },
    {
      Header: "Expires  In(min)",
      accessor: "expires",
    },
  ];

  const { classificationList } = useSelector(
    ({ ClassificationSlice }) => ClassificationSlice
  );
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);
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
      dispatch(Classification(`?${combinedParams}`));
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col gap-y-4">
        <CtxProvider>
          <TableHeader
            data={classificationList && classificationList?.items}
            tableHeader={columns}
          />
          {classificationList?.items && (
            <Table
              columns={columns}
              data={classificationList && classificationList?.items}
              isCheckbox={true}
              pagination={true}
              dispatchFunction={(e) => Classification(e)}
              dataPage={classificationList?.meta}
            />
          )}
        </CtxProvider>
      </div>
    </>
  );
};

export default ClassificationTable;
