import { useEffect } from "react";
import Head from "next/head";
import Router from "next/router";
import { Toaster } from "react-hot-toast";
import { Provider as ReduxProvider } from "react-redux";
import nProgress from "nprogress";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { RTL } from "../components/rtl";
import { PersistGate } from "redux-persist/integration/react";
import {
  SettingsConsumer,
  SettingsProvider,
} from "../contexts/settings-context";
import { gtmConfig } from "../config";
import { gtm } from "../lib/gtm";
import { store, persistor } from "redux-store/store";
import { createTheme } from "../theme";
import { createEmotionCache } from "../utils/create-emotion-cache";
import AlertContainer from "components/admin/Alerts";
import SessionModal from "components/authentication/SessionExpireModal";
import uz from "date-fns/locale/uz";
import { appWithI18Next } from "ni18n";
import { ni18nConfig } from "../ni18n.config";
import { useTranslation } from "react-i18next";

Router.events.on("routeChangeStart", nProgress.start);
Router.events.on("routeChangeError", nProgress.done);
Router.events.on("routeChangeComplete", nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const { t } = useTranslation("translation");
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    gtm.initialize(gtmConfig);
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Vipcrm | {t("ForYourBusiness")}</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link
          rel="stylesheet"
          type="text/css"
          charset="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
      </Head>
      <ReduxProvider store={store}>
        <PersistGate persistor={persistor}>
          <AlertContainer />
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={uz}>
            <SettingsProvider>
              <SettingsConsumer>
                {({ settings }) => (
                  <ThemeProvider
                    theme={createTheme({
                      direction: settings.direction,
                      responsiveFontSizes: settings.responsiveFontSizes,
                      mode: settings.theme,
                    })}
                  >
                    <RTL direction={settings.direction}>
                      <CssBaseline />
                      <Toaster position="top-center" />
                      <SessionModal />
                      {getLayout(<Component {...pageProps} />)}
                    </RTL>
                  </ThemeProvider>
                )}
              </SettingsConsumer>
            </SettingsProvider>
          </LocalizationProvider>
        </PersistGate>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default appWithI18Next(App, ni18nConfig);
