import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Container, Divider, Tab, Tabs, Typography } from "@mui/material";
import { AuthGuard } from "../../components/authentication/auth-guard";
import { DashboardLayout } from "../../components/dashboard/dashboard-layout";
import { AccountBillingSettings } from "../../components/dashboard/account/account-billing-settings";
import { AccountGeneralSettings } from "../../components/dashboard/account/account-general-settings";
import { AccountNotificationsSettings } from "../../components/dashboard/account/account-notifications-settings";
import { AccountTeamSettings } from "../../components/dashboard/account/account-team-settings";
import { AccountSecuritySettings } from "../../components/dashboard/account/account-security-settings";
import { gtm } from "../../lib/gtm";
import { getUser } from "redux-store/user/user.slice";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const tabs = [
  { label: "Umumiy", value: "general" },
  { label: "To'lovlar", value: "billing" },
  { label: "Mening jamoam", value: "team" },
  { label: "Habarlar", value: "notifications" },
  { label: "Xavfsizlik", value: "security" },
];

const Account = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.user.token);

  const [currentTab, setCurrentTab] = useState("general");

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
          py: 8,
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4">{t("Mening profilim")}</Typography>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            textColor="primary"
            value={currentTab}
            variant="scrollable"
            sx={{ mt: 3 }}
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider sx={{ mb: 3 }} />
          {currentTab === "general" && <AccountGeneralSettings />}
          {currentTab === "billing" && <AccountBillingSettings />}
          {currentTab === "team" && <AccountTeamSettings />}
          {currentTab === "notifications" && <AccountNotificationsSettings />}
          {currentTab === "security" && <AccountSecuritySettings />}
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
