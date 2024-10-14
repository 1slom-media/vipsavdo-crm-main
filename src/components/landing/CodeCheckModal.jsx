import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextInput from "components/general/Inputs/TextField";
import { Field, reduxForm } from "redux-form";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { getSiteData } from "redux-store/settings/settings.slice";
import { useDispatch } from "react-redux";
import useAlert from "hooks/useAlert";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Link from "next/link";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "95%", sm: 400 },
  bgcolor: "background.paper",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

function CodeCheckModal({ handleSubmit }) {
  const router = useRouter();
  const alert = useAlert();
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const isLoading = useSelector((state) => state.settings.isLoading);

  const callback = () => {
    router.push("/authentication/login");
  };

  const handlePhoneCheck = (values) => {
    dispatch(getSiteData({ ...values, alert, callback }));
  };

  return (
    <div>
      <Link href="/authentication/login">
        <Button color="primary" variant="contained">
          TIZIMGA KIRISH
        </Button>
      </Link>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            align="center"
            variant="body2"
            color="text.legacy"
            component="h2"
          >
            Kirish uchun sayitingizga tegishli bo`lgan maxsus ID ni
            kiriting!
          </Typography>
          <Stack my={2} gap={2}>
            <Stack>
              <Field
                component={TextInput}
                name="code"
                placeholder="Sayt ID raqami..."
                size="small"
              />
            </Stack>
            <Stack>
              <LoadingButton
                onClick={handleSubmit(handlePhoneCheck)}
                variant="contained"
                color="primary"
                loading={isLoading}
              >
                TEKSHIRISH
              </LoadingButton>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
}

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["code"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "code_check_form",
  validate,
  enableReinitialize: true,
})(CodeCheckModal);
