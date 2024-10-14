import { Card } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

const EmptyPageWrapper = ({ children }) => {
  return (
    <Card
      borderRadius="20px"
      sx={{
        minHeight: "73vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Card>
  );
};

export default EmptyPageWrapper;
