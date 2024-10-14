import { MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const SubCategorySelect = ({ value, values, id, input, meta, ...props }) => {
  useEffect(() => {
    if (id) {
    }
  }, [id]);

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
      {[].map((item) => (
        <MenuItem key={item.uid} value={item.uid?.toString()}>
          {item.label}
        </MenuItem>
      ))}
    </TextField>
  );
};

SubCategorySelect.defaultProps = {
  input: {
    onChange: () => {},
  },
  meta: {},
};

export default SubCategorySelect;
