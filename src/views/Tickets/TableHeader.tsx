import {
  Checkbox,
  FormControlLabel,
  Card,
  useTheme,
  Typography,
  SvgIcon,
} from "@mui/material";

import React, { useContext, useEffect } from "react";
import Image from "next/image";
import IconService from "@/utils/Icons";

import DropDownSearch from "@/components/tables/DropDownSearch";
import CommonDateRangePicker from "@/components/Common/DateRange/DateRangePicker";

import AddFileLink from "@/components/Common/AddFileLink";
import { SimpleCtx } from "@/components/Common/Context";
import { DateFiler, TableColumn } from "@/shared/config/types";
import moment from "moment";
import { setSearchParams } from "@/Store/Reducer/CommonSlice";
import { AppDispatch } from "@/Store/Store";
import { useDispatch } from "react-redux";
import { deleteTicket,updateTicket,ticketList } from "@/Store/Reducer/TicketSlice";

interface Ticket {
ticket_id: string;
case_id: string;
document_name: string;
priority_level: string;
status: string;
created_at: string;
// Add any other fields relevant to your tickets
}

interface TYPE {
data: Ticket[]; // Now the data array contains Ticket objects with ticket_id
serachFunction?: (e: string) => void;
dateTimeFilter?: (e: DateFiler[]) => void;
tableHeader?: TableColumn[];
}

export default function TableHeader({
  data,
  serachFunction,
  dateTimeFilter,
  tableHeader,
}: TYPE) {
  const [isTrue, setIsTrue] = React.useState<boolean>(false);
  const { selectedData, setSelectedData }: any = useContext(SimpleCtx);
  const dispatch = useDispatch<AppDispatch>();

  //Delete dicket functionality added ln54 and ln118
  //New delete functionality addded
  const onDeleteTicket = async () => {
    let updatedDeletedData =
      selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        return item?.original?.ticket_id;
      });

    if (updatedDeletedData && updatedDeletedData.length > 0) {
      await Promise.all(
        updatedDeletedData.map((ticket_id) => 
          dispatch(deleteTicket(ticket_id))
        
        )
      );
  
      dispatch(ticketList(`?page=1`));
    }
  };

  
  //setStatus line updated by iterating and gerating id's via mapp ln72s
  //new expire one
  const onExpireTicket = () => {
    let updateExpireData = selectedData?.tableSelectedData?.map((item) => {
      return item?.original?.ticket_id;
    });
  

    if (updateExpireData && updateExpireData.length > 0) {
      updateExpireData.forEach((ticket_id) => {
        dispatch(updateTicket(ticket_id));
      });
    }

    dispatch(ticketList(`?page=1`));
  };
  
  
  

  const handleSearch = (e: string) => {
    dispatch(
      setSearchParams({
        name: "column",
        value: e,
      })
    );
     serachFunction?.(e);
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
     dispatch(setSearchParams(e));
     dateTimeFilter?.(e);
  };


  const theme = useTheme();

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
            {<FormControlLabel
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
                  setSelectedData({...selectedData, isSelecteAll: e.target.checked });                  }}
                indeterminate={
                  selectedData?.tableSelectedData?.length > 0 &&
                  selectedData?.tableSelectedData?.length < data?.length
                }
              />
              }
              label={selectedData?.tableSelectedData?.length > 0 ?`${selectedData?.tableSelectedData?.length} Selected` : "Select All"}
            />}

            {selectedData?.tableSelectedData?.length > 0 && (
              <div className="common-header-selected-section h-12  flex flex-row  items-center gap-4 flex-wrap">
                <span className="flex flex-row  items-center gap-1">
                  <Typography variant="body2" color="text.secondary">
                    Selected {selectedData?.tableSelectedData?.length} Document
                  </Typography>
                </span>
                <span className="flex flex-row  items-center gap-1 chip-label cursor-pointer"
                onClick={onExpireTicket}>
                  <Image
                    src={IconService.expire}
                    height={24}
                    width={24}
                    alt=""
                  />{" "}
                  <Typography variant="body1" color="text.secondary">
                    Set Status
                  </Typography>
                </span>
                
                <span className="flex flex-row  items-center gap-1 chip-label cursor-pointer"
                onClick={onDeleteTicket}>
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

          {!selectedData?.tableSelectedData?.length  && (
            <div className="flex flex-row items-center gap-4 ">
              <DropDownSearch
              columns={tableHeader}
              serachFunction={(e: string) => handleSearch(e)}
            />
            <CommonDateRangePicker
              dateTimeFilter={handleDateFilter}
              serachFunction={(e: string) => handleSearch(e)}
            />
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
