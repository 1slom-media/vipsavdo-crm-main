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
import { createSubCategoryList } from "redux-store/admin/category/createSub.slice";
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

function ChildeCategoryAdd({ id, handleSubmit, callback }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.subCategoryCreate.isLoading);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const data = useSelector((state) =>
    getFormValues("add_childeCategory_form")(state)
  );

  const handleAdd = (values) => {
    const data = new FormData();
    data.append("title", JSON.stringify(values.title));
    data.append("avatar", values.avatar);

    dispatch(
      createSubCategoryList({
        data,
        token,
        callback,
        alert,
        uid: id,
        close: () => {
          setOpen(false);
          dispatch(reset("add_childeCategory_form"));
        },
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ cursor: "pointer", height: "100%" }}
        onClick={handleOpen}
      >
        <AddIcon style={{ color: "#7E92A2" }} />
      </Box>
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
                <Typography fontSize="14px" color="secondary.100">
                  {t("AddChildToSubCat")}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </StyledBox>
            </Grid>

            <Grid item pt={2}>
              <Box pl={5} pr={5} mb={2}>
                <Field
                  component={GeneralNameInput}
                  label_uz={t("CatNameUz")}
                  label_ru={t("CatNameRu")}
                  label_en={t("CatNameEn")}
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

ChildeCategoryAdd.propTypes = {
  error: PropTypes.string,
  handleDelete: PropTypes.func,
};

ChildeCategoryAdd.defaultProps = {
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
  form: "add_childeCategory_form",
  validate,
  enableReinitialize: true,
  initialValues: {
    avatar: null,
    title: "",
  },
})(ChildeCategoryAdd);
