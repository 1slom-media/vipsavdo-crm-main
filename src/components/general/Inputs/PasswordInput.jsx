import * as React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import PropTypes from "prop-types";
import TextField from "@mui/material/TextField";

const PasswordInputField = ({ label, input, classes, meta, ...custom }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <TextField
      error={meta.touched ? meta.invalid : null}
      fullWidth
      helperText={meta.touched ? meta.error : null}
      label={label}
      placeholder={label}
      {...input}
      {...custom}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? (
                <VisibilityOff color="primary" />
              ) : (
                <Visibility color="primary" />
              )}
            </IconButton>
          </InputAdornment>
        ),
      }}
      id="standard-adornment-password"
      type={showPassword ? "text" : "password"}
    />
  );
};

PasswordInputField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  classes: PropTypes.object,
  meta: PropTypes.object,
  input: PropTypes.object,
  custom: PropTypes.object,
};

PasswordInputField.defaultProps = {
  label: "",
  placeholder: "",
  classes: {},
  meta: {},
  input: {},
  custom: {},
};

export default PasswordInputField;
