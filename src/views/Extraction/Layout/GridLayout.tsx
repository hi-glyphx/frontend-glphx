import React from "react";

import Table from "@/components/tables/Table";
import { TableColumn } from "@/shared/config/types";

const GridLayout = () => {
  const columns:TableColumn[]  = [
    {
      Header: "Test",
      accessor: "test",
    },
    {
      Header: "Result",
      accessor: "result",
    },
    {
      Header: "Units",
      accessor: "units",
    },
    {
      Header: "Biological Reference Interval",
      accessor: "bioref",
    },
  ];

  const userData: any = [
    {
      test: "Basophils",
      result: "0.7",
      units: "%",
      bioref: "0-2",
    },
    {
      test: "Absolute Neutrophil Count",
      result: "5132",
      units: "cu.mm",
      bioref: "2000-8800",
    },
    {
      test: "Absolute Lymphocyte Count",
      result: "2557",
      units: "cu.mm",
      bioref: "1000-4400",
    },
  ];
  return (
    <div className="card-table-layout ">
      <Table columns={columns} data={userData} pagination={false} />
    </div>
  );
};

export default GridLayout;
