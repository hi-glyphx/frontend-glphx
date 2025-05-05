import CountCard from "@/components/Common/CountCard";
import { useSelector } from "react-redux";

type PageProps = {
  classification: boolean;
};

const AccuracyCountCard = ({ classification }: PageProps) => {

  const { classificationsReports, extractionsReports } = useSelector(
    ({ ReportsSlice }) => ReportsSlice
  );

  const data = [
    {
      title: "Total Reports",
      // count: 244,
      count: classification === true ? classificationsReports?.meta?.total_reports : extractionsReports?.meta?.total_reports,
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
      <CountCard data={data} />
    </div>
  );
};

export default AccuracyCountCard;
