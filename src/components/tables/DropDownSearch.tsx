import React, { useState } from "react";
import {
  Card,
  Divider,
  FormControl,
  InputAdornment,
  Select,
  SelectChangeEvent,
  TextField,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import IconService from "@/utils/Icons";
import { TableColumn } from "@/shared/config/types";
import { AppDispatch } from "@/Store/Store";
import { useDispatch } from "react-redux";
import { setSearchParams } from "@/Store/Reducer/CommonSlice";

interface TYPE {
  serachFunction?: (e: string) => void;
  columns?: TableColumn[];
}

export default function DropDownSearch({ serachFunction, columns }: TYPE) {
  const [column, setColumn] = useState("Document Name");
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const handleChanges = (event: SelectChangeEvent) => {
    setColumn(event.target.value as string);
  };

  const handleSearch = () => {
    if (searchText) {
      serachFunction?.(`?${column}=${searchText}`);
    } else {
      serachFunction?.("");
    }
  };
  const handleRemove = () => {
    serachFunction?.("");
    setSearchText("");
    dispatch(
      setSearchParams({
        name: "pagination",
        value: "?page=1",
      })
    );
  };

  const handleInputKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };


  return (
    <div className="h-12">
      <Card
        variant="outlined"
        className="flex flex-row h-full items-center gap-2 "
        sx={{
          borderRadius: "8px",
          background: "none",
        }}
      >
        <FormControl fullWidth sx={{ minWidth: 150 }}>
          {/* <InputLabel id="demo-simple-select-label">Select</InputLabel> */}
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={column as string}
            label="Select"
            onChange={handleChanges}
            className="h-12"
            sx={{
              boxShadow: "none",
              border: 0,
              "& fieldset": { border: "none" },
            }}
          >
            {columns?.map((item, index) => (
              <MenuItem key={index} value={item?.accessor}>
                {item?.Header}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Divider orientation="vertical" variant="middle" flexItem />
        <FormControl fullWidth sx={{ minWidth: 150 }}>
          <TextField
            sx={{
              "& fieldset": { border: "none" },
              "& input::placeholder": {
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "20px",
                fontFamily: "Satoshi-Regular",
                color: "#7E75A3",
              },
            }}
            id="outlined-basic"
            variant="outlined"
            className="h-12 "
            placeholder="Search"
            name="case_num"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            onKeyDown={handleInputKeyDown}
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={handleSearch}
                  className="cursor-pointer"
                >
                  <Image
                    src={IconService.SearchIcon}
                    height={20}
                    width={20}
                    alt=""
                  />
                </InputAdornment>
              ),
            }}
          />
        </FormControl>
        {searchText ? (
          <Image
            src={IconService.CloseIcon}
            height={20}
            width={20}
            alt=""
            onClick={() => handleRemove()}
          />
        ) : null}
        <div></div>
      </Card>
    </div>
  );
}
