import { Grid, Stack, Typography } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import TextInput from "components/general/Inputs/TextField";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { updateAppSettings } from "redux-store/settings/settings.slice";
import useAlert from "hooks/useAlert";
import PhoneMaskInput from "components/general/Inputs/PhoneMaskInput";
import { useTranslation } from "react-i18next";

const GeneralSettings = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.settings.isAppLoading);

  const addSettings = (values) => {
    dispatch(updateAppSettings({ token, alert, data: values }));
  };

  return (
    <Stack mt={2}>
      <Grid container spacing={{ xs: 2, md: 4 }}>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{t("ProdPriceSettings")}</Typography>
          <Stack mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  size="small"
                  placeholder={t("CheapProdPrice")}
                  name="cheapProPrice"
                  label={t("CheapProdPrice")}
                  type="number"
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{t("OperSysSettings")}</Typography>
          <Stack mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  size="small"
                  placeholder={t("OperPayment")}
                  name="paymentOperator"
                  label={t("OperPayment")}
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  size="small"
                  placeholder={t("OperFeePayment")}
                  name="penaltyOperator"
                  label={t("OperFeePayment")}
                  type="number"
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{t("AdSettings")}</Typography>
          <Stack mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  size="small"
                  placeholder={t("AdExpense")}
                  name="ad_price"
                  label={t("AdExpense")}
                  type="number"
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{t("ServiceSettings")}</Typography>
          <Stack mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  size="small"
                  name="address"
                  placeholder={t("MarketAddress")}
                  label={t("MarketAddress")}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={PhoneMaskInput}
                  size="small"
                  name="sitePhone"
                  placeholder={t("SitePhoneNumber")}
                  label={t("SitePhoneNumber")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={PhoneMaskInput}
                  size="small"
                  name="supportPhone"
                  placeholder={t("CallCenterPhone")}
                  label={t("CallCenterPhone")}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h6">{t("SocialLinks")}</Typography>
          <Stack mt={2}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  size="small"
                  name="tgLink"
                  placeholder={t("TelegramChannelLink")}
                  label={t("TelegramChannelLink")}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  size="small"
                  name="marketingGroup"
                  placeholder={t("TelegramGroupLink")}
                  label={t("TelegramGroupLink")}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  size="small"
                  name="instaLink"
                  placeholder={t("")}
                  label={t("InstagramLink")}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  size="small"
                  name="fbLink"
                  placeholder={t("FacebookLink")}
                  label={t("FacebookLink")}
                />
              </Grid>
            </Grid>
          </Stack>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end" gap={2} my={2}>
            <LoadingButton
              onClick={handleSubmit(addSettings)}
              variant="contained"
              color="primary"
              loading={isLoading}
            >
              {t("Save")}
            </LoadingButton>
          </Stack>
        </Grid>
      </Grid>
    </Stack>
  );
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["sitePhone"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "general_settings_form",
  validate,
  enableReinitialize: true,
})(GeneralSettings);
