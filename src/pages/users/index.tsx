import { Button, Card, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import IconService from "@/utils/Icons";
import User_table from "@/views/Users/user_table";
import { useDispatch, useSelector } from "react-redux";
import { UserList } from "@/Store/Reducer/UserSlice";
import { AppDispatch } from "@/Store/Store";

export default function Users() {

  // const router = useRouter();
  // const dispatch = useDispatch();
  // const { userList } = useSelector(({ UserSlice }) => UserSlice);
  // useEffect(() => {
  //   dispatch(UserList("?page=1"));
  // }, []);

  return (
    <div className="h-full">
      {/* {userList?.items?.length > 0 ? ( */}
        <User_table />
      {/* ) : ( */}
        {/* <Card variant="outlined" className="h-full">
          <div className="flex justify-center h-full items-center flex-col gap-y-10	">
            <Typography variant="h1" color="text.secondary" textAlign="center">
              Create New User{" "}
            </Typography>
            <div className="flex flex-row ... items-center gap-1">
              <div className="flex flex-row ... items-center gap-1">
                <Typography
                  variant="subtitle1"
                  color="secondary.light"
                  textAlign="center"
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt
                </Typography>
                <Image
                  src={IconService.SymbolsHelp}
                  height={15}
                  width={15}
                  alt="image"
                />
              </div>
            </div>

            <Button
              variant="text"
              color="primary"
              className="common-button-padding uppercase"
              onClick={() => {
                router.push("/users/add-user");
              }}
            >
              Create User
            </Button>
          </div>
        </Card>
      )} */}
    </div>
  );
}
