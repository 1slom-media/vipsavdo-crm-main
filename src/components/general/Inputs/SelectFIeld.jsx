import { MenuItem, TextField } from "@mui/material";
import React from "react";

const SelectFIeld = ({ value, values, onChange, ...props }) => {
  return (
    <TextField
      value={value}
      onChange={onChange}
      defaultValue={value}
      fullWidth
      select
      label={props.label}
      sx={{ background: "#fff" }}
      {...props}
    >
      {values?.map((item) => (
        <MenuItem key={item?.value} value={item.value}>{item.label}</MenuItem>
      ))}
    </TextField>
  );
};

export default SelectFIeld;
