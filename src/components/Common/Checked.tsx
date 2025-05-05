import { SvgIcon } from "@mui/material";
import React from "react";

const Checked = () => {
  return (
    <SvgIcon className="checkbox-svg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8.78567 0.024769C6.78148 0.164476 5.15414 0.54647 3.78059 1.19968C2.36072 1.8749 1.58088 2.63224 1.03353 3.86751C-0.326077 6.93587 -0.347787 12.909 0.98927 16.0332C1.61092 17.486 2.61095 18.3682 4.44762 19.0844C7.55164 20.2948 12.3863 20.3065 15.4776 19.111C17.2665 18.4192 18.2649 17.5991 18.8705 16.324C20.1487 13.633 20.3775 8.50523 19.3748 5.01958C19.0345 3.83647 18.6084 3.02908 17.9987 2.41192C16.8062 1.20474 14.6629 0.378859 11.9863 0.0950439C11.1599 0.0073992 9.54398 -0.0280426 8.78567 0.024769Z"
          fill="url(#paint0_linear_972_29203)"
        />
        <path
          d="M5 9.23077L7.67709 12.5943C7.8535 12.8159 8.17862 12.8469 8.3937 12.6625L15 7"
          stroke="white"
          strokeWidth="2"
          stroke-linecap="round"
        />
        <defs>
          <linearGradient
            id="paint0_linear_972_29203"
            x1="1.49012e-07"
            y1="20"
            x2="21.9283"
            y2="17.597"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#7260ED" />
            <stop offset="1" stop-color="#AA7CEE" />
          </linearGradient>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default Checked;
