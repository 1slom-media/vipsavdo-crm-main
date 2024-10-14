import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { Grid, Stack } from "@mui/material";
import { Field, reduxForm } from "redux-form";
import PasswordInputField from "components/general/Inputs/PasswordInput";
import PhoneMaskInput from "components/general/Inputs/PhoneMaskInput";
import TextInput from "components/general/Inputs/TextField";
import { LoadingButton } from "@mui/lab";
import { useSelector, useDispatch } from "react-redux";
import useAlert from "hooks/useAlert";
import { addOperator } from "redux-store/admin/operators/operator.slice";
import SelectInput from "components/general/Inputs/RegionSelectInput";
import { t } from "i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

function AddOpertaorModal({ handleSubmit, page }) {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { isAddLoading } = useSelector((state) => state.customers);
  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callBack = () => {
    dispatch(
      getCustomersList({
        token,

        params: { page, limit: 7, filter: "" },
      })
    );
    handleClose();
  };

  const handleAddOperator = (values) => {
    const data = { ...values };
    const phone = data["phone"];
    const region = data["region"];
    data["region"] = toString(region);
    data["phone"] = `+${phone?.replace(/\D/g, "")}`;
    dispatch(addOperator({ values: data, token, alert, callBack }));
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        size="large"
      >
        {t("AddOper")}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align="center"
            my={2}
            color="text.legacy"
          >
            {t("AddOper")}
          </Typography>
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  placeholder={t("Name")}
                  name="name"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={PhoneMaskInput}
                  placeholder={t("PhoneNumber")}
                  name="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={SelectInput}
                  placeholder={t("Viloyati")}
                  name="region"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextInput}
                  placeholder={t("Login")}
                  name="username"
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={PasswordInputField}
                  placeholder={t("Password")}
                  name="password"
                />
              </Grid>
              <Grid item xs={12}>
                <Stack>
                  <LoadingButton
                    onClick={handleSubmit(handleAddOperator)}
                    loading={isAddLoading}
                    variant="contained"
                  >
                    {t("Add")}
                  </LoadingButton>
                </Stack>
              </Grid>
            </Grid>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}
const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["phone", "password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "add_operator_form",
  validate,
  enableReinitialize: true,
})(AddOpertaorModal);
