import { Stack } from "@mui/material";
import { AuthGuard } from "../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../components/dashboard/dashboard-layout";
import Head from "next/head";
import CustomerProfileLayout from "../../../../../components/admin/CustomerView/layout";
import { operatorNavigations } from "../../../../../constants/navigations";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getOperatorProfile } from "../../../../../redux-store/admin/operators/operator.slice";
import { Container } from "@mui/system";
import OperatorSettings from "../../../../../components/admin/EDITPAGES/OperatorSettings";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.operators.customerProfile);

  useEffect(() => {
    if (token) {
      dispatch(
        getOperatorProfile({
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
          <CustomerProfileLayout navs={operatorNavigations}>
            {user?.user && (
              <OperatorSettings
                initialValues={{
                  isAdmin: user?.user?.isAdmin,
                  isOperator: user?.user?.isOperator,
                }}
              />
            )}
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
