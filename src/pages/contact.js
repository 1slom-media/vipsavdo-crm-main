import { useEffect } from "react";
import Head from "next/head";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { ContactForm } from "../components/contact/contact-form";
import { ArrowLeft as ArrowLeftIcon } from "../icons/arrow-left";
import { Mail as MailIcon } from "../icons/mail";
import { gtm } from "../lib/gtm";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation("translation");

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>
          {t("Contact")} | Vipcrm | {t("ForYourBusiness")}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          display: "grid",
          gridTemplateColumns: {
            lg: "repeat(2, 1fr)",
            xs: "repeat(1, 1fr)",
          },
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            backgroundColor: "background.default",
            py: 8,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pl: {
                lg: 15,
              },
            }}
          >
            <NextLink href="/dashboard" passHref>
              <Button
                component="a"
                startIcon={<ArrowLeftIcon fontSize="small" />}
              >
                {t("Dashboard")}
              </Button>
            </NextLink>
            <Typography variant="h3" sx={{ mt: 3 }}>
              {t("Contact")}
            </Typography>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                mb: 6,
                mt: 8,
              }}
            >
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  color: "primary.contrastText",
                  mr: 2,
                }}
                variant="rounded"
              >
                <MailIcon fontSize="small" />
              </Avatar>
              <Typography variant="overline">{t("SalesContact")}</Typography>
            </Box>
            <Typography variant="h1">{t("SalesExpert")}</Typography>
            <Typography sx={{ py: 3 }} variant="body1">
              {t("SalesExpDesc")}
            </Typography>
            <Typography sx={{ color: "primary.main" }} variant="h6">
              {t("JoinSal")}
            </Typography>
            <Box sx={{ pt: 2 }}>
              <img
                alt="logoipsum1"
                src="/static/contact/contact_logos.svg"
                style={{ maxWidth: "100%" }}
              />
            </Box>
          </Container>
        </Box>
        <Box
          sx={{
            backgroundColor: "background.paper",
            px: 6,
            py: 15,
          }}
        >
          <Container
            maxWidth="md"
            sx={{
              pr: {
                lg: 15,
              },
            }}
          >
            <Typography sx={{ pb: 3 }} variant="h6">
              {t("FillForm")}
            </Typography>
            <ContactForm />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default Contact;
