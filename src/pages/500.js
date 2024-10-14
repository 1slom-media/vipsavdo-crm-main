import { useEffect } from "react";
import NextLink from "next/link";
import Head from "next/head";
import {
  Box,
  Button,
  Container,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { gtm } from "../lib/gtm";
import { useTranslation } from "react-i18next";

const ServerError = () => {
  const theme = useTheme();
  const { t } = useTranslation("translation");
  const mobileDevice = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Vipcrm | {t("ForYourBusiness")}</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          backgroundColor: "background.paper",
          display: "flex",
          flexGrow: 1,
          py: "80px",
        }}
      >
        <Container maxWidth="lg">
          <Typography align="center" variant={mobileDevice ? "h4" : "h1"}>
            500: {t("InternalServerError")}
          </Typography>
          <Typography
            align="center"
            color="textSecondary"
            sx={{ mt: 0.5 }}
            variant="subtitle2"
          >
            {t("InternalServerErrorDesc")}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <Box
              alt="Under development"
              component="img"
              src={`/static/error/error500_${theme.palette.mode}.svg`}
              sx={{
                height: "auto",
                maxWidth: "100%",
                width: 400,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 6,
            }}
          >
            <NextLink href="/dashboard" passHref>
              <Button component="a" variant="outlined">
                {t("BackDashboard")}
              </Button>
            </NextLink>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default ServerError;
