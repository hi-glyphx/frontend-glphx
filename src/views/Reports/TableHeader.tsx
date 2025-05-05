import { Card, useTheme } from "@mui/material";
import React from "react";
import DropDownSearch from "@/components/tables/DropDownSearch";
import CommonDateRangePicker from "@/components/Common/DateRange/DateRangePicker";
import { DateFiler, TableColumn } from "@/shared/config/types";
import moment from "moment";
import { setSearchParams } from "@/Store/Reducer/CommonSlice";
import { AppDispatch } from "@/Store/Store";
import { useDispatch } from "react-redux";
interface TYPE {
  isAddButton?: boolean;
  serachFunction?: (e: string) => void;
  dateTimeFilter?: (e: DateFiler[]) => void;
  tableHeader?: TableColumn[];
}

export default function TableHeader({ tableHeader }: TYPE) {
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();

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
        <div className="flex flex-row items-center gap-4  justify-end">
          <DropDownSearch
            columns={tableHeader}
            serachFunction={(e: string) => handleSearch(e)}
          />
          <CommonDateRangePicker
            dateTimeFilter={handleDateFilter}
            serachFunction={(e: string) => handleSearch(e)}
          />
        </div>
      </Card>
    </>
  );
}
