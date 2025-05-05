import BasicReportCountCard from "@/views/Reports/Basic/ReportData/BasicReportCountCard";
import BasicReportTable from "@/views/Reports/Basic/BasicReportTable";
import { Typography } from "@mui/material";
import TableHeader from "@/views/Reports/TableHeader";

const BasicReport = () => {




  return (
    <>
      <BasicReportCountCard />
      <div className="mt-6 flex flex-col gap-y-4 ">
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="start"
          className="ms-10"
        >
          Report List
        </Typography>
        <TableHeader />
      </div>
      <BasicReportTable />
    </>
  );
};

export default BasicReport;
