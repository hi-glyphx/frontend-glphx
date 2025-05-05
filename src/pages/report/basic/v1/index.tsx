import BasicReportCountCard from "@/views/Reports/Basic/ReportData/BasicReportCountCard";
import BasicReportTable from "@/views/Reports/Basic/BasicReportTable";
import { Typography } from "@mui/material";


const BasicReport = () => {
  return (
    <>
      <BasicReportCountCard />
      <div className="mt-4 flex flex-col gap-y-4 ">
        <Typography
          variant="h5"
          color="text.secondary"
          textAlign="start"
          className="ms-10"
        >
          Report List
        </Typography>
        
      </div>
      <BasicReportTable />
    </>
  );
};

export default BasicReport;
