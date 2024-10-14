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
import { createAdminCategory } from "redux-store/admin/category/create.slice";
import useAlert from "hooks/useAlert";
import { getAllCategoryAction } from "redux-store/admin/category/get.slice";
import GeneralNameInput from "components/general/Inputs/GeneralNameInput";
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

function ConfirmAddModal({ handleSubmit, props }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const isLoading = useSelector((state) => state.categoryCreate.isLoading);
  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) =>
    getFormValues("add_category_form")(state)
  );

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callback = () => {
    dispatch(getAllCategoryAction({ token, params: {} }));
    dispatch(reset("add_category_form"));
  };

  const handleAdd = (values) => {
    const data = new FormData();
    data.append("title", JSON.stringify(values.title));
    data.append("avatar", values.avatar);

    dispatch(
      createAdminCategory({
        data,
        token,
        callback,
        alert,
        close: () => setOpen(false),
      })
    );
  };

  const ImagePicker = ({ input }) => {
    return (
      <Box>
        <input
          accept="image/*"
          onChange={(e) => input.onChange(e.target.files[0])}
          id="upload-company-logo"
          type="file"
          hidden
        />
        <StyledFileButton component="label" htmlFor="upload-company-logo">
          <Box
            component="img"
            src={
              data?.avatar
                ? URL.createObjectURL(data.avatar)
                : "/assets/media/photos.png"
            }
            width="80px"
            height="80px"
            sx={{ borderRadius: "50%" }}
          />
        </StyledFileButton>
      </Box>
    );
  };
  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<AddIcon />}
        variant="contained"
        color="primary"
        size="medium"
        {...props}
      >
        {t("AddCategory")}
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
                  {t("AddCategory")}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </StyledBox>
            </Grid>

            <Grid item pt={2}>
              <Box
                alignItems="center"
                display="flex"
                justifyContent="center"
                flexDirection="column"
              >
                <Field component={ImagePicker} name="avatar" />
                <Typography
                  align="center"
                  variant="string"
                  color="text.legacy"
                  mb={2}
                >
                  {t("UploadDes")}
                  <br /> {t("UploadDesc")}
                </Typography>
              </Box>

              <Box pl={5} pr={5} mb={2}>
                <Field
                  component={GeneralNameInput}
                  label_uz={"Kategoriya nomi o'zbek tilida"}
                  label_ru={"Название категории на русском языке."}
                  label_en={"The category name is in English"}
                  name="title"
                />
              </Box>
            </Grid>
            <Grid item xs={12} pb={2}>
              <Box textAlign="center">
                <LoadingButton
                  onClick={handleSubmit(handleAdd)}
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

ConfirmAddModal.propTypes = {
  error: PropTypes.string,
  handleDelete: PropTypes.func,
};

ConfirmAddModal.defaultProps = {
  error: "",
  handleDelete: () => {},
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["avatar", "title"];
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
})(ConfirmAddModal);
