import IconService from "@/utils/Icons";
import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import React from "react";

const GradientCheckbox = ({
  label,
  checked,
}: {
  label: string;
  checked?: boolean;
  toggleCheck?: () => {};
}) => {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={checked ?? false}
          color="primary"
          icon={<img src={IconService.Uncheck.src} alt="Uncheck icon"></img>}
          checkedIcon={
            <img src={IconService.CheckedIcon.src} alt="Checked icon"></img>
          }
        />
      }
      label={
        <Typography variant="subtitle2" color="text.secondary">
          {label}
        </Typography>
      }
    />
  );
};

export default GradientCheckbox;
