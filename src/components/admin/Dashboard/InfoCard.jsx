import { Box } from "@mui/material";
import React from "react";

const InfoCard = ({ children, color }) => {
  return (
    <Box
      bgcolor={`${color}.100`}
      p={2}
      borderRadius="50%"
      width="55px"
      height="55px"
      mx="auto"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Box>
  );
};

export default InfoCard;
