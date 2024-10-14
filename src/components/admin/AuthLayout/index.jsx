import { Stack, Container, Box, Grid, styled, Typography } from "@mui/material";
import MobileViewDisabled from "../Modals/MobileViewDisabled";
import { useTranslation } from "react-i18next";

const StyledContainer = styled(Box)(({ theme }) => ({
  width: "95%",
  margin: "0 auto",
  marginTop: "2.5vh",
}));
const StyledContainerLeft = styled(Box)(({ theme }) => ({
  width: "100%",
  background:
    "linear-gradient(96.46deg, rgba(110, 202, 254, 0.232) 2.49%, rgba(50, 144, 231, 0.132) 2.5%, rgba(0, 133, 255, 0.216) 84.09%)",
  backdropFilter: "blur(18.5px)",
  height: "95vh",
  borderTopLeftRadius: "30px",
  borderBottomLeftRadius: "30px",
  padding: "50px",
  [theme.breakpoints.down("sm")]: {
    height: "auto",
    borderBottomLeftRadius: "0",
    borderTopRightRadius: "30px",
    paddingBottom: "0",
  },
}));
const StyledContainerRight = styled(Box)(({ theme }) => ({
  background: "#EEF6FB",
  width: "100%",
  height: "95vh",
  borderTopRightRadius: "30px",
  borderBottomRightRadius: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    background:
      "linear-gradient(96.46deg, rgba(110, 202, 254, 0.232) 2.49%, rgba(50, 144, 231, 0.132) 2.5%, rgba(0, 133, 255, 0.216) 84.09%)",
    backdropFilter: "blur(18.5px)",
    borderTopRightRadius: "0",
    borderBottomLeftRadius: "30px",
    height: "calc(100vh - 250px)",
  },
}));

const AuthLayout = ({ children }) => {
  const { t } = useTranslation("translation");

  return (
    <StyledContainer>
      <MobileViewDisabled />
      <Grid container>
        <Grid item xs={12} md={6}>
          <StyledContainerLeft>
            <Box
              component="img"
              src="/assets/dashboard-logo.png"
              alt="Logo"
              width="150px"
              mb={4}
            />
            <Typography
              variant="h3"
              color="text.legacy"
              width={{ xs: "auto", md: "500px" }}
            >
              VIPCRM - {t("AuthLayDesc")}!
            </Typography>
          </StyledContainerLeft>
        </Grid>
        <Grid item xs={12} md={6}>
          <StyledContainerRight>{children}</StyledContainerRight>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default AuthLayout;
