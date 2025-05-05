import { EditList, UpdateList } from "@/Store/Reducer/GroupsSlice";
import { AppDispatch } from "@/Store/Store";
import Toaster from "@/components/Common/Toaster";
import VerificationList from "@/views/Groups/EditGroup/VerificationList";
import { Typography, Box, TextField, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function EditGroup() {
  const router: any = useRouter();
  const { id } = router.query;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      dispatch(EditList(id));
    }
  }, [dispatch, id]);
  const { editList } = useSelector(({ GroupsSlice }) => GroupsSlice);

  const onSaveEditGroups = () => {
    try {
      let request: any = {
        apiReqest: {
          action: editList?.action,
          name: editList?.name,
          default_url: editList?.default_url,
          permissions: editList?.permissions,
        },
        id: id,
      };

      dispatch(UpdateList(request)).then((res) => {
        if (res) {
          router.push("/groups");
          Toaster({ customMessage: "Group updated successfully" });
        } else {
          Toaster({ error: true, customMessage: "An error occurred" });
        }
      });
    } catch (error) {
      console.log("Error while updating group", error);
    }
  };

  return (
    <div className="flex flex-col gap-y-6 ">
      <div className="flex flex-col gap-y-12">
        <Typography variant="h5" color="text.secondary">
          Edit Group
        </Typography>
        <div className="flex  w-full gap-x-6">
          <Box className="w-full">
            <TextField
              className="color"
              fullWidth
              label="Group Name"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              value={editList?.name}
              defaultValue={editList?.name}
            >
              {editList?.name}
            </TextField>
          </Box>
          <Box className="w-full">
            <TextField
              className="color"
              fullWidth
              label="Default URL"
              InputLabelProps={{
                shrink: true,
              }}
              value={editList?.default_url}
            >
              {editList?.default_url}
            </TextField>
          </Box>
        </div>
      </div>
      <VerificationList />
      <div
        style={{
          display: "flex",
          alignItems: "end",
          justifyContent: "flex-end",
        }}
      >
        <Box className="flex flex-row justify-end gap-4">
          <Button
            className="text-color btn px-6 py-3  text-base font-bold"
            variant="outlined"
            onClick={() => {
              router.push("/groups");
            }}
          >
            CANCEL
          </Button>
          <Button
            className=" background px-6 py-3 text-base font-bold"
            variant="text"
            color="primary"
            onClick={() => {
              onSaveEditGroups();
            }}
          >
            SUBMIT
          </Button>
        </Box>
      </div>
    </div>
  );
}
