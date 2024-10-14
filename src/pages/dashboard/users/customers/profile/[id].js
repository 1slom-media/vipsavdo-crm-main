import { Stack, Box, styled, Grid, Typography, Button } from "@mui/material";
import Head from "next/head";
import CustomerProfileLayout from "../../../../../components/admin/CustomerView/layout";
import { customerNavigations } from "../../../../../constants/navigations";
import AdminCard from "../../../../../components/general/Cards/AdminCard";
import AvatarUploader from "../../../../../components/admin/Uploaders/AvatarUploader";
import UserUpdateForm from "../../../../../components/admin/UserForms/UserUpdateForm";
import InfoCardWrapper from "../../../../../components/admin/Dashboard/InfoCardWrapper";
import PaymentStats from "../../../../../components/admin/CustomerView/PaymentStats";
import { getCustomerProfile } from "../../../../../redux-store/admin/customers/customers.slice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AuthGuard } from "../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../components/dashboard/dashboard-layout";
import { Container } from "@mui/system";
import { useTranslation } from "react-i18next";

const StyledProfileHeader = styled(Box)(({ theme }) => ({
  background: theme.palette.blue[200],
  padding: 15,
  borderRadius: 20,
}));

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");
  const token = useSelector((state) => state.auth.token);
  const statistics = useSelector((state) => state.customers.customerProfile);

  const saveStats = (params) => dispatch();

  useEffect(() => {
    if (token) {
      dispatch(
        getCustomerProfile({
          token,

          params: {
            userId: router?.query?.id,
            type: "info",
          },
        })
      );
    }
  }, [token, router?.query?.id]);

  return (
    <>
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack my={3} pt={{ xs: 8, md: 0 }}>
          <CustomerProfileLayout navs={customerNavigations}>
            <AdminCard>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <StyledProfileHeader>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Stack direction="row" alignItems="center">
                          <AvatarUploader />
                          <Stack gap={2} ml={2}>
                            <Stack direction="row" alignItems="center" gap={2}>
                              <Typography>{t("Balance")}:</Typography>
                              <Typography>
                                {statistics?.user?.balance?.toLocaleString()}{" "}
                                so&lsquo;m
                              </Typography>
                            </Stack>
                            <Stack direction="row" alignItems="center" gap={2}>
                              <Typography>{t("Paid")}:</Typography>
                              <Typography>
                                {statistics?.user?.paid?.toLocaleString()}{" "}
                                so&lsquo;m
                              </Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Stack alignItems="flex-end"></Stack>
                      </Grid>
                    </Grid>
                  </StyledProfileHeader>
                </Grid>
                <Grid item xs={12}>
                  <UserUpdateForm initialValues={{ ...statistics?.user }} />
                </Grid>
                <Grid item xs={12}>
                  <Stack my={2}>
                    <Typography color="text.legacy" variant="body2">
                      {t("OrdersStatistics")}
                    </Typography>
                  </Stack>
                  <InfoCardWrapper
                    data={statistics?.orderCount}
                    shadow="0px 5px 34px rgba(75, 144, 208, 0.1)"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Stack my={2}>
                    <Typography color="text.legacy">
                      {t("PaymentStatistics")}
                    </Typography>
                  </Stack>
                  <PaymentStats {...statistics?.paymentCount} />
                </Grid>
              </Grid>
            </AdminCard>
          </CustomerProfileLayout>
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
