import { Button, Divider, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import {
  getNotificationByDay,
  getTodaysNotifications,
  getYesterdaysNotifications,
} from "utils/helpers";
import NotificationItem from "./NotificationItem";
import { useTranslation } from "react-i18next";

const NotificationWrapper = ({ data }) => {
  const router = useRouter();
  const { t } = useTranslation("translation");

  const todays = getTodaysNotifications(data);
  const yesterdays = getYesterdaysNotifications(data);
  const byDate = getNotificationByDay(data);

  return (
    <Stack direction="column">
      <Stack direction="row">
        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          {t("Today")}
        </Typography>
      </Stack>
      {todays?.map((item) => (
        <NotificationItem key={item.createdAt} {...item} />
      ))}
      <Divider sx={{ my: 1 }} />
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {t("Yesterday")}
      </Typography>
      {yesterdays?.map((item) => (
        <NotificationItem key={item.createdAt} {...item} />
      ))}
      <Divider sx={{ my: 1 }} />

      <Button
        color="info"
        variant="outlined"
        sx={{ mt: 1 }}
        onClick={() => router.push("/admin/notifications")}
      >
        {t("ViewAll")}
      </Button>
    </Stack>
  );
};

export default NotificationWrapper;
