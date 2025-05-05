import CountCard from "@/components/Common/CountCard";
import { useSelector } from "react-redux";

const ProductionCountCard = () => {

  const { processingReportList } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
    );

  const data = [
    {
      title: "Total Reports",
      count: processingReportList?.meta?.total_reports ? processingReportList?.meta?.total_reports : '',
    },
    // {
    //   title: "Completed",
    //   count: 11,
    // },
    // {
    //   title: "Pending",
    //   count: 8,
    // },
  ];

  return (
    <div className="case_cards">
      <CountCard data={data} lgGrid={4} />
    </div>
  );
};

export default ProductionCountCard;
