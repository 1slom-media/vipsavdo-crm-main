import { Box, Button, Grid, Stack, Typography, styled } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import TextInput from "components/general/Inputs/TextField";
import PhoneMaskInput from "components/general/Inputs/PhoneMaskInput";
import SelectInput from "components/general/Inputs/RegionSelectInput";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import EditIcon from "@mui/icons-material/Edit";
import { updateCustomer } from "redux-store/admin/customers/customers.slice";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import useAlert from "hooks/useAlert";
import { useRouter } from "next/router";
const StyledEditedBox = styled(Box)(({ theme }) => ({
  display: "flex",
  width: "100%",
  gap: "5px",
  justifyContent: "right",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const UserUpdateForm = ({ handleSubmit }) => {
  const { t } = useTranslation("translation");
  const dispatch = useDispatch();
  const isUpdateLoading = useSelector(
    (state) => state.customers.isUpdateLoading
  );
  const alert = useAlert();
  const [edit, setEdit] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();

  const callBack = () => {
    setEdit(false);
  };

  const handleUpdate = (values) => {
    const data = new FormData();
    data.append("name", values.name);
    data.append("region", values.region);
    data.append("telegramID", values.telegramID);

    dispatch(
      updateCustomer({
        token,
        alert,
        params: { data: data, id: router.query.id, callBack },
      })
    );
  };

  const cancelEdit = () => {
    setEdit(false);
  };

  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} container alignItems="center">
          <Grid item md={6}>
            <Typography color="text.legacy" variant="body2">
              {t("PersonalInfo")}
            </Typography>
          </Grid>
          <Grid item md={6} display="flex" justifyContent="right">
            {edit ? (
              <StyledEditedBox>
                <Button
                  color="error"
                  startIcon={<ClearIcon />}
                  variant="contained"
                  style={{ marginRight: "2rem" }}
                  onClick={() => cancelEdit()}
                >
                  {t("Cancel")}
                </Button>
                <LoadingButton
                  onClick={handleSubmit(handleUpdate)}
                  variant="contained"
                  color="blue"
                  loading={isUpdateLoading}
                >
                  {t("Save")}
                </LoadingButton>
              </StyledEditedBox>
            ) : (
              <Button
                onClick={() => setEdit(true)}
                color="success"
                startIcon={<EditIcon />}
                variant="contained"
                sx={{
                  padding: "8px 12px",
                }}
              >
                {t("ChangeProfileInfo")}
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={TextInput}
            placeholder={t("Name")}
            disabled={!edit}
            name="name"
            size="small"
            label={t("Name")}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            disabled
            component={PhoneMaskInput}
            placeholder={t("PhoneNumber")}
            name="phone"
            size="small"
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Field
            disabled={!edit}
            component={TextInput}
            placeholder="Telegram ID"
            name="telegramID"
            size="small"
            label="Telegram ID"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Field
            component={SelectInput}
            name="region"
            size="small"
            disabled={!edit}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

UserUpdateForm.propTypes = {
  error: PropTypes.string,
  handleUpdate: PropTypes.func,
};

UserUpdateForm.defaultProps = {
  error: "",
  handleUpdate: () => {},
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["region", "name", "telegramID"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "user_update_form",
  validate,
  enableReinitialize: true,
})(UserUpdateForm);
