import CountCard from "@/components/Common/CountCard";
import { useSelector } from "react-redux";
type CountCardData = {
  title: string;
  count: number;
};

const BasicReportCountCard = () => {

  const { basicReportList_v1 } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );
  const data = [
    {
      title: "Total Reports",
      count: basicReportList_v1?.meta?.total_count,
    },
    {
      title: "Completed",
      count: basicReportList_v1?.meta?.completed_count,
    },
    {
      title: "Pending",
      count: basicReportList_v1?.meta?.pending_count,
    },
  ];

  return <CountCard data={data} />;
};

export default BasicReportCountCard;
