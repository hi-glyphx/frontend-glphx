import {
  Checkbox,
  FormControlLabel,
  Card,
  useTheme,
  Typography,
  Button,
} from "@mui/material";
import React, { useContext } from "react";
import Image from "next/image";
import IconService from "@/utils/Icons";
import DropDownSearch from "@/components/tables/DropDownSearch";
import CommonDateRangePicker from "@/components/Common/DateRange/DateRangePicker";
import AddFileLink from "@/components/Common/AddFileLink";
import { SimpleCtx } from "@/components/Common/Context";
import { useRouter } from "next/router";
import { DateFiler, TableColumn } from "@/shared/config/types";
import { Toaster } from "react-hot-toast";
import { UpdateUser, UserList, deleteUser } from "@/Store/Reducer/UserSlice";
import { AppDispatch } from "@/Store/Store";
import { useDispatch } from "react-redux";
import moment from "moment";
import { setSearchParams } from "@/Store/Reducer/CommonSlice";

interface User {
  id: string;
  resource_uri: string[] | string[][][];
  email: string;
  username: string;
  groups: string[];
  teams: string[];
  is_active: boolean;
  account: string;
}
interface TYPE {
  isAddButton?: boolean;
  data: User[];
  serachFunction?: (e: string) => void;
  dateTimeFilter?: (e: DateFiler[]) => void;
  tableHeader?: TableColumn[];
}

export default function TableHeader({
  data,
  isAddButton,
  serachFunction,
  dateTimeFilter,
  tableHeader,
}: TYPE) {
  const { selectedData, setSelectedData }: any = useContext(SimpleCtx);
  const theme = useTheme();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const handleSearch = (e: string) => {
    dispatch(
      setSearchParams({
        name: "column",
        value: e,
      })
    );
    // serachFunction?.(e);
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

  const DeleteUsers = () => {
    selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        dispatch(deleteUser(item?.original?.id)).then((res) => {
          if (res) {
            dispatch(UserList("?page=1"));
            // Toaster({ customMessage: "User deleted successfully" });
          } else {
            // Toaster({
            //   error: true,
            //   customMessage: "An error occurred",
            // });
          }
        });
      });
  };

  const activeUsers = () => {
    selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        dispatch(
          UpdateUser({
            data: { is_active: true },
            id: item?.original?.id,
          })
        ).then((res) => {
          if (res) {
            dispatch(UserList("?page=1"));
            // Toaster({ customMessage: "User deleted successfully" });
          } else {
            // Toaster({
            //   error: true,
            //   customMessage: "An error occurred",
            // });
          }
        });
      });
  };
  const inActiveUsers = () => {
    selectedData?.tableSelectedData &&
      selectedData?.tableSelectedData?.map((item) => {
        dispatch(
          UpdateUser({
            data: { is_active: false },
            id: item?.original?.id,
          })
        ).then((res) => {
          if (res) {
            dispatch(UserList("?page=1"));
            // Toaster({ customMessage: "User deleted successfully" });
          } else {
            // Toaster({
            //   error: true,
            //   customMessage: "An error occurred",
            // });
          }
        });
      });
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
              label={
                selectedData?.tableSelectedData?.length > 0
                  ? `${selectedData?.tableSelectedData?.length} Selected`
                  : "Select All"
              }
            />

            {selectedData?.tableSelectedData?.length > 0 && (
              <div className="common-header-selected-section  h-12 flex flex-row  items-center gap-6 flex-wrap">
                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  onClick={() => activeUsers()}
                >
                  <Image
                    src={IconService.loremIpsum}
                    height={24}
                    width={24}
                    alt=""
                  />{" "}
                  <Typography variant="body1" color="text.secondary">
                    Active User
                  </Typography>
                </span>
                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  onClick={() => inActiveUsers()}
                >
                  <Image
                    src={IconService.groups}
                    height={24}
                    width={24}
                    alt=""
                  />{" "}
                  <Typography variant="body1" color="text.secondary">
                    Inactive User
                  </Typography>
                </span>
                <span
                  className="flex flex-row  items-center gap-1 chip-label"
                  onClick={() => DeleteUsers()}
                >
                  <Image
                    src={IconService.DeleteRedRounded}
                    height={24}
                    width={24}
                    alt=""
                  />{" "}
                  <Typography variant="body2" color="text.secondary">
                    Delete User{" "}
                  </Typography>
                </span>
              </div>
            )}
          </div>

          {!selectedData?.tableSelectedData?.length && (
            <div className="flex flex-row items-center gap-4 ">
              <DropDownSearch
                columns={tableHeader}
                serachFunction={(e: string) => handleSearch(e)}
              />
              <CommonDateRangePicker
                dateTimeFilter={handleDateFilter}
                serachFunction={(e: string) => handleSearch(e)}
              />

              {isAddButton && (
                <div>
                  <Button
                    variant="outlined"
                    color="primary"
                    className="w-full h-10"
                    onClick={() => router.push("/users/add-user")}
                  >
                    <Image
                      src={IconService.addPrimary}
                      width={15}
                      height={15}
                      alt=""
                      className="mr-1"
                    />
                    ADD
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </Card>
    </>
  );
}
