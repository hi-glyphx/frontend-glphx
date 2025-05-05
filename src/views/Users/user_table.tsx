import React, { useEffect, useState } from "react";
import CtxProvider from "@/components/Common/Context";
import Table from "@/components/tables/Table";
import TableHeader from "../Users/TableHeader";
import { UserList, deleteUser, UpdateUser } from "@/Store/Reducer/UserSlice";
import { Divider, Tooltip, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import IconService from "@/utils/Icons";
import Image from "next/image";
import { useRouter } from "next/router";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";
import { DateFiler, TableColumn } from "@/shared/config/types";
import Toaster from "@/components/Common/Toaster";
import moment from "moment";
import { AppDispatch } from "@/Store/Store";
import { setParamsData } from "@/Store/Reducer/CommonSlice";

interface UserData {
  id: number;
}

const User_table = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { searchParams } = useSelector(({ CommonSlice }) => CommonSlice);

  const router = useRouter();
  const handleGroupsClick = (userData: UserData) => {
    router.push({
      pathname: "/users/add-user",
      query: { userID: userData.id },
    });
  };
  const onActiveInactiveUser = (row, bool: boolean) => {
    dispatch(
      UpdateUser({
        data: { is_active: bool },
        id: row?.original?.id,
      })
    ).then((res) => {
      if (res) {
        dispatch(UserList("?page=1"));
      }
    });
  };

  const columns: TableColumn[] = [
    {
      Header: "User Name",
      accessor: "username",
    },

    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Team",
      accessor: "teams",
      sort: "true",
    },
    {
      Header: "Groups",
      accessor: "groups",
      sort: "true",
    },
    {
      Header: "Created On",
      accessor: "created_on",
      Cell: (column) => {
        return (
          <>
            {column?.value ? (
              <>
                <div>{column.value.date}</div>
                <div>{column.value.time}</div>
              </>
            ) : (
              "-"
            )}
          </>
        );
      },
    },
    {
      Header: "Actions",
      accessor: "actions",
      Cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Tooltip
              arrow
              placement="top"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#ffffff",
                    border: 1,
                    borderColor: "#ffffff",
                    fontSize: "14px",
                    fontWeight: 400,
                    fontFamily: "Satoshi-Regular",
                    color: "#524587",
                    boxShadow: " 0px 0px 4px 1px #DFDFFF",
                    minWidth: "max-content",
                    "& .MuiTooltip-arrow": {
                      color: "#ffffff",
                    },
                  },
                },
              }}
              title={
                <div className="flex flex-row items-center gap-1">Delete</div>
              }
            >
              <Image
                src={IconService.DeleteRedRounded}
                alt=""
                onClick={() => {
                  dispatch(deleteUser(row?.original?.id)).then((res) => {
                    if (res) {
                      dispatch(UserList("?page=1"));
                      Toaster({ customMessage: "User deleted successfully" });
                    } else {
                      Toaster({
                        error: true,
                        customMessage: "An error occurred",
                      });
                    }
                  });
                }}
                className="cursor-pointer"
              />
            </Tooltip>
            <Divider orientation="vertical" className="h-4 mx-2  " />

            <Tooltip
              arrow
              placement="top"
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: "#ffffff",
                    border: 1,
                    borderColor: "#ffffff",
                    fontSize: "14px",
                    fontWeight: 400,
                    fontFamily: "Satoshi-Regular",
                    color: "#524587",
                    boxShadow: " 0px 0px 4px 1px #DFDFFF",
                    minWidth: "max-content",
                    "& .MuiTooltip-arrow": {
                      color: "#ffffff",
                    },
                  },
                },
              }}
              title={
                <div className="flex flex-row items-center gap-1">Edit</div>
              }
            >
              <Image
                src={IconService.groups}
                alt=""
                onClick={() => handleGroupsClick(row.original)}
                className="cursor-pointer"
              />
            </Tooltip>
          </div>
        );
      },
    },
    {
      Header: "User Active",
      accessor: "is_active",
      Cell: ({ value, row }) => {
        const [isActive, setIsActive] = useState(value);
        const dispatch = useDispatch();

        return (
          <div className="flex items-center">
            {isActive ? (
              <Tooltip
                arrow
                placement="top"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "#ffffff",
                      border: 1,
                      borderColor: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 400,
                      fontFamily: "Satoshi-Regular",
                      color: "#524587",
                      boxShadow: " 0px 0px 4px 1px #DFDFFF",
                      minWidth: "max-content",
                      "& .MuiTooltip-arrow": {
                        color: "#ffffff",
                      },
                    },
                  },
                }}
                title={
                  <div className="flex flex-row items-center gap-1">Active</div>
                }
              >
                <Image
                  src={IconService.markProcessed}
                  alt=""
                  onClick={() => onActiveInactiveUser(row, false)}
                  className="cursor-pointer"
                />
              </Tooltip>
            ) : (
              <Tooltip
                arrow
                placement="top"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "#ffffff",
                      border: 1,
                      borderColor: "#ffffff",
                      fontSize: "14px",
                      fontWeight: 400,
                      fontFamily: "Satoshi-Regular",
                      color: "#524587",
                      boxShadow: " 0px 0px 4px 1px #DFDFFF",
                      minWidth: "max-content",
                      "& .MuiTooltip-arrow": {
                        color: "#ffffff",
                      },
                    },
                  },
                }}
                title={
                  <div className="flex flex-row items-center gap-1">
                    Inactive
                  </div>
                }
              >
                <BlockRoundedIcon
                  onClick={() => onActiveInactiveUser(row, true)}
                  className="cursor-pointer"
                />
              </Tooltip>
            )}
          </div>
        );
      },
    },
  ];

  const { userList } = useSelector(({ UserSlice }) => UserSlice);

  // const dateTimeFilter = (item: DateFiler[]) => {
  //   let updateData = {
  //     from_date: moment(item[0].startDate).format("YYYY-M-D"),
  //     to_date: moment(item[0].endDate).format("YYYY-M-D"),
  //   };
  //   if (updateData.from_date && updateData.to_date) {
  //     dispatch(setParamsData(`?from_date=${updateData.from_date}&to_date=${updateData.to_date}&`))

  //     dispatch(
  //       UserList(`?from_date=${updateData.from_date}&to_date=${updateData.to_date}`)
  //     );
  //   }
  // };


  useEffect(() => {
    const params: any = new URLSearchParams(searchParams);
    let combinedParams = "";
    for (const [key, value] of params) {
      if (value != "") {
        combinedParams += `&${value.slice(1)}`;
      } else {
        combinedParams += `${value.slice(1)}`;
      }
    }

    combinedParams = combinedParams.slice(1);
    if (combinedParams) {
      dispatch(UserList(`?${combinedParams}`));
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col gap-y-4 ">
      <Typography className="ml-10 " variant="h5" color="text.secondary">
        Users List
      </Typography>
      <CtxProvider>
        <TableHeader
          data={userList ? userList?.items : []}
          isAddButton={true}
          tableHeader={[
            {
              Header: "User Name",
              accessor: "username",
            },

            {
              Header: "Email",
              accessor: "email",
            },
            // {
            //   Header: "Team",
            //   accessor: "teams",
            //   sort: "true",
            // },
            // {
            //   Header: "Groups",
            //   accessor: "groups",
            //   sort: "true",
            // },
            {
              Header: "Created On",
              accessor: "created_on",
              Cell: (column) => {
                return (
                  <>
                    {column?.value ? (
                      <>
                        <div>{column.value.date}</div>
                        <div>{column.value.time}</div>
                      </>
                    ) : (
                      "-"
                    )}
                  </>
                );
              },
            },
          ]}
        />
        <Table
          columns={columns}
          data={userList ? userList?.items : []}
          isCheckbox={true}
          pagination={true}
          dataPage={userList?.meta}
          dispatchFunction={(e: number) => UserList(e)}
        />
      </CtxProvider>
    </div>
  );
};

export default User_table;
