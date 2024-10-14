import { Box, Button, Grid, Stack, styled, Typography } from "@mui/material";
import CaruselModal2 from "components/admin/Modals/CaruselModal2";
import { useTranslation } from "react-i18next";

const StyledCaruselDiv = styled(Box)(({ theme }) => ({
  paddingTop: "30px",
  position: "relative",
  width: "100%",
  height: "300px",
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
  right: "40px",
  top: "35px",
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
  width: "200px",
  height: "200px",
  top: "40px",
  position: "relative",
  zIndex: 5,
  [theme.breakpoints.down("sm")]: {
    width: "137px",
    height: "137px",
  },
}));

const StyledImgBgk = styled(Box)(({ theme }) => ({
  width: "240px",
  height: "240px",
  position: "absolute",
  right: "0px",
  top: "25px",
  zIndex: 0,
}));

const Page = ({ data }) => {
  const { t } = useTranslation("translation");

  return (
    <Stack position="relative">
      <CaruselModal2 />
      <StyledCaruselDiv component="div">
        <StyledSaleBox>
          <Typography variant="h5" color="light.main">
            {data?.salePrice}%<br /> off
          </Typography>
        </StyledSaleBox>
        <Typography variant="subtitle2" color="text.lightYellow">
          &quot;{t("DiscWeek")}...&quot;
        </Typography>
        <Box maxWidth="55%" mb={1.5}>
          <Typography
            variant="h6"
            color="text.black"
            sx={{ wordBreak: "break-word" }}
          >
            {data?.title}
          </Typography>
        </Box>
        <Box mb={{ xs: 2, lg: 3 }} maxWidth={{ xs: "60%", lg: "45%" }}>
          <Typography
            variant="string"
            color="text.primary"
            sx={{ wordBreak: "break-word" }}
          >
            {data?.text}
          </Typography>
        </Box>
        <Box>
          <Button size="medium" variant="contained" color="warning">
            {t("Buy")}
          </Button>
        </Box>
        <StyledImgBox>
          <StyledImg component="img" src={data?.img} alt="carusel-img" />

          <StyledImgBgk
            component="img"
            src={"/assets/media/elips.png"}
            alt="carusel-bgk"
          />
        </StyledImgBox>
      </StyledCaruselDiv>
    </Stack>
  );
};

export default Page;
