import { Stack } from "@mui/material";
import Head from "next/head";
import CustomerProfileLayout from "../../../../../components/admin/CustomerView/layout";
import { customerNavigations } from "../../../../../constants/navigations";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getCustomerProfile } from "../../../../../redux-store/admin/customers/customers.slice";
import React, { useEffect } from "react";
import { AuthGuard } from "../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../components/dashboard/dashboard-layout";
import { Container } from "@mui/system";
import SettingsForm from "../../../../../components/admin/EDITPAGES/UserSettings";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.customers.customerProfile);

  useEffect(() => {
    if (token) {
      dispatch(
        getCustomerProfile({
          token,

          params: {
            userId: router.query.id,
            type: "info",
          },
        })
      );
    }
  }, [router.query.id]);
  return (
    <>
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack my={3}>
          <CustomerProfileLayout navs={customerNavigations}>
            {user?.user ? (
              <SettingsForm
                initialValues={{
                  isAdmin: user?.user?.isAdmin,
                  isOperator: user?.user?.isOperator,
                }}
              />
            ) : null}
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
