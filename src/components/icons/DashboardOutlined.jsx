import { SvgIcon } from "@mui/material";
import React from "react";

const DashboardOutlined = (props) => {
  // alert(JSON.stringify(props))
  return (
    <SvgIcon
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.5 2C3.94772 2 3.5 2.44772 3.5 3V13C3.5 13.5523 3.94772 14 4.5 14H10.5C11.0523 14 11.5 13.5523 11.5 13V3C11.5 2.44772 11.0523 2 10.5 2H4.5ZM5.5 12V4H9.5V12H5.5Z"
        fill={props?.color ? props?.color : "#7E92A2"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.5 10C13.9477 10 13.5 10.4477 13.5 11V21C13.5 21.5523 13.9477 22 14.5 22H20.5C21.0523 22 21.5 21.5523 21.5 21V11C21.5 10.4477 21.0523 10 20.5 10H14.5ZM15.5 12H19.5V20H15.5V12Z"
        fill={props?.color ? props?.color : "#7E92A2"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M3.5 17C3.5 16.4477 3.94772 16 4.5 16H10.5C11.0523 16 11.5 16.4477 11.5 17V21C11.5 21.5523 11.0523 22 10.5 22H4.5C3.94772 22 3.5 21.5523 3.5 21V17ZM5.5 18V20H9.5V18H5.5Z"
        fill={props?.color ? props?.color : "#7E92A2"}
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M14.5 2C13.9477 2 13.5 2.44772 13.5 3V7C13.5 7.55228 13.9477 8 14.5 8H20.5C21.0523 8 21.5 7.55228 21.5 7V3C21.5 2.44772 21.0523 2 20.5 2H14.5ZM15.5 6V4H19.5V6H15.5Z"
        fill={props?.color ? props?.color : "#7E92A2"}
      />
    </SvgIcon>
  );
};

export default DashboardOutlined;
