import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Grid,
  IconButton,
  Typography,
  styled,
  Input,
  Avatar,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "components/icons/CloseIcon";
import TextInput from "components/general/Inputs/TextField";
import { StyledEditeBtn } from "../TableRows/ProductsRow";
import EditIcon from "components/icons/EditIcon";
import { useSelector, useDispatch } from "react-redux";
import { updateAdminCategory } from "redux-store/admin/category/update.slice";
import useAlert from "hooks/useAlert";
import { getOneCategoryAction } from "redux-store/admin/category/get.slice";
import { useRouter } from "next/router";
import { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { reset } from "redux-form";

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

const CategoryUpdateModal = ({ avatar, uid, label }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);

  const [uz, setUz] = useState(label?.uz);
  const [ru, setRu] = useState(label?.ru);
  const [en, setEn] = useState(label?.en);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [sendImg, setSendImg] = useState(avatar || null);
  const [name, setName] = useState(label || "");

  const callback = () => {
    if (router?.query?.id) {
      dispatch(
        getOneCategoryAction({
          uid: router?.query?.id,
          token,
        })
      );
    }
  };

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
      uz: uz !== label.uz ? uz : label.uz,
      ru: ru !== label.ru ? ru : label.ru,
      en: en !== label.en ? en : label.en,
    };
    const data = new FormData();
    data.append("title", JSON.stringify(updatedTitle));
    dispatch(
      updateAdminCategory({
        uid: uid,
        data,
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
                  {t("UpdateCategory")}
                </Typography>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </StyledBox>
            </Grid>

            <Grid item pt={2}>
              <Grid container gap="30px" px={2} mb={2}>
                <Grid item xs={12}>
                  <Input
                    onChange={handleUzChange}
                    value={uz}
                    fullWidth
                    inputComponent={TextInput}
                    disableUnderline
                    label={t("CatNameUz")}
                    placeholder={t("CatNameUz")}
                    size="small"
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
                    label={t("CatNameRu")}
                    placeholder={t("CatNameRu")}
                    size="small"
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
                    label={t("CatNameEn")}
                    placeholder={t("CatNameEn")}
                    size="small"
                    name="title"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} pb={2} sx={{ marginTop: "1rem" }}>
              <Box textAlign="center">
                <LoadingButton
                  onClick={() => handleUpdate()}
                  variant="contained"
                  color="blue"
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
};

export default CategoryUpdateModal;
