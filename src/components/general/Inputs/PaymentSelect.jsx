import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PropTypes from "prop-types";
import { FormLabel } from "@mui/material";

let statusList = [
  {
    _id: "all",
    label: "Barchasi",
  },
  {
    _id: "accepted",
    label: "Qabul qilingan",
  },
  {
    _id: "waiting",
    label: "Kutilmoqda",
  },
  {
    _id: "fulfilled",
    label: "Yakunlangan",
  },
  {
    _id: "rejected",
    label: "Bekor qilingan",
  },
];

const PaymentSelectInput = ({
  label,
  input,
  classes,
  isUpdate,
  meta,
  ...custom
}) => {
  if (isUpdate) {
    statusList = statusList.filter((item) => item._id !== "all");
  }
  return (
    <FormControl fullWidth>
      <FormLabel>{label}</FormLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        error={meta?.touched && meta?.invalid}
        fullWidth
        helperText={meta?.touched && meta?.error}
        label={label}
        placeholder={label}
        {...input}
        {...custom}
      >
        {statusList.map((stat) => (
          <MenuItem key={stat._id} value={stat._id}>
            {stat.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default PaymentSelectInput;

PaymentSelectInput.propTypes = {
  props: {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    custom: PropTypes.object,
  },
};

PaymentSelectInput.defaultProps = {
  props: {
    label: "",
    placeholder: "Enter your text",
    classes: {},
    meta: {},
    input: {},
    custom: {},
  },
};
