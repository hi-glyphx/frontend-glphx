import { createTheme } from "@mui/material/styles";
import typography from "./typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import IconService from "@/utils/Icons";
import ExpandSelect from "@/assets/svg/ExpandSelect";

const theme = createTheme({
  palette: {
    primary: {
      main: "#7260ED",
      dark: "#1C1A24",
      light: "#F9F6FF",
    },
    secondary: {
      main: "#AA7CEE",
      light: "#7E75A3",
      dark: "#E7E6F0",
    },
    text: {
      primary: "#9C95BA",
      secondary: "#524587",
      disabled: "",
    },
  },

  typography,
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "text", color: "primary" },
          style: {
            background: `linear-gradient(45deg, #7260ED 0%, #AA7CEE 100%)`,
            color: "#ffffff",
            borderRadius: "0.5rem",
            padding: "20px 24px",
            "@media (max-width: 1660px)": {
              padding: "10px 12px",
              borderRadius: "0.5rem",
            },
          },
        },
        {
          props: { variant: "outlined", color: "secondary" },
          style: {
            background: `linear-gradient(45deg, #7260ED 0%, #AA7CEE 100%)`,
            color: "#ffffff",
            borderRadius: "0.5rem",
          },
        },
        {
          props: { variant: "outlined", color: "primary" },
          style: {
            borderRadius: "0.5rem",
            border: "1px solid #E7E6F0",
          },
        },
      ],
      // styleOverrides: {
      //   root: {
      //     "@media (max-width: 1400px)": {
      //       padding: "10px !important",
      //     },
      //   },
      // },
    },

    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#524587",
          fontSize: " 0.875rem",
          fontFamily: "Satoshi-Medium",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "1.5rem",
          padding: "20px 24px !important",
          "@media (max-width: 1500px)": {
            padding: "15px 24px !important",
            fontSize: "12px  !important",
          },
        },
        root: {
          "& fieldset": {
            padding: "0px 17px !important",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderRadius: "0.5rem",
          fontFamily: "Satoshi-Medium",
          borderColor: "#E7E6F0",
        },
        root: {
          height: "100%",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          height: "100%",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#7E75A3", // Change the value to your desired label color
          left: "9px",
          top: "0px",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          color: "#524587",
          fontSize: "14px",
          fontFamily: "Satoshi-Regular",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "20px",
          borderRadius: 0,
        },
        outlined: {
          padding: 0,
        },
      },
      defaultProps: {
        IconComponent: ExpandSelect,
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        colorPrimary: {},
        root: {
          borderRadius: "50px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          marginRight: "0px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
        },
      },
    },
    MuiImageListItem: {
      styleOverrides: {
        img: {
          height: "153px",
          "@media (max-width: 1500px)": {
            height: "100px",
          },
        },
      },
    },
    MuiImageListItemBar: {
      styleOverrides: {
        titleWrap: {
          padding: "8px 0 0 0",
          color: "#524587",
          fontSize: "16px",
          fontFamily: "Satoshi",
          fontStyle: "normal",
          fontWeight: 700,
          lineHeight: "24px",
        },
      },
    },

    MuiAutocomplete: {
      styleOverrides: {
        input: {
          height: "100%",
          padding: "0px !important",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          height: "30px",
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        list: {
          ".Mui-selected": {
            fontWeight: "bold",
          },
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderBottom: "1px solid #E7E6F0",
          margin: "0 0.5rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "0.5rem",
          // top: "calc()",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          marginTop: "0.5rem",
        },
      },
    },
  },
});

export default theme;
