import { SvgIcon } from "@mui/material";
import React from "react";

const CancelOutlined = (props) => {
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
        d="M26.9167 4.75H7.08333C5.51853 4.75 4.25 6.01853 4.25 7.58333V27.4167C4.25 28.9815 5.51853 30.25 7.08333 30.25H26.9167C28.4815 30.25 29.75 28.9815 29.75 27.4167V7.58333C29.75 6.01853 28.4815 4.75 26.9167 4.75Z"
        stroke="#DB0027"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12.75 13.25L21.25 21.75"
        stroke="#DB0027"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M21.25 13.25L12.75 21.75"
        stroke="#DB0027"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
};

export default CancelOutlined;
