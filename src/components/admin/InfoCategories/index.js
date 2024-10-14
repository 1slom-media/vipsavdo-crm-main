import { Divider, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import uz from "date-fns/locale/uz";
import { useTranslation } from "react-i18next";

const AdminCategoryView = ({ uid, createdAt, updatedAt, __v }) => {
  const { t } = useTranslation("translation");

  return (
    <Stack width="100%">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
      >
        <Typography variant="subtitle1" color="secondary.100">
          UID
        </Typography>
        <Typography variant="string" color="secondary.100">
          {uid}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
      >
        <Typography variant="subtitle1" color="secondary.100">
          {t("NumberOfUpdates")}
        </Typography>
        <Typography variant="string" color="secondary.100">
          {__v ? __v : t("NotUpdated")}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
      >
        <Typography variant="subtitle1" color="secondary.100">
          {t("Soni")}
        </Typography>
        <Typography variant="string" color="secondary.100">
          20 {t("Dona")}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
      >
        <Typography variant="subtitle1" color="secondary.100">
          {t("CreatedTime")}
        </Typography>
        <Typography variant="string" color="secondary.100">
          {createdAt
            ? format(new Date(createdAt), "dd-MMMM, HH:mm", { locale: uz })
            : null}
        </Typography>
      </Stack>
      <Divider />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        py={1}
      >
        <Typography variant="subtitle1" color="secondary.100">
          {t("UpdatedTime")}
        </Typography>
        <Typography variant="string" color="secondary.100">
          {updatedAt
            ? format(new Date(updatedAt), "dd-MMMM, HH:mm", { locale: uz })
            : null}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default AdminCategoryView;
