import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { gtm } from "lib/gtm";
import { getUser } from "redux-store/user/user.slice";
import { useDispatch, useSelector } from "react-redux";
import SolidBanners from "components/dashboard/banners/SolidBanners";
import CarouselBanners from "components/dashboard/banners/CarouselBanners";
import { useTranslation } from "react-i18next";

const tabs = (t) => [
  { label: t("CarouBanner"), value: "carousel" },
  { label: t("OnlyBanners"), value: "solid" },
];

const Account = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.token);

  const [currentTab, setCurrentTab] = useState("carousel");

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
    if (!user && token) {
      dispatch(getUser({ token }));
      gtm.push({ event: "page_view" });
    }
  }, [token]);

  const handleTabsChange = (event, value) => {
    setCurrentTab(value);
  };

  return (
    <>
      <Head>
        <title>Vipcrm | {t("ForYourBusiness")}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 6,
        }}
      >
        <Container
          maxWidth="lg"
          sx={{
            paddingTop: "25px",
          }}
        >
          <Typography variant="h4">{t("SiteBanners")}</Typography>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {tabs(t).map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === "carousel" && <CarouselBanners />}
          {currentTab === "solid" && <SolidBanners />}
        </Container>
      </Box>
    </>
  );
};

Account.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Account;
