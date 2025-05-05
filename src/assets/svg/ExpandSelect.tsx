import IconService from "@/utils/Icons";
import React from "react";

const ExpandSelect = (props: any) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
    >
      <path
        d="M5 8L10 13L15 8"
        stroke="url(#paint0_linear_1114_46776)"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_1114_46776"
          x1="5"
          y1="13"
          x2="15.5873"
          y2="10.6796"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#7260ED" />
          <stop offset="1" stopColor="#AA7CEE" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default ExpandSelect;
