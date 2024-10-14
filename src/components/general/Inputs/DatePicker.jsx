import * as React from "react";
import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { InputAdornment } from "@mui/material";
import PropTypes from "prop-types";

const CustomDatePicker = ({ label, input, classes, meta, ...custom }) => {
  return (
    <MobileDatePicker
      error={meta?.touched ? meta.invalid : null}
      fullWidth
      helperText={meta?.touched ? meta.error : null}
      label={label}
      placeholder={label}
      {...input}
      {...custom}
      inputFormat="dd-MMMM, yyy, HH:mm"
      cancelLabel="Bekor qilish"
      renderInput={(params) => (
        <TextField
          {...params}
          size="small"
          label={label}
          fullWidth
          InputProps={{
            endAdornment: (
              <InputAdornment>
                <CalendarMonthIcon />
              </InputAdornment>
            ),
          }}
        />
      )}
    />
  );
};

export default CustomDatePicker;

CustomDatePicker.propTypes = {
  props: {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    custom: PropTypes.object,
  },
};

CustomDatePicker.defaultProps = {
  props: {
    label: "",
    placeholder: "",
    classes: {},
    meta: {},
    input: {},
    custom: {},
  },
};
