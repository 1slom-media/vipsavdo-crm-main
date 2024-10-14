import Modal from "@mui/material/Modal";
import { Box, Button, Grid, IconButton, styled } from "@mui/material";
import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { Field, reduxForm } from "redux-form";
import TextInput from "components/general/Inputs/TextField";
import { PhotoCamera } from "@mui/icons-material";
import StyledTextArea from "components/general/Inputs/StyledTextArea";
import { useTranslation } from "react-i18next";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  borderRadius: "50%",
  background: theme.palette.background.gray,
  position: "absolute",
  right: "20px",
  top: "10px",
  "&:hover": {
    background: theme.palette.background.gray,
  },
}));

const PhotIconButton = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  background: theme.palette.primary.main,
  padding: "10px 12px 5px 12px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "40px",
  height: " 40px",
  "&:hover": {
    background: theme.palette.primary.main,
  },

  [theme.breakpoints.down("md")]: {
    padding: "6px 5px 0px 5px",
    right: "auto",
    left: "60px",
  },
}));

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

const StyledImg = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

const StyledImgBox = styled(Box)(({ theme }) => ({
  width: "140px",
  height: "120px",
  border: "1px dashed rgba(0,0,0, 0.5)",
  margin: "15px auto",
}));

const Page = ({ id }) => {
  const { t } = useTranslation("translation");
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  return (
    <div>
      <StyledIconButton aria-label="edit" onClick={handleOpen}>
        <EditIcon />
      </StyledIconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <StyledImgBox>
            <StyledImg component="img" src={file} alt="carusel-img" />
          </StyledImgBox>
          <Grid container mb={2} spacing={2} p={2}>
            <Grid item xs={12} sm={12} md={12}>
              <Field
                component={TextInput}
                size="small"
                name="name"
                placeholder={t("EnterTitle")}
                label={t("EnterTitle")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Field
                component={StyledTextArea}
                size="small"
                name="text"
                placeholder={t("TypeProdDesc")}
                label={t("TypeProdDesc")}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={9}>
              <Field
                component={TextInput}
                size="small"
                name="link"
                placeholder={t("LinkForBannerProd")}
                label={t("LinkForBannerProd")}
              />
            </Grid>
            <Grid item xs={12} lg={3}>
              <Box position="relative">
                <PhotIconButton component="label" htmlFor="avatar">
                  <PhotoCamera
                    sx={{ position: "relative", top: "-3px", color: "#fff" }}
                  />
                </PhotIconButton>
                <Box
                  component="input"
                  type="file"
                  accept="image/*"
                  name="images"
                  id="avatar"
                  display="none"
                  onChange={(e) => handleChange(e)}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button color="primary" variant="contained">
                {t("Save")}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["title", "text", "images", "link"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "banner_settings_form",
  validate,
  enableReinitialize: true,
})(Page);
