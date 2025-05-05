import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { Typography } from "@mui/material";
import IconService from "@/utils/Icons";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 298,
    },
  },
};

const names = [
  "Info Template",
  "Invoice 1",
  "Health Insurance ",
  "Car Insurance ",
  "Insurance ",
];

export default function ProjectSelection() {
  const [personName, setPersonName] = React.useState<string>();

  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(value);
  };
  return (
    <div>
      <FormControl sx={{ width: 300 }} className="h-12">
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={personName}
          onChange={handleChange}
          displayEmpty
          renderValue={(selected) => {
            if (!selected) {
              return (
                <Typography
                  variant="subtitle2"
                  color="secondary.light"
                  className="p-0"
                >
                  Select Project
                </Typography>
              );
            }

            return selected;
          }}
          MenuProps={MenuProps}
          variant="outlined"
          inputProps={{ "aria-label": "Without label" }}
        >
          {names.map((name, index) => (
            <MenuItem key={index} value={name}>
              <Checkbox
                checked={personName == name}
                checkedIcon={<img src={IconService.checkedIcon.src} />}
                icon={
                  <img src={IconService.Uncheck.src} alt="Uncheck icon"></img>
                }
              />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
