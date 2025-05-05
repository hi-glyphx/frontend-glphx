// ----------------------------------------------------------------------

import { TypographyOptions } from "@mui/material/styles/createTypography";

export function remToPx(value: string) {
  return Math.round(parseFloat(value) * 16);
}

export function pxToRem(value: number) {
  return `${value / 16}rem`;
}
interface fontsize {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
}
export function responsiveFontSizes({ xs, sm, md, lg, xl }: fontsize) {
  return {
    "@media (min-width:400px)": {
      fontSize: pxToRem(xs),
    },
    "@media (min-width:600px)": {
      fontSize: pxToRem(sm),
    },
    "@media (min-width:900px)": {
      fontSize: pxToRem(md),
    },
    "@media (min-width:1200px)": {
      fontSize: pxToRem(lg),
    },
    "@media (min-width:1500px)": {
      fontSize: pxToRem(xl),
    },
  };
}

// ----------------------------------------------------------------------

const FONT_PRIMARY = "Satoshi, Satoshi-Medium"; // Google Font
// const FONT_PRIMARY = "CircularStd, sans-serif"; // Local Font

const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  letterSpacing: 0.8,
  h1: {
    fontFamily: "Satoshi-Medium",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "normal",
    fontSize: pxToRem(36),
    ...responsiveFontSizes({ xs: 10, sm: 20, md: 25, lg: 32, xl: 36 }),
  },
  h2: {
    fontFamily: "Satoshi-Medium",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "36px",
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ xs: 15, sm: 15, md: 18, lg: 21, xl: 24 }),
  },
  h3: {
    fontFamily: "Satoshi-Medium",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "36px",
    fontSize: pxToRem(24),
    ...responsiveFontSizes({ xs: 15, sm: 15, md: 18, lg: 21, xl: 24 }),
  },
  h4: {
    fontFamily: "Satoshi-Medium",
    fontWeight: 700,
    lineHeight: "24px",
    fontSize: pxToRem(20),
    ...responsiveFontSizes({ xs: 18, sm: 18, md: 18, lg: 21, xl: 24 }),
  },
  h5: {
    fontFamily: "Satoshi-Medium",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "24px",
    fontSize: pxToRem(20),
    // ...responsiveFontSizes({ xs: 15, sm: 15, md: 10, lg: 20 }),
  },
  h6: {
    fontFamily: "Satoshi-Regular",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "24px",
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 12, sm: 14, md: 14, lg: 16, xl: 16 }),
  },
  subtitle1: {
    fontFamily: "Satoshi-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "24px",
    fontSize: pxToRem(16),
    ...responsiveFontSizes({ xs: 12, sm: 12, md: 12, lg: 14, xl: 16 }),
  },
  subtitle2: {
    fontFamily: "Satoshi-Regular",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "20px",
    fontSize: pxToRem(14),
    ...responsiveFontSizes({ xs: 12, sm: 12, md: 12, lg: 14, xl: 14 }),
  },

  body1: {
    fontFamily: "Satoshi-Medium",
    fontStyle: "normal",
    fontWeight: 500,
    lineHeight: "20px",
    fontSize: pxToRem(14),
  },
  body2: {
    fontFamily: "Satoshi-Medium",
    fontStyle: "normal",
    fontWeight: 700,
    lineHeight: "20px",
    fontSize: pxToRem(14),
  },
  caption: {
    lineHeight: 1.5,
    fontSize: pxToRem(12),
  },
  overline: {
    fontWeight: 700,
    lineHeight: 1.5,
    fontSize: pxToRem(12),
    textTransform: "uppercase",
  },
  button: {
    fontWeight: 700,
    lineHeight: 24 / 14,
    letterSpacing: 0.8,
    fontSize: pxToRem(14),
    textTransform: "capitalize",
  },
};

export default typography as TypographyOptions;
