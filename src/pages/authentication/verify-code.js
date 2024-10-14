import { useEffect, useState } from "react";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Link,
  Typography,
  styled,
} from "@mui/material";
import { GuestGuard } from "../../components/authentication/guest-guard";
import { Logo } from "../../components/logo";
import { gtm } from "../../lib/gtm";
import AuthCode from "react-auth-code-input";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { confirmSMSCode } from "redux-store/user/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "hooks/useAlert";
import { useTranslation } from "react-i18next";

const StyledBoxInput = styled(Box)(({ theme }) => ({
  textAlign: "center",
  input: {
    width: "50px",
    height: "50px",
    outline: "none",
    border: "1px solid",
    padding: 0,
    fontSize: "24px",
    textAlign: "center",
    borderColor: theme.palette.text.secondary,
    borderRadius: "5px",
    marginRight: "15px",
    backgroundClip: "padding-box",
    [theme.breakpoints.down("sm")]: {
      width: "45px",
      height: "45px",
      fontSize: "20px",
    },
  },
}));

const VerifyCode = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const { token, phoneNumber } = useSelector((state) => state.auth);

  const [counter, setCounter] = useState(60);

  const handleOnChange = (res) => {
    if (res.length === 4) {
      let code = parseInt(res, 10);
      dispatch(
        confirmSMSCode({
          data: { code, phone: phoneNumber },
          alert,
        })
      );
    } else {
    }
  };

  useEffect(() => {
    gtm.push({ event: "page_view" });
    if (token) {
      if (router?.query?.returnUrl) {
        router.push(router?.query?.returnUrl);
      } else {
        router.push("/dashboard");
      }
    }
  }, [token]);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter, phoneNumber]);

  return (
    <>
      <Head>
        <title>
          {t("VerifyCode")} | Vipcrm | {t("ForYourBusiness")}
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
            <Link href="/authentication/login">
              <Box display="flex" position="absolute">
                <ArrowBackIosIcon />
                <Typography variant="body1" color="text.legacy">
                  {t("Back")}
                </Typography>
              </Box>
            </Link>
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
              <Typography variant="h4">{t("ConfirmationCode")}</Typography>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                {t("TypeCodeForCont")}
              </Typography>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
                mt: 3,
              }}
            >
              <Typography
                variant="h4"
                color="text.legacy"
                mb={4}
                textAlign="center"
              >
                {t("Login")}
              </Typography>

              <Typography
                variant="subtitle2"
                color="text.secondary"
                align="center"
                mb={4}
              >
                {phoneNumber} {t("TypeCodeSendThisNumb")}
              </Typography>
              <StyledBoxInput position="relative" mb={4}>
                <AuthCode
                  allowedCharacters="numeric"
                  length={4}
                  onChange={handleOnChange}
                />
              </StyledBoxInput>
              <Box width="60%" margin="0 auto" mb={3}>
                <Divider />
              </Box>
              <Box textAlign="center">
                {counter === 0 ? (
                  <Typography variant="body2" color="black.main">
                    00 : 00
                  </Typography>
                ) : (
                  <Typography variant="body2" color="black.main">
                    00 :
                    {<> {counter < 10 ? <>0{counter}</> : <>{counter}</>}</>}
                  </Typography>
                )}

                <Typography variant="subtitle2" color="text.secondary" mb={2}>
                  {t("DidntRecieveCode")}
                </Typography>
                <Button
                  disabled={counter === 0 ? false : true}
                  variant="outlined"
                  color={counter === 0 ? "primary" : "secondary"}
                >
                  {t("Resend")}
                </Button>
              </Box>
            </Box>
            <Divider sx={{ my: 3 }} />
          </Card>
        </Container>
      </Box>
    </>
  );
};

VerifyCode.getLayout = (page) => <GuestGuard>{page}</GuestGuard>;

export default VerifyCode;
