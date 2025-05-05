import dynamic from "next/dynamic";
import { TableColumn } from "@/shared/config/types";

const Table = dynamic(() => import("@/components/tables/Table"), {
  ssr: false,
});
const ExtractionReportV3 = () => {
  const columns: TableColumn[] = [
    {
      Header: "Title",
      accessor: "title",
    },
    {
      Header: "Page Name",
      accessor: "pageName",
    },
    {
      Header: "Data",
      accessor: "data",
    },
  ];

  const reportData = [
    {
      id: 1,
      title: "Policy Number",
      pageName: "Note",
      data: "3XX7/6XXXXX79/XXX/XX",
    },
    {
      id: 2,
      title: "Issuance Date",
      pageName: "Note",
      data: "!O/O9/2O22",
    },
    {
      id: 3,
      title: "Plan Type",
      pageName: "Note",
      data: "od",
    },
    {
      id: 4,
      title: "Issuance Date",
      pageName: "Note",
      data: "!O/O9/2O22",
    },
    {
      id: 5,
      title: "Plan Type",
      pageName: "Note",
      data: "od",
    },
    {
      id: 6,
      title: "Issuance Date",
      pageName: "Note",
      data: "!O/O9/2O22",
    },
    {
      id: 7,
      title: "Plan Type",
      pageName: "Note",
      data: "od",
    },
    {
      id: 8,
      title: "Plan Type",
      pageName: "Note",
      data: "od",
    },
    {
      id: 9,
      title: "Plan Type",
      pageName: "Note",
      data: "od",
    },
    {
      id: 10,
      title: "Plan Type",
      pageName: "Note",
      data: "od",
    },
    {
      id: 11,
      title: "Issuance Date",
      pageName: "Note",
      data: "!O/O9/2O22",
    },
  ];
  return (
    <div className="extraction-report-v3">
      <Table columns={columns} data={reportData} pagination={false} />
    </div>
  );
};

export default ExtractionReportV3;
