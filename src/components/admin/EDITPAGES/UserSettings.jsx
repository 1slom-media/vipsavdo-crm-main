import { Button, Divider, Stack, Typography } from "@mui/material";
import AdminCard from "components/general/Cards/AdminCard";
import {
  StyledIconBox,
  StyledSettingsBox,
} from "components/admin/Dashboard/styledComponents";
import UserProfileFilled from "components/icons/UserProfileFilled";
import EarphoneFilled from "components/icons/EarphoneFilled";
import SwitchInput from "components/general/Inputs/Switch";
import { LoadingButton } from "@mui/lab";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import useAlert from "hooks/useAlert";
import {
  getCustomerProfile,
  updateCustomer,
} from "redux-store/admin/customers/customers.slice";
import { Field, reduxForm } from "redux-form";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const SettingsForm = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.customers.isUpdateLoading);

  const callBack = (success, _) => {
    if (success) alert.success({ title: "Parol", text: "O'zgartirildi!" });
    else alert.error({ title: "Parol", text: "Xatolik yuz berdi" });
    dispatch(
      getCustomerProfile({
        token,

        params: {
          userId: router.query.id,
          type: "info",
        },
      })
    );
  };

  const handleEditUserData = (values) => {
    dispatch(
      updateCustomer({
        token,

        alert,
        params: {
          id: router.query.id,
          data: {
            isAdmin: values.isAdmin?.toString(),
            isOperator: values.isOperator?.toString(),
          },
          callBack,
        },
      })
    );
  };

  return (
    <AdminCard sx={{ p: 0 }}>
      <Stack px={3} py={2}>
        <Typography variant="body2" color="text.legacy">
          {t("Sozlamalar")}
        </Typography>
      </Stack>
      <Stack px={3}>
        <StyledSettingsBox>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" justifyContent="flex-start" gap="10px">
              <StyledIconBox>
                <UserProfileFilled />
              </StyledIconBox>
              <Stack direction="column" justifyContent="space-between">
                <Typography variant="body2" color="text.legacy">
                  {t("MakeUserAdmin")}
                </Typography>
                <Typography variant="body1" color="text.legacy">
                  {t("MakeUserAdminDesc")}
                </Typography>
              </Stack>
            </Stack>
            <Field component={SwitchInput} name="isAdmin" />
          </Stack>
          <Divider sx={{ my: 2 }} />
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" justifyContent="flex-start" gap="10px">
              <StyledIconBox>
                <EarphoneFilled />
              </StyledIconBox>
              <Stack direction="column" justifyContent="space-between">
                <Typography variant="body2" color="text.legacy">
                  {t("MakeOpeAdmin")}
                </Typography>
                <Typography variant="body1" color="text.legacy">
                  {t("MakeOpeAdminDesc")}
                </Typography>
              </Stack>
            </Stack>
            <Field component={SwitchInput} name="isOperator" />
          </Stack>
        </StyledSettingsBox>
      </Stack>
      <Stack px={3} mt={2} mb={3}>
        <Stack
          mt={2}
          direction="row"
          alignItems="center"
          gap="20px"
          justifyContent="flex-end"
        >
          <Button variant="contained" color="disabled">
            {t("Cancel").toUpperCase()}
          </Button>
          <LoadingButton
            onClick={handleSubmit(handleEditUserData)}
            variant="contained"
            loading={isLoading}
          >
            {t("Save")}
          </LoadingButton>
        </Stack>
      </Stack>
    </AdminCard>
  );
};

export default reduxForm({
  form: "user_settings",
  enableReinitialize: true,
})(SettingsForm);
