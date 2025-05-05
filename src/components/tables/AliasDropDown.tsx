import {
  getAllAlias,
  setAlises,
  setSelectedAliasKey,
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
  isFolderTyle?: boolean;
}

const AliasDropdown = ({ data, isFolderTyle }: TYPE) => {
  const dispatch = useDispatch<AppDispatch>();
  const { selected, selectedAlias, selectedAliasKey } = useSelector(
    ({ CaseSlice }) => CaseSlice
  );

  const handleChange = (event: SelectChangeEvent) => {
    const matchingKey = Object.keys(selectedAliasKey).find(
      (key) => selectedAliasKey[key] === event.target.value
    );

    if (matchingKey && isFolderTyle) {
      // Show an alert here
      alert("Same Alias cannot be selected again");
    } else {
      dispatch(setAlises(event.target.value));

      dispatch(
        setSelectedAliasKey({
          id: data.id,
          value: event.target.value,
        })
      );
    }
  };

  // useEffect(() => {
  //   if (selected[data.id]) {
  //     dispatch(getAllAlias({ id: selected[data?.id], project: data.id }));
  //   }
  // }, [dispatch, selected[data.id]]);

  return (
    <div className="project-dropdown">
      <FormControl
        sx={{
          minWidth: 120,
          "&.MuiFormControl-root": {
            border: `${!selectedAliasKey[data.id] && ""}`,
            borderRadius: "4px",
          },
        }}
        className="m-0 h-7 p-1"
      >
        <Select
          value={selectedAliasKey[data.id] ?? ""}
          onChange={handleChange}
          displayEmpty
          className="font-normal"
          id="my-simple-select"
          style={{ minWidth: "150px" }}
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
          {selectedAlias[data.id] &&
            selectedAlias[data.id].length &&
            selectedAlias[data.id]?.map((item: any, index: number) => (
              <MenuItem value={item.id} key={index}>
                {item.alias}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
};
export default AliasDropdown;
