import { useEffect } from "react";
import Head from "next/head";
import { Divider } from "@mui/material";
import { MainLayout } from "../components/main-layout";
import { HomeClients } from "../components/home/home-clients";
import { HomeHero } from "../components/home/home-hero";
import { HomeTestimonials } from "../components/home/home-testimonials";
import { gtm } from "../lib/gtm";
import { GuestGuard } from "components/authentication/guest-guard";
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation("translation");

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Vipcrm | {t("ForYourBusiness")}</title>
      </Head>
      <main>
        <HomeHero />
        <Divider />
        <HomeTestimonials />
        <Divider />
        <HomeClients />
      </main>
    </>
  );
};

Home.getLayout = (page) => (
  <GuestGuard>
    <MainLayout>{page}</MainLayout>
  </GuestGuard>
);

export default Home;
