import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Grid, IconButton, Typography, styled } from "@mui/material";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "components/icons/CloseIcon";
import TextInput from "components/general/Inputs/TextField";
import { Field, reduxForm, getFormValues } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import useAlert from "hooks/useAlert";
import { createBrands, getBrands } from "redux-store/brands/brands.slice";
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

function BrandsAddModal({ handleSubmit }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.brands.isCreateLoading);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callback = () => {
    dispatch(getBrands());
  };

  const handleAdd = (values) => {
    const data = new FormData();
    data.append("title", values.title);
    dispatch(
      createBrands({
        data,
        token,
        alert,
        callback,
        alert,
        close: () => setOpen(false),
      })
    );
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<AddIcon />}
        variant="contained"
        size="large"
        sx={{
          padding: { xs: "7px 11px" },
        }}
      >
        {t("Brand")}
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
                  {t("AddBrand")}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </StyledBox>
            </Grid>

            <Grid item pt={2}>
              <Box pl={5} pr={5} mb={2} my={2}>
                <Field
                  component={TextInput}
                  label={t("BrandName")}
                  placeholder={t("BrandName")}
                  size="small"
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

BrandsAddModal.propTypes = {
  error: PropTypes.string,
  handleDelete: PropTypes.func,
};

BrandsAddModal.defaultProps = {
  error: "",
  handleDelete: () => {},
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["label"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "add_brands_form",
  validate,
  enableReinitialize: true,
  initialValues: {
    avatar: null,
    label: "",
  },
})(BrandsAddModal);
