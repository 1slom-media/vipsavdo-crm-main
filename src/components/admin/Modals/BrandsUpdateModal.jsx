import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, IconButton, Typography, styled } from "@mui/material";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "components/icons/CloseIcon";
import TextInput from "components/general/Inputs/TextField";
import { StyledEditeBtn } from "../TableRows/ProductsRow";
import EditIcon from "components/icons/EditIcon";
import { Field, getFormValues, reduxForm } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import useAlert from "hooks/useAlert";
import { useRouter } from "next/router";
import {
  getFeaturesList,
  updateFeature,
} from "../../../redux-store/admin/features/features.slice";
import { getBrands, updateBrands } from "redux-store/brands/brands.slice";
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

const StyledFileButton = styled(Box)(({ theme }) => ({
  padding: "20px",
  borderRadius: "50%",
  backgroundColor: theme.palette.background.lightBlue,
  border: `2px dashed ${theme.palette.blue[100]}`,
  marginBottom: "10px",
  display: "flex",
  cursor: "pointer",
}));

function BrandsUpdateModal({ handleSubmit }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.brands.isLoading);
  const { page, limit } = router?.query;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callback = () => dispatch(getBrands());

  const handleUpdate = (values) => {
    const data = new FormData();
    data.append("title", values.title);

    dispatch(
      updateBrands({
        uid: values?.uid,
        data: { title: values?.title },
        token,
        alert,
        callback,
        close: () => setOpen(!open),
      })
    );
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
          <Grid container flexDirection="column">
            <Grid item xs={12}>
              <StyledBox>
                <Typography variant="h6" color="secondary.100">
                  {t("UpdateBrand")}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </StyledBox>
            </Grid>

            <Grid item pt={2}>
              <Box pl={5} pr={5} mb={2}>
                <Field
                  component={TextInput}
                  label={t("BrandName")}
                  placeholder={t("BrandName")}
                  size="small"
                  name="title"
                />
              </Box>
            </Grid>
            <Grid item xs={12} pb={2}>
              <Box textAlign="center">
                <LoadingButton
                  onClick={handleSubmit(handleUpdate)}
                  variant="contained"
                  color="blue"
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

BrandsUpdateModal.propTypes = {
  error: PropTypes.string,
  handleUpdate: PropTypes.func,
};

BrandsUpdateModal.defaultProps = {
  error: "",
  handleUpdate: () => {},
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
  form: "update_brands_form",
  validate,
  enableReinitialize: true,
})(BrandsUpdateModal);
