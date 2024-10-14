import { SvgIcon } from "@mui/material";
import React from "react";

const WalletOutlined = (props) => {
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
        d="M7.5 2C4.73858 2 2.5 4.23858 2.5 7V17C2.5 19.7614 4.73858 22 7.5 22H17.5C20.2614 22 22.5 19.7614 22.5 17V11C22.5 8.55154 20.7401 6.51413 18.4162 6.08376C17.9859 3.75992 15.9485 2 13.5 2H7.5ZM16.3293 6C15.9175 4.83481 14.8062 4 13.5 4H7.5C6.19378 4 5.08254 4.83481 4.67071 6H16.3293ZM4.5 17V8H17.5C19.1569 8 20.5 9.34315 20.5 11V17C20.5 18.6569 19.1569 20 17.5 20H7.5C5.84315 20 4.5 18.6569 4.5 17Z"
        fill={props?.color ? props?.color : "#7E92A2"}
      />
      <path
        d="M18.5 14C18.5 15.1046 17.6046 16 16.5 16C15.3954 16 14.5 15.1046 14.5 14C14.5 12.8954 15.3954 12 16.5 12C17.6046 12 18.5 12.8954 18.5 14Z"
        fill={props?.color ? props?.color : "#7E92A2"}
      />
    </SvgIcon>
  );
};

export default WalletOutlined;
