import { Box, Grid, Stack, Button } from "@mui/material";
import React from "react";
import BotCard from "../BotCard/BotCard";
import { LoadingButton } from "@mui/lab";
import { reduxForm, Field } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import { updateBotSettings } from "redux-store/admin/message/bot.slice";
import useAlert from "hooks/useAlert";
import { useTranslation } from "react-i18next";

const BotSettings = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.bot.isUpdateLoading);

  const handleUpdate = (values) => {
    dispatch(updateBotSettings({ token, alert, data: values }));
  };

  return (
    <Stack>
      <Grid container>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("ConTelDesc")}
            title={t("ForNewOrders")}
            name="new_order"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("ConTelDescReady")}
            title={t("ForNewOrdersReady")}
            name="ready"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("ConTelDescOnway")}
            title={t("ForNewOrdersOnway")}
            name="onway"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("ConTelDescDelivered")}
            title={t("ForNewOrdersDelivered")}
            name="delivered"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("ConTelDescRejected")}
            title={t("ForNewOrdersRejected")}
            name="canceled"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("ConTelDescPending")}
            title={t("ForNewOrdersRejected")}
            name="pending"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("ConTelDescHold")}
            title={t("ForNewOrdersRejected")}
            name="hold"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("ConTelDescArchiv")}
            title={t("ForNewOrdersRejected")}
            name="archived"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("ProdUpdDesc")}
            title={t("ProdUpd")}
            name="update_product"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("ProdAddDesc")}
            title={t("ProdAdd")}
            name="new_product"
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("PaymentReqDesc")}
            title={t("PaymentReq")}
            name="payment"
          />
        </Grid>
        <Grid xs={12}>
          <Box display="flex" justifyContent="flex-end" gap={5}>
            <Button variant="contained" color="inherit">
              {t("Cancel")}
            </Button>
            <LoadingButton
              onClick={handleSubmit(handleUpdate)}
              variant="contained"
              color="primary"
              loading={isLoading}
            >
              {t("Save")}
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </Stack>
  );
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = [];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "bot_settings",
  validate,
  enableReinitialize: true,
})(BotSettings);
