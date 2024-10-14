import { Search } from "@mui/icons-material";
import { InputBase, styled } from "@mui/material";
import React from "react"; // styled component

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 40,
  fontSize: 14,
  width: "100%",
  fontWeight: 500,
  padding: "0 1rem",
  borderRadius: "25px",
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.background.gray,
  border: "1px solid",
  borderColor: theme.palette.secondary.main,
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
  "::placeholder": {
    color: theme.palette.text.disabled,
  },
}));

const MobileSearchInput = (props) => {
  return (
    <StyledInputBase
      startAdornment={
        <Search
          sx={{
            fontSize: 19,
            mr: 1,
          }}
        />
      }
      {...props}
    />
  );
};

export default MobileSearchInput;
