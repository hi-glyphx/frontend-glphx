import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import theme from "@/styles/theme";
import {
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { DateFiler } from "@/shared/config/types";
import { setSearchParams } from "@/Store/Reducer/CommonSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/Store/Store";

interface TYPE {
  dateTimeFilter?: (e: DateFiler[]) => void;
  serachFunction?: (e?: any) => void;
}

// interface DateRange {
//   startDate: Date;
//   endDate: Date;
//   key: string;
// }

interface DateRangeItem {
  id?: number;
  label?: string;
  value: {
    startDate?: string | Date;
    endDate?: string | Date;
    label?: string;
  };
}
const CommonDateRangePicker = ({ dateTimeFilter, serachFunction }: TYPE) => {
  const [state, setState] = useState<any>([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const formattedStartDate = state[0].startDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  const formattedEndDate = state[0].endDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);
  const customRanges: DateRangeItem[] = [
    {
      id: 1,
      label: "Select",
      value: {
        label: "Select",
      },
    },
    {
      id: 2,
      label: "Last 24 hours",
      value: {
        startDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 24 hours ago
        endDate: new Date(),
        label: "Last 24 hours",
      },
    },
    {
      id: 3,
      label: "Yesterday",
      value: {
        startDate: yesterday,
        endDate: yesterday,
        label: "Yesterday",
      },
    },
    {
      id: 4,
      label: "Last 7 Days",
      value: {
        startDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
        endDate: new Date(),
        label: "Last 7 Days",
      },
    },
    {
      id: 5,
      label: "Last 15 Days",
      value: {
        startDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
        endDate: new Date(),
        label: "Last 15 Days",
      },
    },
    {
      id: 6,
      label: "Last 30 Days",
      value: {
        startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // 30 days ago
        endDate: new Date(),
        label: "Last 30 Days",
      },
    },
    {
      id: 7,
      label: "Last 60 Days",
      value: {
        startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        endDate: new Date(),
        label: "Last 60 Days",
      },
    },
    {
      id: 8,
      label: "Custom",
      value: {
        startDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), // 60 days ago
        endDate: new Date(),
        label: "Custom",
      },
    },
  ];

  const [hours, SetHours] = useState<number>(1);

  const [showCustomPicker, setShowCustomPicker] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeHours = (event: SelectChangeEvent) => {
    const selectedValue = parseInt(event.target.value);

    if (selectedValue == 1) {
      dispatch(
        setSearchParams({
          name: "date",
          value: "",
        })
      );
      dispatch(
        setSearchParams({
          name: "pagination",
          value: "?page=1",
        })
      );
      SetHours(1);
    } else {
      SetHours(selectedValue);
      if (selectedValue == 1) {
        serachFunction?.("");
      } else {
        const currentDate: DateRangeItem | undefined = customRanges.find(
          (item) => item.id == selectedValue
        );

        // Provide a default function if dateTimeFilter is undefined
        const filterFunction = dateTimeFilter ?? ((e: DateFiler[]) => {});

        if (currentDate) {
          // Use a type assertion to specify the structure of the argument
          const dateFilterArgument: DateFiler = {
            startDate: currentDate.value.startDate as string,
            endDate: currentDate.value.endDate as string,
            label: currentDate.value.label as string,
          };
          if (
            dateFilterArgument.startDate &&
            dateFilterArgument.endDate &&
            selectedValue !== 8
          ) {
            filterFunction([dateFilterArgument]);
          }
        }

        if (selectedValue == 8) {
          setShowCustomPicker(true);
        } else {
          setShowCustomPicker(false);
        }
      }
    }
  };
  const handleApplyClick = () => {
    if (dateTimeFilter) {
      dateTimeFilter(state); // Pass the selected date range to the API call
    }
    setShowCustomPicker(false);
  };

  return (
    <div>
      <div className="dateDropdown">
        <div>
          <FormControl className="h-[3rem] w-[11.68rem] ">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={`${hours}`}
              onChange={handleChangeHours}
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  borderRadius: "8px",
                  width: "188px",
                },
              }}
            >
              {customRanges.map((range) => (
                <MenuItem
                  style={{ padding: "12px 97px 12px 24px", width: "188px" }}
                  key={range.id}
                  value={range.id as number}
                >
                  {range.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {showCustomPicker && (
          <div className="dateRange">
            <DateRangePicker
              onChange={(item) => {
                setState([item.selection]);
              }}
              showSelectionPreview={false}
              moveRangeOnFirstSelection={false}
              showDateDisplay={false}
              showMonthAndYearPickers={false}
              showMonthArrow={true}
              showPreview={false}
              months={2}
              ranges={state}
              editableDateInputs={true}
              color={theme.palette.primary.main}
              staticRanges={[]}
              inputRanges={[]}
              rangeColors="#ffff"
              direction="horizontal"
              monthDisplayFormat="MMMM yyyy"
            />
            <div className="selected-range flex items-center justify-around">
              <div>
                <TextField
                  value={formattedStartDate}
                  className="mr-2 h-[2.5rem]"
                />
                <TextField
                  value={formattedEndDate}
                  className="mr-2 h-[2.5rem] "
                />
              </div>
              <Button
                variant="text"
                onClick={() => handleApplyClick()}
                className="ml-4 w-[6.06rem] h-[2.5rem]"
              >
                APPLY
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonDateRangePicker;
