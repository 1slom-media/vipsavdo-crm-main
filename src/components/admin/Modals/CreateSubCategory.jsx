import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Grid, IconButton, Typography, styled } from "@mui/material";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "components/icons/CloseIcon";
import { Field, reduxForm, getFormValues } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import useAlert from "hooks/useAlert";
import { createSubCategoryList } from "redux-store/admin/category/createSub.slice";
import GeneralNameInput from "components/general/Inputs/GeneralNameInput";
import { t } from "i18next";
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

function SubCategoryAddModal({ id, handleSubmit, callback }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.subCategoryCreate.isLoading);

  const token = useSelector((state) => state.auth.token);

  const data = useSelector((state) =>
    getFormValues("add_subCategory_form")(state)
  );

  const alert = useAlert();

  const handleAdd = (values) => {
    const data = new FormData();
    data.append("title", JSON.stringify(values.title));
    dispatch(
      createSubCategoryList({
        data,
        token,
        callback,
        alert,
        uid: id,

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
        color="primary"
        size="small"
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

SubCategoryAddModal.propTypes = {
  error: PropTypes.string,
  handleDelete: PropTypes.func,
};

SubCategoryAddModal.defaultProps = {
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
  form: "add_subCategory_form",
  validate,
  enableReinitialize: true,
  initialValues: {
    avatar: null,
    title: "",
  },
})(SubCategoryAddModal);
