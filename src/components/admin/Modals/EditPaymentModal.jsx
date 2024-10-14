import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import EditIcon from "components/icons/EditIcon";
import { StyledEditeBtn } from "../TableRows/ItemCategoriesRow";
import { Button, Grid, Stack } from "@mui/material";
import PaymentSelectInput from "components/general/Inputs/PaymentSelect";
import StyledTextArea from "components/general/Inputs/StyledTextArea";
import { useSelector, useDispatch } from "react-redux";
import useAlert from "hooks/useAlert";
import { updatePayment } from "redux-store/admin/payment/payment.slice";
import { LoadingButton } from "@mui/lab";
import { getPaymentsList } from "redux-store/admin/payment/payment.slice";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

function PaymentUpdateModal({ initialValues }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const isUpdateLoading = useSelector((state) => state.payment.isUpdateLoading);
  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [formValues, setValues] = React.useState({
    status: initialValues?.status,
    message: initialValues?.message,
    paymentId: initialValues?.paymentId,
  });

  const callback = () => {
    dispatch(
      getPaymentsList({
        token,
        params: { page: 1, filter: "", limit: 8 },
      })
    );
  };

  const handleSubmitForm = () => {
    if (initialValues?.status === formValues?.status) {
      alert.error({ title: "Ooops", text: "Xech narsa o'zgarmadi!" });
    } else {
      dispatch(
        updatePayment({
          token,

          data: formValues,
          alert,
          handleClose,
          callback,
        })
      );
    }
  };

  return (
    <div>
      <StyledEditeBtn onClick={handleOpen}>
        <EditIcon />
      </StyledEditeBtn>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            align="center"
            id="modal-modal-title"
            variant="body2"
            component="h2"
            color="text.legacy"
          >
            {t("EditPaymentReq")}
          </Typography>
          <Stack mt={2}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <PaymentSelectInput
                  input={{
                    value: formValues?.status,
                    onChange: (val) =>
                      setValues((prev) => ({
                        ...prev,
                        status: val?.target?.value,
                      })),
                  }}
                  fullWidth
                  size="small"
                  name="status"
                  isUpdate
                />
              </Grid>
              <Grid item xs={12}>
                <StyledTextArea
                  input={{
                    value: formValues?.message,
                    onChange: (val) =>
                      setValues((prev) => ({
                        ...prev,
                        message: val?.target?.value,
                      })),
                  }}
                  fullWidth
                  size="small"
                  name="message"
                  label={t("TypeReasonForChanState")}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Button
                    onClick={handleClose}
                    variant="contained"
                    color="disabled"
                  >
                    {t("Cancel")}
                  </Button>
                  <LoadingButton
                    loading={isUpdateLoading}
                    onClick={handleSubmitForm}
                    variant="contained"
                  >
                    {t("Confirm")}
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

export default PaymentUpdateModal;
