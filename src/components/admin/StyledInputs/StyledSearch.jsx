import { Search } from "@mui/icons-material";
import {
  InputBase,
  styled,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import React from "react"; // styled component

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  height: 40,
  fontSize: 14,
  width: 330,
  fontWeight: 500,
  padding: "1.3rem 1rem",
  borderRadius: "10px",
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

const StyledSearch = ({ loading, ...rest }) => {
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
      endAdornment={
        <InputAdornment>
          {loading ? <CircularProgress size={20} /> : null}
        </InputAdornment>
      }
      {...rest}
    />
  );
};

export default StyledSearch;
