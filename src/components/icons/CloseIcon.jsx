import { SvgIcon } from "@mui/material";
import React from "react";

const CloseIcon = (props) => {
  return (
    <SvgIcon
      width="23"
      height="23"
      viewBox="0 0 23 23"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17 6L6 17"
        stroke="#7897B3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6 6L17 17"
        stroke="#7897B3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
};

export default CloseIcon;
