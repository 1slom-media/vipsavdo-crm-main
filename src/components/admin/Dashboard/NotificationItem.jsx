import { Avatar, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import React from "react";
import { StyledTypographyWrapText } from "./styledComponents";

const NotificationItem = ({ img, name, isAdmin, msg, createdAt }) => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Stack
        direction="row"
        justifyContent="flex-start"
        gap="10px"
        width="100%"
      >
        <Avatar
          src={img}
          sx={{ width: "32px", height: "32px", m: "0 !important" }}
        >
          A
        </Avatar>
        <Stack direction="column" flex="1 1 auto">
          <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            gap="5px"
          >
            <Typography variant="body1" color="text.legacy">
              {name}
            </Typography>
            <Typography variant="body1" color="text.light">
              {"("} {isAdmin ? "ADMIN" : "FOYDALANUVCHI"} {")"}
            </Typography>
          </Stack>
          <StyledTypographyWrapText variant="string" color="text.lightMain">
            {msg}
          </StyledTypographyWrapText>
          <Typography variant="string" color="text.light">
            {format(new Date(createdAt), "dd-MM-yyyy HH:MM", { locale: uz })}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default NotificationItem;
