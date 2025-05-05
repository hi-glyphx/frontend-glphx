import {
  Checkbox,
  FormControlLabel,
  Card,
  useTheme,
  Typography,
  SvgIcon,
} from "@mui/material";

import React, { useContext } from "react";
import Image from "next/image";
import IconService from "@/utils/Icons";

import DropDownSearch from "@/components/tables/DropDownSearch";
import CommonDateRangePicker from "@/components/Common/DateRange/DateRangePicker";

import AddFileLink from "@/components/Common/AddFileLink";
import { SimpleCtx } from "@/components/Common/Context";

interface TYPE {
  isAddButton?: boolean;
  data?: any;
}

export default function TableHeader({ isAddButton, data }: TYPE) {
  const { selectedData, setSelectedData }: any = useContext(SimpleCtx);

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
                    Selected 4 Document
                  </Typography>
                </span>
                <span className="flex flex-row  items-center gap-1 chip-label cursor-pointer">
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

                <span className="flex flex-row  items-center gap-1 chip-label cursor-pointer">
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
              <DropDownSearch />
              <CommonDateRangePicker />

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
