import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Grid, IconButton, Input, Typography, styled } from "@mui/material";
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
import { useTranslation } from "react-i18next";
import GeneralNameInput from "components/general/Inputs/GeneralNameInput";
import { useState } from "react";

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

function FeatureUpdateModal({ name, uid }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.categoryUpdate.isLoading);
  const { page, limit } = router?.query;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callback = () => {
    dispatch(getFeaturesList({ token, params: {} }));
  };

  // update name
  const [uz, setUz] = useState(name?.uz);
  const [ru, setRu] = useState(name?.ru);
  const [en, setEn] = useState(name?.en);

  const handleUzChange = (e) => {
    setUz(e.target.value);
  };

  const handleRuChange = (e) => {
    setRu(e.target.value);
  };

  const handleEnChange = (e) => {
    setEn(e.target.value);
  };

  const handleUpdate = () => {
    const updatedTitle = {
      uz: uz !== name.uz ? uz : name.uz,
      ru: ru !== name.ru ? ru : name.ru,
      en: en !== name.en ? en : name.en,
    };

    dispatch(
      updateFeature({
        uid: uid,
        data: { title: updatedTitle },
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
                  {t("UpdateFeat")}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </StyledBox>
            </Grid>

            <Grid item pt={2}>
              <Box pl={5} pr={5} mb={2}>
                <Input
                  onChange={handleUzChange}
                  value={uz}
                  fullWidth
                  inputComponent={TextInput}
                  disableUnderline
                  label="Hususiyat nomi o'zbek tilida"
                  placeholder={"Hususiyat nomi o'zbek tilida"}
                  name="title"
                />
              </Box>
              <Box pl={5} pr={5} mb={2}>
                <Input
                  onChange={handleRuChange}
                  value={ru}
                  fullWidth
                  inputComponent={TextInput}
                  disableUnderline
                  label="Название объекта на русском языке."
                  placeholder={"Название объекта на русском языке."}
                  name="title"
                />
              </Box>
              <Box pl={5} pr={5} mb={2}>
                <Input
                  onChange={handleEnChange}
                  value={en}
                  fullWidth
                  inputComponent={TextInput}
                  disableUnderline
                  label="The property name is in English"
                  placeholder={"The property name is in English"}
                  name="title"
                />
              </Box>
            </Grid>
            <Grid item xs={12} pb={2}>
              <Box textAlign="center">
                <LoadingButton
                  onClick={handleUpdate}
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

export default FeatureUpdateModal;
