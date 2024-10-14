import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import * as React from "react";
import InputMask from "react-input-mask";

const PhoneMaskInput = ({ label, input, classes, meta, ...custom }) => {
  return (
    <InputMask
      {...input}
      {...custom}
      mask="+\9\9\8\(99) 999-99-99"
      name="phone"
      type="tel"
    >
      {(props) => (
        <TextField
          {...props}
          error={meta.touched ? meta.invalid : null}
          fullWidth
          helperText={meta.touched ? meta.error : null}
          label={label || "Telefon raqam"}
          placeholder={label}
          type="tel"
          {...input}
          {...custom}
        />
      )}
    </InputMask>
  );
};

PhoneMaskInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
  meta: PropTypes.object,
  input: PropTypes.object,
  custom: PropTypes.object,
};

PhoneMaskInput.defaultProps = {
  label: "",
  placeholder: "",
  classes: {},
  meta: {},
  input: {},
  custom: {},
};

export default PhoneMaskInput;
