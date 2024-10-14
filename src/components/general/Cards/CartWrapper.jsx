import { Box, styled } from "@mui/material";
import React from "react";

const StyledCartBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.background.lightGray}`,
  backgroundColor: theme.palette.warning.contrastText,
  borderRadius: "5px",
}));

const CartWrapper = ({ children }) => {
  return <StyledCartBox p={{ xs: 1, md: 2 }}>{children}</StyledCartBox>;
};

export default CartWrapper;
