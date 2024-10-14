import { SvgIcon } from "@mui/material";
import React from "react";

const ImageUpload = (props) => {
  return (
    <SvgIcon
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.75 2.25043H4.25C3.42157 2.25043 2.75 2.922 2.75 3.75043V14.2504C2.75 15.0789 3.42157 15.7504 4.25 15.7504H14.75C15.5784 15.7504 16.25 15.0789 16.25 14.2504V3.75043C16.25 2.922 15.5784 2.25043 14.75 2.25043Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.875 7.50043C7.49632 7.50043 8 6.99675 8 6.37543C8 5.75411 7.49632 5.25043 6.875 5.25043C6.25368 5.25043 5.75 5.75411 5.75 6.37543C5.75 6.99675 6.25368 7.50043 6.875 7.50043Z"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.25 11.2504L12.5 7.50043L4.25 15.7504"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </SvgIcon>
  );
};

export default ImageUpload;
