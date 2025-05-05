import CountCard from "@/components/Common/CountCard";
import ClassificationTable from "@/views/Classification/classificationbatchList";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";


//Main component
export default function Classification() {
  const { classificationList } = useSelector(
    ({ ClassificationSlice }) => ClassificationSlice
  );

  //array of objects
  const data = [
    {
      title: "Total Documents",
      count: classificationList?.meta?.total_count,
    },
    {
      title: "Under Processing",
      count: classificationList?.meta?.total_batches_pending,
    },
    {
      title: "Not Started",
      count: classificationList?.meta?.total_batches_ready,
    },
  ];

  return (
    <div className="flex flex-col gap-y-4">
      <div className="case_cards">
        <CountCard data={data} />
      </div>
      <div className="flex flex-col gap-y-4">
        <Typography variant="h5" color="text.secondary" className="ml-10">
          Classification List
        </Typography>
        <ClassificationTable />
      </div>
    </div>
  );
}
