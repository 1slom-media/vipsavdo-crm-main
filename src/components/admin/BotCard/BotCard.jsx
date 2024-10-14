import { Box, Checkbox, styled, Typography } from "@mui/material";
import React from "react";
import AdbIcon from "@mui/icons-material/Adb";
import MarkunreadIcon from "@mui/icons-material/Markunread";

const StyledBoxCard = styled(Box)(({ theme }) => ({
  background: theme.palette.background.main,
  border: `1px solid ${theme.palette.background.card}`,
  margin: "15px 10px",
  borderRadius: "10px",
  overflow: "hidden",
  maxHeight: "350px",
}));

const StyledBoxFirst = styled(Box)(({ theme }) => ({
  background: "rgba(0, 133, 255, 0.1)",
  borderBottom: `1px solid ${theme.palette.background.card}`,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  paddingRight: "15px",
  alignItems: "center",
}));

const BotCard = ({ text, title, sms, input }) => {
  return (
    <StyledBoxCard>
      <StyledBoxFirst>
        <Checkbox
          {...input}
          checked={input.value}
          sx={{
            color: "#112152",
            "&.Mui-checked": {
              color: "#112152",
            },
          }}
          size="small"
        />
        <Box pt="5px">
          {!sms ? (
            <AdbIcon sx={{ color: "#A4C634 !important" }} />
          ) : (
            <MarkunreadIcon sx={{ color: "#A4C634 !important" }} />
          )}
        </Box>
      </StyledBoxFirst>
      <Box
        p={2}
        sx={{
          maxHeight: "300px",
          overflowY: "scroll",
          scrollbarGutter: "none",
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Typography variant="subtitle1" color="text.legacy" mb={1}>
          {title}
        </Typography>
        <Typography variant="string" color="text.legacy">
          {text}
        </Typography>
      </Box>
    </StyledBoxCard>
  );
};

export default BotCard;
