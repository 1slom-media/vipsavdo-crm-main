import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Button, Grid, IconButton, Typography, styled } from "@mui/material";
import PropTypes from "prop-types";
import { LoadingButton } from "@mui/lab";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "components/icons/CloseIcon";
import TextInput from "components/general/Inputs/TextField";
import { Field, reduxForm, change, formValueSelector, reset } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import useAlert from "hooks/useAlert";
import SwitchInput from "components/general/Inputs/Switch";
import { Stack } from "@mui/system";
import { Hue, useColor } from "react-color-palette";
import "react-color-palette/css";
import {
  createSubFeatureList,
  getSubFeaturesList,
} from "../../../redux-store/admin/subfeatures/subfeatures.slice";
import { useRouter } from "next/router";
import { boolean } from "yup/lib/locale";
import GeneralNameInput from "components/general/Inputs/GeneralNameInput";
import { useTranslation } from "react-i18next";
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
  padding: "20px",
};

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid",
  borderColor: theme.palette.background.card,
  padding: "7px 0",
}));

function SubFeaturesAddModal({ handleSubmit }) {
  const dispatch = useDispatch();
  const alert = useAlert();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.features.isCreateLoading);
  const selector = formValueSelector("add_sub_feature_form");
  const isColorActive = useSelector((state) => selector(state, "isColor"));
  const featureId = parseInt(router.query.id);

  const [color, setColor] = useColor("rgb(86 30 203)");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callback = () => {
    dispatch(getSubFeaturesList({ token, params: { id: router.query.id } }));
  };

  const handleAdd = (values) => {
    dispatch(
      createSubFeatureList({
        data: {
          title: values.title,
          charId: parseInt(router.query.id),
          value: values.view,
          isColor: values.isColor,
          sku: values.title["en"].toUpperCase(),
        },
        token,
        alert,
        callback,
        close: () => {
          setOpen(false);
          dispatch(reset("add_sub_feature_form"));
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
        size="large"
      >
        {t("AddChildFeat")}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <StyledBox>
                <Typography variant="h6" color="secondary.100">
                  {t("AddChildFeat")}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </StyledBox>
            </Grid>

            <Grid item xs={12}>
              <Field
                component={GeneralNameInput}
                label_uz={"Hususiyat nomi o'zbek tilida"}
                label_ru={"Название объекта на русском языке."}
                label_en={"The property name is in English"}
                name="title"
              />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={TextInput}
                label={t("AmountFeat")}
                placeholder={t("AmountFeat")}
                size="small"
                name="view"
                fullWidth
                disabled={isColorActive}
              />
            </Grid>
            {isColorActive ? (
              <Grid item xs={12}>
                <Box
                  sx={{
                    width: "100%",
                    height: "40px",
                    borderRadius: "5px",
                    backgroundColor: color?.hex,
                    mb: 3,
                  }}
                />
                <Hue
                  color={color}
                  onChange={(value) => {
                    setColor(value);
                    dispatch(
                      change("add_sub_feature_form", "view", value?.hex)
                    );
                  }}
                />
              </Grid>
            ) : null}
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="flex-start"
                gap={"10px"}
              >
                <Field
                  component={SwitchInput}
                  label={t("AmountFeat")}
                  placeholder={t("AmountFeat")}
                  name="isColor"
                  fullWidth
                />
                <Typography>{t("ColorFeatType")}</Typography>
              </Stack>
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

SubFeaturesAddModal.propTypes = {
  error: PropTypes.string,
  handleDelete: PropTypes.func,
};

SubFeaturesAddModal.defaultProps = {
  error: "",
  handleDelete: () => {},
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["title", "view"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "add_sub_feature_form",
  validate,
  enableReinitialize: true,
  initialValues: {
    view: "",
    featureId: 0,
    title: "",
  },
})(SubFeaturesAddModal);
