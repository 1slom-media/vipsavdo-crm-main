import * as React from "react";
import TextField from "@mui/material/TextField";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { InputAdornment } from "@mui/material";
import PropTypes from "prop-types";

const CalendarInput = ({ label, input, classes, meta, ...custom }) => {
  return (
    <MobileDatePicker
      error={meta.touched ? meta.invalid : null}
      fullWidth
      helperText={meta.touched ? meta.error : null}
      label={label}
      placeholder={label}
      {...input}
      {...custom}
      inputFormat="dd-MMMM, yyy, HH:mm"
      cancelLabel="Bekor qilish"
      sx={{
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: "#2D3748 !important",
        },
        label: {
          color: "#A0AEC0 !important",
        },
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          size="small"
          label={label}
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

export default CalendarInput;

CalendarInput.propTypes = {
  props: {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    custom: PropTypes.object,
  },
};

CalendarInput.defaultProps = {
  props: {
    label: "",
    placeholder: "",
    classes: {},
    meta: {},
    input: {},
    custom: {},
  },
};
