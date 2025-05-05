import {
  getAllAlias,
  getAllProjects,
  setSelected,
} from "@/Store/Reducer/CaseSlice";
import { AppDispatch } from "@/Store/Store";
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface TYPE {
  data: any;
  isDisabled?: boolean;
}

const ProjectDropdown = ({ data, isDisabled }: TYPE) => {
  const dispatch = useDispatch<AppDispatch>();
  const { allProjects, selected } = useSelector(({ CaseSlice }) => CaseSlice);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(
      setSelected({
        id: data.id,
        value: event.target.value,
      })
    );
    if (data.status && data.status.length) {
      data.status.map((item) => {
        dispatch(
          setSelected({
            id: item.id,
            value: event.target.value,
          })
        );

        dispatch(getAllAlias({ id: event.target.value, project: item.id }));
      });
    }

    dispatch(getAllAlias({ id: event.target.value, project: data.id }));
  };

  return (
    <div className="project-dropdown">
      <FormControl
        disabled={isDisabled}
        sx={{
          minWidth: 120,
          "&.MuiFormControl-root": {
            border: !selected[data.id] ? "1px solid red" : null,
            borderRadius: "4px",
          },
        }}
        className="m-0 h-7 p-1"
      >
        <Select
          value={selected[data.id] ?? ""}
          onChange={handleChange}
          displayEmpty
          className="font-normal"
          id="my-simple-select"
          style={{ width: "150px", whiteSpace: "normal" }}
          inputProps={{
            "aria-label": "Without label",

            MenuProps: {
              MenuListProps: {
                sx: {
                  color: "var(--primary-font-1, #524587)",
                  fontSize: "14px",
                  fontFamily: "Satoshi",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "20px",
                },
              },
              FormControl: {
                padding: "0px",
              },
            },
            // readOnly: data.type == "folder" && data.status ? true : false,
          }}
          sx={{
            "& #my-simple-select": {
              fontWeight: 400,
            },
            "& .MuiOutlinedInput-notchedOutline": {
              border: 0,
            },
            "&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                border: "none",
              },
            "&.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input.MuiOutlinedInput-input":
              {
                padding: "0px ",
              },
          }}
        >
          {allProjects &&
            allProjects?.map((item: any, index: number) => (
              <MenuItem value={item.id} key={index}>
                {item.name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default ProjectDropdown;
