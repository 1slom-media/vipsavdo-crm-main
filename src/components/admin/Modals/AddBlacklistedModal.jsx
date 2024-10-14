import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import PhoneMaskInput from "components/general/Inputs/PhoneMaskInput";
import { Field, reduxForm, reset } from "redux-form";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBlackList,
  getBlackList,
} from "redux-store/admin/blacklist/blacklist.slice";
import useAlert from "hooks/useAlert";
import { useTranslation } from "react-i18next";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: 450 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  padding: "20px 50px",
};
const ConfirmPhoneModal = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const { isAddLoading } = useSelector((state) => state.blacklist);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callBack = (status) => {
    if (status == 200 || 201) {
      dispatch(reset("add_to_block_number"));
      dispatch(getBlackList({ token }));
      handleClose();
      alert.success({ title: "Blok", text: "Raqam bloklandi!" });
    } else {
      dispatch(getBlackList({ token }));
      alert.error({ title: "Blok", text: "Noto'gri raqam!" });
    }
  };

  const handleAddNumber = (values) => {
    let phone = values["phone"];
    values["phone"] = `+${phone?.replace(/\D/g, "")}`;
    dispatch(addToBlackList({ token, data: values, callBack }));
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
        {t("AddNumber")}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container flexDirection="column">
            <Typography
              variant="h6"
              color="secondary.100"
              textAlign="center"
              mb={2}
            >
              {t("TypeNumber")}
            </Typography>

            <Grid item xs={12} mb={4}>
              <Field
                component={PhoneMaskInput}
                label={t("TypePhoneNum")}
                name="phone"
                fullWidth
              />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="space-between">
              <Button variant="contained" color="error" onClick={handleClose}>
                {t("Cancel")}
              </Button>
              <LoadingButton
                variant="contained"
                color="primary"
                loading={isAddLoading}
                onClick={handleSubmit(handleAddNumber)}
              >
                {t("Confirm")}
              </LoadingButton>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

ConfirmPhoneModal.propTypes = {
  error: PropTypes.string,
  handleDelete: PropTypes.func,
};

ConfirmPhoneModal.defaultProps = {
  error: "",
  handleDelete: () => {},
};

function validate(props) {
  const errors = {};
  const requiredFields = ["phone"];

  requiredFields.forEach((val) => {
    if (!props[val]) {
      errors[val] = "Ma'lumot kiritilmadi";
    }
  });

  return errors;
}

export default reduxForm({
  form: "add_to_block_number",
  validate,
})(ConfirmPhoneModal);
