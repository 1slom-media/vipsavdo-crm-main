import { SvgIcon } from "@mui/material";
import React from "react";

const DeleteXOutlined = (props) => {
  return (
    <SvgIcon
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.5 5.5L5.5 16.5"
        stroke="#E20029"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M5.5 5.5L16.5 16.5"
        stroke="#E20029"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
};

export default DeleteXOutlined;
