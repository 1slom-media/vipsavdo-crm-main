import { Box, Divider, Stack, Typography } from "@mui/material";
import Head from "next/head";
import AdminSettings from "components/admin/Settings/AdminSettings";
import GeneralSettings from "components/admin/Settings/GeneralSettings";
import React, { useEffect, useState } from "react";
import AdminCard from "components/general/Cards/AdminCard";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import BotSettings from "components/admin/Settings/BotSettings";
import SmsSettings from "components/admin/Settings/SmsSettings";
import SiteBanner from "components/admin/Settings/SiteBanner";
import { useSelector, useDispatch } from "react-redux";
import { getAppSettings } from "redux-store/settings/settings.slice";
import { getBotSettings } from "redux-store/admin/message/bot.slice";
import { getSmsSettings } from "redux-store/admin/message/sms.slice";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const { t } = useTranslation();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const Page = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = useSelector((state) => state.user.data);
  const site = useSelector((state) => state.settings.site);
  const token = useSelector((state) => state.auth.token);
  const bot = useSelector((state) => state.bot.data);
  const sms = useSelector((state) => state.sms.data);

  useEffect(() => {
    dispatch(getAppSettings({ token }));
    dispatch(getBotSettings({ token }));
    dispatch(getSmsSettings({ token }));
  }, [token]);

  return (
    <>
      <Head>
        <title>Vipsavdo | {t("ForYourBusiness")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack my={4}>
          <Typography mb={3} variant="h5" color="text.legacy">
            {t("SystemSettings")}
          </Typography>
          <AdminCard>
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons
              aria-label="visible arrows tabs example"
            >
              <Tab label={t("SiteSettings")} {...a11yProps(2)} />
              <Tab label={t("BotSettings")} {...a11yProps(3)} />
              <Tab label={t("SMSSettings")} {...a11yProps(4)} />
            </Tabs>
            <Divider />
            <TabPanel value={value} index={0}>
              <GeneralSettings initialValues={{ ...site?.[0], layOut: "1" }} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <BotSettings initialValues={bot ? bot : {}} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <SmsSettings initialValues={sms ? sms : {}} />
            </TabPanel>
          </AdminCard>
        </Stack>
      </Container>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Page;
