import {
  Checkbox,
  FormControlLabel,
  Card,
  useTheme,
  Typography,
} from "@mui/material";
import React, { useContext } from "react";
import Image from "next/image";
import IconService from "@/utils/Icons";
import DropDownSearch from "@/components/tables/DropDownSearch";
import CommonDateRangePicker from "@/components/Common/DateRange/DateRangePicker";
import AddFileLink from "@/components/Common/AddFileLink";
import { SimpleCtx } from "@/components/Common/Context";
import { useDispatch } from "react-redux";
import {
  DeleteExtractionBatch,
  Verification,
  expiresVerification,
} from "@/Store/Reducer/ExtractionSlice";
import { DateFiler, TableColumn } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import { setSearchParams } from "@/Store/Reducer/CommonSlice";
import moment from "moment";

interface TYPE {
  isAddButton?: boolean;
  data?: any;

  tableHeader?: TableColumn[];
}

interface TYPE {
  onDeleteCases?: () => void; // Add this
  onExpiresVerifications?: () => void; // Add this

}

export default function TableHeader({
  isAddButton,
  data,
  onDeleteCases,
  onExpiresVerifications,
  tableHeader,
}: TYPE) {
  const { selectedData, setSelectedData }: any = useContext(SimpleCtx);

  const dispatch = useDispatch<AppDispatch>();

  const onDeleteCase = () => {
    if(onDeleteCases){
      onDeleteCases();
    }
    selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        dispatch(
          DeleteExtractionBatch({ batch_id: [`${item?.original?.batch_id}`] })
        ).then((res) => {
          if (res) {
            dispatch(Verification(`?page=1`));
          }
        });
      });
  };
  const onExpiresVerification = () => {
    if(onExpiresVerifications){
      onExpiresVerifications()
    }
    let updateBatchId =
      selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        if (item?.original?.batch_id) {
          return item?.original?.batch_id;
        }
      });

    dispatch(expiresVerification({ batch_id: updateBatchId })).then((res) => {
      if (res) {
        dispatch(Verification(`?page=1`));
      }
    });
  };

  const theme = useTheme();
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
  };

  return (
    <>
      <Card
        variant="outlined"
        className="common-table-header"
        style={{
          background: theme.palette.primary.light,
        }}
      >
        <div className="flex justify-between flex-row  items-center">
          <div className="flex flex-row  items-center gap-4">
            <FormControlLabel
              className="h-12"
              control={
                <Checkbox
                  color="primary"
                  checked={
                    selectedData?.tableSelectedData?.length == data?.length
                  }
                  icon={
                    <img src={IconService.Uncheck.src} alt="Uncheck icon"></img>
                  }
                  checkedIcon={<img src={IconService.checkedIcon.src} />}
                  indeterminateIcon={
                    <img
                      src={IconService.intermidiateminus.src}
                      alt="Uncheck icon"
                    ></img>
                  }
                  onChange={(e) => {
                    setSelectedData({
                      ...selectedData,
                      isSelecteAll: e.target.checked,
                    });
                  }}
                  indeterminate={
                    selectedData?.tableSelectedData?.length > 0 &&
                    selectedData?.tableSelectedData?.length < data?.length
                  }
                />
              }
              label="Select All"
            />

            {selectedData?.tableSelectedData?.length > 0 && (
              <div className="common-header-selected-section h-12  flex flex-row  items-center gap-4 flex-wrap">
                <span className="flex flex-row  items-center gap-1">
                  <Typography variant="body2" color="text.secondary">
                    Selected {selectedData?.tableSelectedData?.length} Document
                  </Typography>
                </span>
                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  onClick={onExpiresVerification}
                >
                  <Image
                    src={IconService.expire}
                    height={24}
                    width={24}
                    alt=""
                  />{" "}
                  <Typography variant="body1" color="text.secondary">
                    Expire Selected
                  </Typography>
                </span>

                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  onClick={onDeleteCase}
                >
                  <Image
                    src={IconService.DeleteRedRounded}
                    height={24}
                    width={24}
                    alt=""
                  />{" "}
                  <Typography variant="body1" color="text.secondary">
                    Delete Selected{" "}
                  </Typography>
                </span>
              </div>
            )}
          </div>

          {!selectedData?.tableSelectedData?.length && (
            <div className="flex flex-row items-center gap-4 ">
              <DropDownSearch
                serachFunction={handleSearch}
                columns={tableHeader}
              />
              <CommonDateRangePicker
                dateTimeFilter={handleDateFilter}
                serachFunction={(e: string) => handleSearch(e)}
              />

              {isAddButton && (
                <div>
                  <AddFileLink />
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
