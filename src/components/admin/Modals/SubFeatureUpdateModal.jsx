import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  styled,
  TextField,
  Input,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "components/icons/CloseIcon";
import { useSelector, useDispatch } from "react-redux";
import useAlert from "hooks/useAlert";
import { Hue, useColor } from "react-color-palette";
import { useRouter } from "next/router";
import EditIcon from "@mui/icons-material/Edit";
import "react-color-palette/css";
import { Stack } from "@mui/joy";
import Switch from "@mui/material/Switch";
import {
  getSubFeaturesList,
  updateSubFeature,
} from "../../../redux-store/admin/subfeatures/subfeatures.slice";
import { Field } from "formik";
import { useState } from "react";
import TextInput from "components/general/Inputs/TextField";
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

const SubFeaturesUpdateModal = ({ uid, name, view }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const router = useRouter();
  const [color, setColor] = useColor("rgb(86 30 203)");
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.features.isCreateLoading);
  const featureId = parseInt(router.query.id);

  const [isColor, setIsColor] = React.useState(false);
  const [data, setData] = React.useState({ view: view || "" });

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const callback = () => {
    dispatch(getSubFeaturesList({ token, params: { id: featureId } }));
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

  const dispatchUpdateSubFeature = () => {
    const updatedTitle = {
      uz: uz !== name.uz ? uz : name.uz,
      ru: ru !== name.ru ? ru : name.ru,
      en: en !== name.en ? en : name.en,
    };
    dispatch(
      updateSubFeature({
        uid: uid,
        data: { title: updatedTitle, value: data.view },
        token,
        alert,
        callback,
        close: () => setOpen(false),
      })
    );
  };

  return (
    <div>
      <Button
        onClick={handleOpen}
        startIcon={<EditIcon />}
        variant="text"
        color={"warning"}
        size="medium"
      ></Button>
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
                  {t("ChangeChildFeat")}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </StyledBox>
            </Grid>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Grid container gap="20px" mb={3.1}>
                  <Grid item xs={12}>
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
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>
                  <Grid item xs={12}>
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
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} style={{ marginTop: "1rem" }}>
                <TextField
                  onChange={(e) => setData({ ...data, view: e.target.value })}
                  value={data.view}
                  disabled={isColor}
                  fullWidth
                  id="view"
                  name="view"
                  label={t("AmountFeat")}
                  placeholder={t("AmountFeat")}
                  size={"small"}
                  type="text"
                />
              </Grid>

              {/*if typeOf feature is COLOR*/}
              {isColor ? (
                <Grid item xs={12} style={{ marginTop: "1rem" }}>
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
                      setData({ ...data, view: value.hex });
                    }}
                  />
                </Grid>
              ) : null}

              <Grid item xs={12} style={{ marginTop: "1rem" }}>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap={"10px"}
                >
                  <Switch
                    defaultChecked={false}
                    onChange={(e) => setIsColor(e.target.checked)}
                  />
                  <Typography>{t("ColorFeatType")}</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Box textAlign="center" my={2}>
                  <LoadingButton
                    onClick={() => dispatchUpdateSubFeature()}
                    variant="contained"
                    type={"submit"}
                    loading={isLoading}
                  >
                    {t("Save")}
                  </LoadingButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default SubFeaturesUpdateModal;
