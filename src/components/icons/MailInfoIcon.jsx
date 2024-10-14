import { SvgIcon } from "@mui/material";
import React from "react";

const MailInfoIcon = (props) => {
  return (
    <SvgIcon
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.66659 6.66675H33.3333C35.1666 6.66675 36.6666 8.16675 36.6666 10.0001V30.0001C36.6666 31.8334 35.1666 33.3334 33.3333 33.3334H6.66659C4.83325 33.3334 3.33325 31.8334 3.33325 30.0001V10.0001C3.33325 8.16675 4.83325 6.66675 6.66659 6.66675Z"
        stroke="#0085FF"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M36.6666 10L19.9999 21.6667L3.33325 10"
        stroke="#0085FF"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
};

export default MailInfoIcon;
