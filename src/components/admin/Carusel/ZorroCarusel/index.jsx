import { Box, Button, Grid, Stack, styled, Typography } from "@mui/material";
import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import CaruselModal1 from "components/admin/Modals/CaruselModal1";
import { useTranslation } from "react-i18next";
const StyledBox = styled(Box)(({ theme }) => ({
  background: theme.palette.background.filter,
  borderRadius: "40px",
  width: "100%",
  height: "300px",
}));
const StyledImgBox = styled(Box)(({ theme }) => ({
  width: "300px",
  height: "170px",
  position: "absolute",
  right: "50px",
  bottom: "50px",
}));
const StyledImg = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));
const StyledButtonBox = styled(Button)(({ theme }) => ({
  color: "red",
  background: "white",
  "&:hover": {
    color: "red",
    background: "white",
  },
}));

const Carusel = ({ data }) => {
  const { t } = useTranslation("translation");

  return (
    <StyledBox px={8} position="relative">
      <CaruselModal1 />
      <Grid container display="flex" flexDirection="column">
        <Grid item xs={12} md={6} pt={10} mb={2}>
          <Typography
            variant="h6"
            color="text.filterText"
            sx={{ wordBreak: "break-word" }}
          >
            {data?.title}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} mb={3}>
          <Typography
            variant="string"
            color="text.filterText"
            sx={{ wordBreak: "break-word" }}
          >
            {data?.text}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledButtonBox variant="contained">
            {t("Buy")} <ArrowRightAltIcon sx={{ marginLeft: "10px" }} />
          </StyledButtonBox>
        </Grid>
      </Grid>
      <StyledImgBox>
        <StyledImg component="img" src={data?.img} alt="banner-img" />
      </StyledImgBox>
    </StyledBox>
  );
};
export default Carusel;
