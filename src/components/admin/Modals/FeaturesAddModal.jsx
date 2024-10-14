import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Grid, IconButton, Typography, styled } from "@mui/material";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "components/icons/CloseIcon";
import TextInput from "components/general/Inputs/TextField";
import { Field, reduxForm, getFormValues, reset } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import useAlert from "hooks/useAlert";
import {
  createFeatureList,
  getFeaturesList,
} from "../../../redux-store/admin/features/features.slice";
import GeneralNameInput from "components/general/Inputs/GeneralNameInput";
import { t } from "i18next";
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
};

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid",
  borderColor: theme.palette.background.card,
  padding: "7px 25px",
}));

function FeaturesAddModal({ handleSubmit }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.features.isCreateLoading);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callback = () => {
    dispatch(getFeaturesList({ token, params: {} }));
  };

  const handleAdd = (values) => {
    dispatch(
      createFeatureList({
        data: values,
        token,
        callback,
        alert,
        close: () => {
          setOpen(false);
          dispatch(reset("add_category_form"));
        },
      })
    );
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<AddIcon />}
        variant="contained"
        size="small"
        sx={{
          padding: { xs: "7px 11px", md: "11px 24px" },
        }}
      >
        {t("AddFeature")}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container flexDirection="column">
            <Grid item xs={12}>
              <StyledBox>
                <Typography variant="h6" color="secondary.100">
                  {t("AddFeature")}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </StyledBox>
            </Grid>

            <Grid item pt={2}>
              <Box pl={5} pr={5} mb={2} my={2}>
                <Field
                  component={GeneralNameInput}
                  label_uz={"Hususiyat nomi o'zbek tilida"}
                  label_ru={"Название объекта на русском языке."}
                  label_en={"The property name is in English"}
                  name="title"
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box textAlign="center" my={2}>
                <LoadingButton
                  onClick={handleSubmit(handleAdd)}
                  variant="contained"
                  loading={isLoading}
                >
                  {t("Save")}
                </LoadingButton>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

FeaturesAddModal.propTypes = {
  error: PropTypes.string,
  handleDelete: PropTypes.func,
};

FeaturesAddModal.defaultProps = {
  error: "",
  handleDelete: () => {},
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["title"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "add_category_form",
  validate,
  enableReinitialize: true,
  initialValues: {
    avatar: null,
    title: "",
  },
})(FeaturesAddModal);
