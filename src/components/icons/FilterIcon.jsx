import { SvgIcon } from "@mui/material";
import React from "react";

const FilterIcon = (props) => {
  return (
    <SvgIcon
      width="23"
      height="21"
      viewBox="0 0 23 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.5 1.5H1.5L9.5 10.96V17.5L13.5 19.5V10.96L21.5 1.5Z"
        stroke="#7897B3"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </SvgIcon>
  );
};

export default FilterIcon;
