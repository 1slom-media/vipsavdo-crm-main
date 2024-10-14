import { SvgIcon } from "@mui/material";
import React from "react";

const ListingOutlined = (props) => {
  return (
    <SvgIcon
      width="24"
      height="31"
      viewBox="0 0 24 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.75 0.875V30.125H23.25V8.29297L22.9336 7.94141L16.1836 1.19141L15.832 0.875H0.75ZM3 3.125H14.25V9.875H21V27.875H3V3.125ZM16.5 4.74219L19.3828 7.625H16.5V4.74219ZM6.375 12.125V14.375H17.625V12.125H6.375ZM6.375 16.625V18.875H17.625V16.625H6.375ZM6.375 21.125V23.375H17.625V21.125H6.375Z"
        fill={props?.color ? props?.color : "#7E92A2"}
      />
    </SvgIcon>
  );
};

export default ListingOutlined;
