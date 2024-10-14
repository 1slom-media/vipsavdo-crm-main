import { Box, Button, Grid, Stack } from "@mui/material";
import React from "react";
import BotCard from "../BotCard/BotCard";
import { Field, reduxForm } from "redux-form";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "hooks/useAlert";
import { updateSmsSettings } from "redux-store/admin/message/sms.slice";
import { useTranslation } from "react-i18next";

const SmsSettings = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.sms.isUpdateLoading);

  const handleUpdate = (values) => {
    dispatch(updateSmsSettings({ token, alert, data: values }));
  };
  return (
    <Stack>
      <Grid container>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("SmsProdNew")}
            title={t("ForNewOrders")}
            name="new_order"
            sms
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("SmsProdReady")}
            title={t("ForNewOrdersReady")}
            name="ready"
            sms
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("SmsProdOnway")}
            title={t("ForNewOrdersOnway")}
            name="onway"
            sms
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("SmsProdDelivered")}
            title={t("ForNewOrdersDelivered")}
            name="delivered"
            sms
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("SmsProdRejected")}
            title={t("ForNewOrdersRejected")}
            name="canceled"
            sms
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("SmsProdPending")}
            title={t("ForNewOrdersPending")}
            name="pending"
            sms
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("SmsProdHold")}
            title={t("ForNewOrdersHold")}
            name="hold"
            sms
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("SmsProdArchiv")}
            title={t("ForNewOrdersArchiv")}
            name="archived"
            sms
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("SmsProdUpd")}
            title={t("ProdUpd")}
            name="update_product"
            sms
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("SmsProdAdd")}
            title={t("ProdAdd")}
            name="new_product"
            sms
          />
        </Grid>
        <Grid xs={12} sm={4} md={2.5}>
          <Field
            component={BotCard}
            text={t("SmsProdPaymentInfo")}
            title={t("PaymentReq")}
            name="payment"
            sms
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
  form: "sms_settings",
  validate,
  enableReinitialize: true,
})(SmsSettings);
