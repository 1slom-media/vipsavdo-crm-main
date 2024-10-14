import { MenuItem, TextField } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

const CategorySelect = ({ value, values, input, meta, ...props }) => {
  const categories = useSelector((state) => state.categories.list);
  return (
    <TextField
      value={value}
      onChange={input.onChange}
      defaultValue={input.value}
      fullWidth
      select
      label={props.label}
      helperText={meta.touched && meta.error}
      error={meta.touched && meta.invalid}
      {...props}
    >
      {categories.map((item) => (
        <MenuItem key={item.uid} value={item.uid?.toString()}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

CategorySelect.defaultProps = {
  input: {
    onChange: () => {},
  },
  meta: {},
};

export default CategorySelect;
