import { setSearchParams } from "@/Store/Reducer/CommonSlice";
import { AppDispatch } from "@/Store/Store";
import { SimpleCtx } from "@/components/Common/Context";
import CommonDateRangePicker from "@/components/Common/DateRange/DateRangePicker";
import DropDownSearch from "@/components/tables/DropDownSearch";
import { DateFiler, TableColumn } from "@/shared/config/types";
import IconService from "@/utils/Icons";
import { Card, Typography } from "@mui/material";
import moment from "moment";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";

type PageProps = {
  detailPage: boolean;
  isAddButton?: boolean;

  tableHeader?: TableColumn[];

  stageScale?: any;
  setStageScale: (scale: number) => void;
  stageX?: number;
  setStageX: (x: number) => void;
  stageY?: number;
  setStageY: (y: number) => void;
};

const ReportDataTableHeader = ({
  detailPage,
  tableHeader,
  stageScale,
  setStageScale,
  stageX,
  setStageX,
  stageY,
  setStageY,
}: PageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { classificationsReports } = useSelector(
      ({ ReportsSlice }) => ReportsSlice
    );
  const { id } = router.query;
  const handleSearch = (e: string) => {
    dispatch(
      setSearchParams({
        name: "column",
        value: e,
      })
    );
  };

  const convertToString = (item: DateFiler[]) => {
    let updateData = {
      from_date: moment(item[0].startDate).format("YYYY-M-D"),
      to_date: moment(item[0].endDate).format("YYYY-M-D"),
    };
    if (updateData.from_date && updateData.to_date) {
      return `?from_date=${updateData.from_date}&to_date=${updateData.to_date}`;
    }
  };

  const handleDateFilter = (e: DateFiler[]) => {
    dispatch(
      setSearchParams({
        name: "date",
        value: convertToString(e),
      })
    );
    // dispatch(setSearchParams(e));
    // dateTimeFilter?.(e);
  };
  const { selectedData, setSelectedData } = useContext<any>(SimpleCtx);
  // <Typography variant="h2" color="text.secondary" className="ml-[30px]">
  //   Form Num - {query?.id}
  // </Typography>

  const handleZoomIn = () => {
    const scaleBy = 1.2;
    const newScale = stageScale * scaleBy;

    if (newScale <= 2) {
      setStageScale(newScale);
    } else {
      setStageScale(2);
    }
  };

  const handleZoomOut = () => {
    const scaleBy = 1.2;
    const newScale = stageScale / scaleBy;

    if (newScale >= 0.2) {
      setStageScale(newScale);
    } else {
      setStageScale(0.2);
    }
  };

  const handleReset = () => {
    setStageScale(0.53);
    setStageX(0);
    setStageY(0);
  };
  const calculatePercentage = useMemo(() => {
    let percentage: any = (stageScale * 100).toFixed(2);
    // percentage = Math.max(100, Math.min(200, percentage)); // Clamp the value between 100 and 200
    return `${percentage}%`;
  }, [stageScale]);

  return (
    <div className="my-4 flex flex-col gap-y-4">
      {detailPage && (
        <div className="flex gap-x-6">
          <div className="flex gap-x-1">
            <Typography variant="subtitle1">Case Number:</Typography>
            <Typography
              variant="subtitle1"
              className="font-bold"
              color="text.secondary"
            >
              {selectedData?.tableSelectedData[0]?.case_num}
            </Typography>
          </div>
          <div className="flex gap-x-1">
            <Typography variant="subtitle1">Case ID:</Typography>
            <Typography
              variant="subtitle1"
              className="font-bold"
              color="text.secondary"
            >
              {selectedData?.tableSelectedData[0]?.case_id}
            </Typography>
          </div>
          <div className="flex gap-x-1">
            <Typography variant="subtitle1">Form Num:</Typography>
            <Typography
              variant="subtitle1"
              className="font-bold"
              color="text.secondary"
            >
              {selectedData?.tableSelectedData[0]?.document_name}
            </Typography>
          </div>
        </div>
      )}
      <Card
        variant="outlined"
        className="px-6 max-[1400px]:px-3 py-3 rounded-2xl report-list-header flex flex-row justify-between border-transparent items-end"
      >
        <div className="flex items-center gap-x-4 max-[1400px]:gap-x-3">
          <DropDownSearch
            columns={tableHeader}
            serachFunction={(e: string) => handleSearch(e)}
          />
          <CommonDateRangePicker
            dateTimeFilter={handleDateFilter}
            serachFunction={(e: string) => handleSearch(e)}
          />
        </div>

        <div className="flex flex-row gap-3 mb-3 justify-end">
          <Typography variant="subtitle1" className="zoom">
            Zoom {calculatePercentage}
          </Typography>
          <button
            className="zoom-btns cursor-pointer"
            onClick={() => handleZoomOut()}
          >
            <Image src={IconService.ZoomOutIcon} alt="zoomout" />
          </button>
          <button
            className="zoom-btns cursor-pointer"
            onClick={() => handleZoomIn()}
          >
            <Image src={IconService.ZoomInIcon} alt="zoomin" />
          </button>
          <button
            className="reset-btn cursor-pointer"
            onClick={() => handleReset()}
          >
            <Image src={IconService.ResetIcon} alt="reset" />
          </button>
        </div>
      </Card>
    </div>
  );
};

export default ReportDataTableHeader;
