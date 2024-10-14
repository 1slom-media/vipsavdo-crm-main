import { Stack } from "@mui/material";
import Head from "next/head";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Container } from "@mui/system";

const Page = () => {
  return (
    <Container maxWidth="xl">
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Stack py={4}></Stack>
    </Container>
  );
};

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Page;
