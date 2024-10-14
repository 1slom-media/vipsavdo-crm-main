import { Search } from "@mui/icons-material";
import { InputBase, styled } from "@mui/material";
import React from "react"; // styled component

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 40,
  fontSize: 14,
  width: 250,
  fontWeight: 500,
  padding: "1rem",
  borderRadius: "25px",
  color: theme.palette.secondary.main,
  backgroundColor: theme.palette.background.lightGray,
  border: "1px solid",
  borderColor: theme.palette.neutral[1000],
  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
  },
  "::placeholder": {
    color: theme.palette.secondary[100],
  },
}));

const StyledSearchEllipse = (props) => {
  return (
    <StyledInputBase
      startAdornment={
        <Search
          sx={{
            fontSize: 24,
            mr: 1,
          }}
        />
      }
      {...props}
    />
  );
};

export default StyledSearchEllipse;
