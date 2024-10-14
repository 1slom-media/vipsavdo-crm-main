import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import * as React from "react";
import InputMask from "react-input-mask";

const CardMaskInput = ({ label, input, classes, meta, ...custom }) => {
  return (
    <InputMask
      {...input}
      {...custom}
      mask="9999-9999-9999-9999"
      name="card"
      type="tel"
    >
      {(props) => (
        <TextField
          {...props}
          error={meta.touched ? meta.invalid : null}
          fullWidth
          helperText={meta.touched ? meta.error : null}
          label={label}
          placeholder={label}
          {...input}
          {...custom}
        />
      )}
    </InputMask>
  );
};

CardMaskInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
  meta: PropTypes.object,
  input: PropTypes.object,
  custom: PropTypes.object,
};

CardMaskInput.defaultProps = {
  label: "",
  placeholder: "",
  classes: {},
  meta: {},
  input: {},
  custom: {},
};

export default CardMaskInput;
