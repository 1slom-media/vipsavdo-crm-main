import { Avatar, Box, Button, Grid, Stack, styled } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import TextInput from "components/general/Inputs/TextField";
import PhoneMaskInput from "components/general/Inputs/PhoneMaskInput";
import SelectInput from "components/general/Inputs/RegionSelectInput";
import { LoadingButton } from "@mui/lab";
import PhotoCamera from "components/icons/PhotoCamera";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser, getUser } from "redux-store/user/user.slice";
import useAlert from "hooks/useAlert";
import { useTranslation } from "react-i18next";

const PhotIconButton = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  background: theme.palette.primary.main,
  position: "absolute",
  bottom: "-8px",
  right: "100px",
  padding: "10px 12px 5px 12px",
  cursor: "pointer",
  zIndex: 5,
  border: "3px solid",
  borderColor: theme.palette.background.main,
  "&:hover": {
    background: theme.palette.primary.main,
  },

  [theme.breakpoints.down("md")]: {
    padding: "6px 5px 0px 5px",
    right: "auto",
    left: "60px",
  },
}));
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  height: "150px",
  width: "150px",
  border: "1px solid",
  borderColor: theme.palette.background.dargGray,
  [theme.breakpoints.down("md")]: {
    height: "90px",
    width: "90px",
  },
}));

const AdminSettings = ({ handleSubmit, avatar }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.user.isUpdateLoading);

  const [file, setFile] = useState(null);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const callback = () => dispatch(getUser({ token }));

  const submitUpdate = (values) => {
    const data = new FormData();
    data.append("name", values?.name);
    data.append("username", values?.username);
    data.append("region", values?.region);
    if (values?.avatar !== avatar) {
      data.append("avatar", values?.avatar);
    }
    dispatch(editUser({ token, alert, data, callback }));
  };

  const AdminAvatar = ({ input }) => {
    return (
      <Box position="relative">
        <StyledAvatar src={file ? file : input?.value} />
        <PhotIconButton component="label" htmlFor="avatar">
          <PhotoCamera />
        </PhotIconButton>
        <Box
          component="input"
          type="file"
          accept="image/*"
          name="avatar"
          id="avatar"
          display="none"
          onChange={(e) => {
            handleChange(e);
            input.onChange(e.target.files[0]);
          }}
        />
      </Box>
    );
  };

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={2}>
          <Field component={AdminAvatar} name="avatar" />
        </Grid>
        <Grid item xs={12} lg={9} container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextInput}
              size="small"
              name="name"
              placeholder={t("FullName")}
              label={t("FullName")}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={PhoneMaskInput}
              size="small"
              name="phone"
              placeholder={t("PhoneNumber")}
              label={t("PhoneNumber")}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextInput}
              size="small"
              label={t("Login")}
              name="username"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextInput}
              size="small"
              name="telegramID"
              label="Telegram ID"
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field component={SelectInput} name="region" size="small" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextInput}
              size="small"
              name="paid"
              label={t("PaidAmount")}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextInput}
              size="small"
              name="uid"
              label={t("OneIdNumb")}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextInput}
              size="small"
              name="bitcoin"
              label={t("AmountBTC")}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextInput}
              size="small"
              name="smsCode"
              label={t("LastSMSCode")}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Field
              component={TextInput}
              size="small"
              name="balance"
              label={t("YourBalance")}
              disabled
            />
          </Grid>
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" gap={2} my={2}>
        <Button variant="contained" color="disabled">
          {t("Cancel")}
        </Button>
        <LoadingButton
          onClick={handleSubmit(submitUpdate)}
          variant="contained"
          color="primary"
          loading={isLoading}
        >
          {t("Save")}
        </LoadingButton>
      </Stack>
    </Stack>
  );
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["name"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });

  return errors;
};

export default reduxForm({
  form: "admin_settings_form",
  validate,
  enableReinitialize: true,
})(AdminSettings);
