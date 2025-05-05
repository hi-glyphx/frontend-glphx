import { EditList, Groupslist } from "@/Store/Reducer/GroupsSlice";
import { AppDispatch } from "@/Store/Store";
import GroupsTable from "@/views/Groups/GroupsTable";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Groups() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(Groupslist(`?format=json`))
  }, [dispatch]);

  return (
    <div className="flex flex-col gap-y-4 groups-page">
      <Typography variant="h5" color="text.secondary" className="ps-10">
        List of Groups
      </Typography>
      <GroupsTable />
    </div>
  );
}
