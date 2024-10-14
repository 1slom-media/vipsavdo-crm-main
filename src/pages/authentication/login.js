import { useEffect } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { Field, reduxForm } from "redux-form";
import { LoadingButton } from "@mui/lab";
import useAlert from "hooks/useAlert";
import { Box, Card, Container, Divider, Link, Typography } from "@mui/material";
import { sendPhoneAuthCode, setPhoneNumber } from "redux-store/user/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { GuestGuard } from "components/authentication/guest-guard";
import PhoneMaskInput from "components/general/Inputs/PhoneMaskInput";
import { Logo } from "components/logo";
import { gtm } from "lib/gtm";
import { Stack } from "@mui/system";
import { useTranslation } from "react-i18next";

const Login = ({ handleSubmit }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const { smsSent, isAuthCodeLoading } = useSelector((state) => state.auth);
  const { disableGuard } = router.query;

  const handleAuth = (values) => {
    const data = { ...values };
    const phone = data["phone"];
    data["phone"] = `+${phone?.replace(/\D/g, "")}`;
    dispatch(setPhoneNumber(data.phone));
    dispatch(sendPhoneAuthCode({ data, alert, router }));
  };

  useEffect(() => {
    gtm.push({ event: "page_view" });
    if (smsSent) {
      if (router?.query?.returnUrl) {
        router
          .push({
            pathname: "/authentication/verify-code",
            query: { returnUrl: router?.query?.returnUrl },
          })
          .catch(console.error);
      } else {
        router.push("/authentication/verify-code");
      }
    }
  }, [smsSent]);

  return (
    <>
      <Head>
        <title>
          {t("Login")} | Vipcrm | {t("ForYourBusiness")}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          backgroundImage: "url(/static/bg.svg)",
          backgroundSize: "cover",
          justifyContent: "center",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Container
          maxWidth="sm"
          sx={{
            py: {
              xs: "60px",
              md: "120px",
            },
          }}
        >
          <Card elevation={16} sx={{ p: 4 }}>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <NextLink href="/" passHref>
                <a>
                  <Logo
                    sx={{
                      height: 40,
                      width: 40,
                    }}
                  />
                </a>
              </NextLink>
              <Typography variant="h4">{t("LoginProfile")}</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                {t("TypeYourPhoneForLogin")}
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <Typography variant="body1" color="text.legacy" mb={1}>
                {t("PhoneNumber")}
              </Typography>
              <Stack mt={2} mb={3}>
                <Field
                  component={PhoneMaskInput}
                  name="phone"
                  placeholder={t("PhoneNumber")}
                />
              </Stack>
              <LoadingButton
                loading={isAuthCodeLoading}
                onClick={handleSubmit(handleAuth)}
                variant="contained"
                fullWidth
              >
                {t("LoginProfile")}
              </LoadingButton>
            </Box>
            <Divider sx={{ my: 3 }} />
            <div>
              <NextLink
                href={
                  disableGuard
                    ? `/authentication/register?disableGuard=${disableGuard}`
                    : "/authentication/register"
                }
                passHref
              >
                <Link color="textSecondary" variant="body2">
                  {t("HaveProblem")}
                </Link>
              </NextLink>
            </div>
          </Card>
        </Container>
      </Box>
    </>
  );
};

Login.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

const validate = (values, props) => {
  let errors = {};
  const requiredFields = ["phone"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Malumot kiritilmadi!";
    }
  });
};

export default reduxForm({
  form: "phone_auth_form",
  validate,
  enableReinitialize: true,
})(Login);
