import { PhotoCamera } from "@mui/icons-material";
import { Box, Button, Grid, Stack, styled, Typography } from "@mui/material";
import TextInput from "components/general/Inputs/TextField";
import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import StyledTextArea from "components/general/Inputs/StyledTextArea";
import { useTranslation } from "react-i18next";

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
const StyledCaruselDiv = styled(Box)(({ theme }) => ({
  paddingTop: "106px",
  position: "relative",
  width: "100%",
  height: "500px",
  paddingLeft: "100px",
  background: theme.palette.background.lightYellow,
  [theme.breakpoints.down("sm")]: {
    paddingTop: "60px",
    height: "400px",
    "&:before": {
      content: "url(/assets/media/mobileElips.png)",
      width: "162px",
      height: "162px",
    },
  },
}));
const StyledSaleBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "100px",
  top: "50px",
  backgroundImage: "url(/assets/media/saleBgk.png)",
  width: "105px",
  height: "105px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  zIndex: 30,
  [theme.breakpoints.down("sm")]: {
    top: "40px",
    width: "50px",
    height: "50px",
    backgroundSize: "50px 50px",
  },
}));
const StyledImgBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "25px",
  right: "110px",
  zIndex: 19,
  [theme.breakpoints.down("sm")]: {
    top: "55px",
    right: "5px",
  },
}));
const StyledImg = styled(Box)(({ theme }) => ({
  width: "400px",
  height: "400px",
  objectFit: "cover",
  position: "relative",
  zIndex: 5,
  [theme.breakpoints.down("sm")]: {
    width: "137px",
    height: "137px",
  },
}));

const StyledImgBgk = styled(Box)(({ theme }) => ({
  width: "400px",
  height: "400px",
  position: "absolute",
  right: "0px",
  top: "25px",
  zIndex: 0,
}));

const Page = () => {
  const { t } = useTranslation("translation");

  const [title, setTitle] = useState(t("EnterTitle"));
  const [text, setText] = useState(t("TypeProdDesc"));
  const [salePrice, setSalePrice] = useState("50");
  const [file, setFile] = useState();

  const handleChangeTitle = (value) => {
    setTitle(value);
  };
  const handleChangeText = (value) => {
    setText(value);
  };
  const handleChangeSale = (value) => {
    setSalePrice(value?.slice(0, 2));
  };
  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
  }
  return (
    <Stack pt={2}>
      <Grid
        container
        mb={2}
        spacing={2}
        pb={2}
        sx={{ borderBottom: "1px dashed rgba(0,0,0,0.5)" }}
      >
        <Grid item xs={12} sm={4} md={4}>
          <Field
            component={TextInput}
            size="small"
            name="name"
            placeholder={t("EnterTitle")}
            onChange={(e) => handleChangeTitle(e.target.value)}
            label={t("EnterTitle")}
            sx={{ marginBottom: "15px" }}
          />

          <Field
            component={TextInput}
            size="small"
            name="sale_price"
            placeholder={t("TypeProdDisc")}
            onChange={(e) => handleChangeSale(e.target.value)}
            label={t("TypeProdDisc")}
            sx={{ marginBottom: "15px" }}
          />
          <Field
            component={TextInput}
            size="small"
            name="link"
            placeholder={t("LinkForBannerProd")}
            label={t("LinkForBannerProd")}
          />
        </Grid>

        <Grid item xs={12} sm={4} md={3}>
          <Field
            component={StyledTextArea}
            size="small"
            name="text"
            placeholder={t("TypeProdDesc")}
            onChange={(e) => handleChangeText(e.target.value)}
            label={t("TypeProdDesc")}
          />
        </Grid>

        <Grid item xs={12} lg={0.5}>
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
        <Grid item xs={12} md={1}>
          <Button className="mdBl" color="primary" variant="contained">
            {t("Save")}
          </Button>
        </Grid>
      </Grid>

      <Stack mt={2}>
        <StyledCaruselDiv component="div">
          <StyledSaleBox>
            <Typography variant="h5" color="light.main">
              {salePrice}%<br /> off
            </Typography>
          </StyledSaleBox>
          <Typography variant="subtitle2" color="text.lightYellow">
            &quot;{t("DiscWeek")}...&quot;
          </Typography>
          <Box maxWidth="55%" mb={1.5}>
            <Typography
              variant="h3"
              color="text.black"
              sx={{ wordBreak: "break-word" }}
            >
              {title}
            </Typography>
          </Box>
          <Box mb={{ xs: 2, lg: 3 }} maxWidth={{ xs: "60%", lg: "45%" }}>
            <Typography
              variant="subtitle1"
              color="text.primary"
              sx={{ wordBreak: "break-word" }}
            >
              {text}
            </Typography>
          </Box>
          <Box>
            <Button size="medium" variant="contained" color="warning">
              {t("Buy")}
            </Button>
          </Box>
          <StyledImgBox>
            <StyledImg
              component="img"
              src={file ? file : "/assets/media/caruselImg.png"}
              alt="carusel-img"
            />

            <StyledImgBgk
              component="img"
              src={"/assets/media/elips.png"}
              alt="carusel-bgk"
            />
          </StyledImgBox>
        </StyledCaruselDiv>
      </Stack>
    </Stack>
  );
};

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["title", "text", "images", "link", "sale_price"];
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
