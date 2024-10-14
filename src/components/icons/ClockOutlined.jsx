import { SvgIcon } from "@mui/material";
import React from "react";

const ClockOutlined = (props) => {
  return (
    <SvgIcon
      width="34"
      height="35"
      viewBox="0 0 34 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 31.6666C24.824 31.6666 31.1666 25.324 31.1666 17.4999C31.1666 9.67588 24.824 3.33325 17 3.33325C9.17595 3.33325 2.83331 9.67588 2.83331 17.4999C2.83331 25.324 9.17595 31.6666 17 31.6666Z"
        stroke="#E9D100"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M17 9V17.5L22.6667 20.3333"
        stroke="#E9D100"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
};

export default ClockOutlined;
