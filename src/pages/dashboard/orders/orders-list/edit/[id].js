import { useEffect } from "react";
import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import OrderEditForm from "../../../../../components/admin/EDITPAGES/order";
import { useRouter } from "next/router";
import { AuthGuard } from "../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../components/dashboard/dashboard-layout";
import { useDispatch, useSelector } from "react-redux";
import { getAdminSingleOrder } from "../../../../../redux-store/admin/orders/orders.slice";
import { Stack } from "@mui/system";
import AdminCard from "../../../../../components/general/Cards/AdminCard";
import { useTranslation } from "react-i18next";

const OrderDetails = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const data = useSelector((state) => state.orders.singleOrder);

  useEffect(() => {
    if (router?.query?.id) {
      dispatch(getAdminSingleOrder({ _id: router?.query?.id, token }));
    }
  }, [router?.query?.id]);

  return (
    <>
      <Head>
        <title>Vipcrm | {t("ForYourBusiness")}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container>
          <Stack>
            <Grid container>
              <Grid item xs={12}>
                <Typography mb={3} variant="h5" color="text.legacy">
                  {t("OrderInfoStatistics")}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <AdminCard>
                  {data && (
                    <OrderEditForm
                      {...data}
                      initialValues={{
                        city_id: data.city_id,
                        status: data.status,
                        address: data.address,
                        message: data?.message,
                        extra_info: data?.extra_info,
                        orderItems: data?.orderItems,
                      }}
                    />
                  )}
                </AdminCard>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

OrderDetails.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default OrderDetails;
