import { Typography, Box, TextField, MenuItem } from "@mui/material";
import EditGroupTable from "./EditGroupTable";
import styles from "../Group.module.css";

const VerificationList = () => {
  return (
    <div className={`flex flex-col gap-y-4 edit-group-table`}>
      {/* <div className="flex justify-between items-center">
        <Typography variant="h5" color="text.secondary">
          Verification List
        </Typography>
        <TextField
          className={`color rounded-lg h-12 ${styles.selectUrl} w-1/5`}
          fullWidth
          defaultValue={"Selected"}
          select
        >
          <MenuItem value={"Selected"}>Select URL Name</MenuItem>
          <MenuItem value={"Name"}>Name</MenuItem>
        </TextField>
      </div> */}
      <EditGroupTable />
    </div>
  );
};

export default VerificationList;
