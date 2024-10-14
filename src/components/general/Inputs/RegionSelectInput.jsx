import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import { regions } from "utils/regions";

export default function SelectInput({
  label,
  input,
  classes,
  meta,
  ...custom
}) {
  return (
    <FormControl fullWidth>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        error={meta.touched ? meta.invalid : null}
        fullWidth
        helperText={meta.touched ? meta.error : null}
        label={label}
        placeholder={label}
        {...input}
        {...custom}
      >
        {regions.map((reg) => (
          <MenuItem key={reg.id} value={reg.id}>
            {reg.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectInput.propTypes = {
  props: {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    custom: PropTypes.object,
  },
};

SelectInput.defaultProps = {
  props: {
    label: "",
    placeholder: "Malumotni kiritng",
    classes: {},
    meta: {},
    input: {},
    custom: {},
  },
};
