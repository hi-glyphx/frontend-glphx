import React, { useState } from "react";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type Props = {
  label: string;
  value: string;
  name: string;
  setValue?: any;
  onBlur?: any;
  helperText?: string | false | undefined;
};

const PasswordField = ({
  label,
  value,
  name,
  setValue,
  onBlur,
  helperText,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <FormControl className="flex flex-col   w-full" variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">{label}</InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        // defaultValue="Hello World"
        name={name}
        value={showPassword ? value : value?.replace(/./g, "*")}
        type={"text"}
        onBlur={onBlur}
        onChange={(e) => {
          if (!showPassword) {
            if (e.target.value.length > value.length + 1) {
              setValue(name, e.target.value);
            } else {
              let newPass = "";
              if (e.target.value.length > value.length) {
                newPass = value + e.target.value.at(-1);
              } else {
                newPass = value.substring(0, value.length - 1);
              }
              setValue(name, newPass);
            }
          } else {
            setValue(name, e.target.value);
          }
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              size="small"
              style={{ marginTop: "15px" }}
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? (
                <VisibilityIcon
                  style={{
                    color: "#524587",
                    width: "24px",
                    height: "24px",
                    flexShrink: "0",
                  }}
                />
              ) : (
                <VisibilityOffIcon
                  style={{
                    color: "#524587",
                    width: "24px",
                    height: "24px",
                    flexShrink: "0",
                  }}
                />
              )}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {!!helperText && (
        <FormHelperText error id="username-error">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default PasswordField;

