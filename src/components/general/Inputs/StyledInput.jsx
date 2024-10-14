import { InputBase, styled } from "@mui/material";
import React from "react"; // styled component
import PropTypes from "prop-types";

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 44,
  fontSize: 14,
  width: "100%",
  fontWeight: 500,
  padding: "0 0 0 1rem",
  borderRadius: "5px",
  color: theme.palette.grey[600],
  backgroundColor: theme.palette.background.gray,
  border: "1px solid",
  borderColor: theme.palette.neutral.main,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
  "::placeholder": {
    color: theme.palette.text.placeholder,
  },
}));

const StyledInput = (props) => {
  return <StyledInputBase {...props} />;
};

StyledInput.propTypes = {
  props: {
    label: PropTypes.string,
    placeholder: PropTypes.string,
    classes: PropTypes.object,
    meta: PropTypes.object,
    input: PropTypes.object,
    custom: PropTypes.object,
  },
};

StyledInput.defaultProps = {
  props: {
    label: "",
    placeholder: "Enter your text",
    classes: {},
    meta: {},
    input: {},
    custom: {},
  },
};

export default StyledInput;
