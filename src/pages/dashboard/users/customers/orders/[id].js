import {
  Divider,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Head from "next/head";
import CustomerProfileLayout from "components/admin/CustomerView/layout";
import { customerNavigations } from "constants/navigations";
import AdminCard from "components/general/Cards/AdminCard";
import { orderStatuses } from "constants/statuses";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import React, { useEffect } from "react";
import {
  getCustomerProfile,
  getCustomersPaymentsHistory,
} from "redux-store/admin/customers/customers.slice";
import AdminTableHeader from "components/general/TableHead/Admin";
import heading from "constants/userOrdersHeading";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import OrderFilter from "components/admin/Users/OrderFilter";
import UserOrderPaymentRow from "components/admin/TableRows/UserOrderPayments";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Box, Container } from "@mui/system";
import TableLimitSelector from "components/admin/Modals/TableLimitSelector";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const idPar = router?.query?.id;
  const limitPar = router?.query?.limit;
  const pagePar = router?.query?.page;
  const statusPar = router?.query?.status;

  const token = useSelector((state) => state.auth.token);

  const { countPage, paymentsHistory } = useSelector(
    (state) => state.customers
  );
  const [page, setPage] = React.useState(1);

  const handlePageChange = (_, page) => {
    setPage(page);
  };

  const statistics = useSelector(
    (state) => state.customers.paymentsHistory.orders
  );
  const statusFilter = useSelector(
    (state) => state.customers.orderStatusFilter
  );
  const userOrders = useSelector(
    (state) => state.customers.customerProfile.orderCount
  );

  useEffect(() => {
    if (token) {
      dispatch(
        getCustomerProfile({
          token,

          params: {
            userId: idPar,
            type: "info",
          },
        })
      );

      dispatch(
        getCustomersPaymentsHistory({
          token,

          params: {
            userId: idPar,
            type: "order",
            status: statusPar,
            page: pagePar,
            limit: limitPar,
          },
        })
      );
    }
  }, [token, idPar, statusPar, pagePar, limitPar]);

  return (
    <>
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack my={3}>
          <CustomerProfileLayout navs={customerNavigations}>
            <AdminCard sx={{ p: 0 }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack py={3} px={2}>
                  <OrderFilter
                    currStatus={userOrders}
                    status={orderStatuses}
                    current={statusFilter}
                    size={paymentsHistory?.size}
                  />
                </Stack>
                <Box style={{ marginRight: "1rem" }}>
                  <TableLimitSelector isCustomerPage={true} isPayment={false} />
                </Box>
              </Box>

              <Divider />
              <Stack p={2}>
                {statistics?.length >= 1 ? (
                  <TableContainer>
                    <Table>
                      <AdminTableHeader hideSelectBtn heading={heading} />
                      <TableBody>
                        {paymentsHistory.orders?.map((item, indx) => (
                          <UserOrderPaymentRow
                            key={item._id}
                            {...item}
                            index={indx}
                          />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                ) : (
                  <EmptyPageWrapper>
                    <EmptyCard
                      txt={t("NoOrdersForNow")}
                      img="/assets/media/noPayment.png"
                    />
                  </EmptyPageWrapper>
                )}
              </Stack>
              {countPage >= 2 && (
                <Stack alignItems="flex-end" p={2}>
                  <Pagination
                    page={parseInt(pagePar)}
                    onChange={handlePageChange}
                    count={countPage}
                    color="primary"
                    variant="outlined"
                    shape="rounded"
                  />
                </Stack>
              )}
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
