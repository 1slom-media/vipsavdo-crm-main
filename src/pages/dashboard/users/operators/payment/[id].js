import React from "react";
import {
  Divider,
  Pagination,
  Stack,
  TableContainer,
  Table,
  TableBody,
} from "@mui/material";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import Head from "next/head";
import CustomerProfileLayout from "components/admin/CustomerView/layout";
import { operatorNavigations } from "constants/navigations";
import AdminCard from "components/general/Cards/AdminCard";
import PaymentFilter from "components/admin/Operators/PaymentFilter";
import { useSelector, useDispatch } from "react-redux";
import {
  getOperatorProfile,
  getOperatorsPaymentsHistory,
} from "redux-store/admin/operators/operator.slice";
import { paymentStatus } from "constants/statuses";
import { useRouter } from "next/router";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import AdminTableHeader from "components/general/TableHead/Admin";
import heading from "constants/userViewPaymentHeading";
import useMuiTable from "hooks/useMuiTable";
import UserPaymentViewRow from "components/admin/TableRows/UserPaymentViewRow";
import { Box, Container } from "@mui/system";
import TableLimitSelector from "components/admin/Modals/TableLimitSelector";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const { id, page, status, limit } = router?.query;
  const token = useSelector((state) => state.auth.token);

  const userPayments = useSelector((state) => state.operators.list.payment);
  const paymentsObj = useSelector(
    (state) => state.operators.customerProfile.paymentCount
  );

  React.useEffect(() => {
    if (token) {
      dispatch(
        getOperatorProfile({
          token,

          params: {
            userId: id,
            type: "info",
          },
        })
      );
      dispatch(
        getOperatorsPaymentsHistory({
          token,

          params: {
            userId: id,
            type: "payment",
            status,
          },
        })
      );
    }
  }, [token]);

  const { rowsPerPage, filteredList, handleChangePage, handleRequestSort } =
    useMuiTable({
      size: 7,
      listData: userPayments,
      defaultSort: "no",
    });

  return (
    <>
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack my={3}>
          <CustomerProfileLayout navs={operatorNavigations}>
            <AdminCard sx={{ p: 0 }}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Stack py={3} px={2}>
                  <PaymentFilter
                    currStatus={paymentsObj}
                    status={paymentStatus}
                    current={status}
                  />
                </Stack>
                <Box style={{ marginRight: "1rem" }}>
                  <TableLimitSelector
                    status={true}
                    isCustomerPage={true}
                    isOperatorPage={true}
                    isPayment={true}
                  />
                </Box>
              </Box>
              <Divider />
              {filteredList?.length ? (
                <>
                  <Stack p={2}>
                    <TableContainer>
                      <Table>
                        <AdminTableHeader
                          onRequestSort={handleRequestSort}
                          hideSelectBtn
                          heading={heading}
                        />
                        <TableBody>
                          {filteredList.map((item, indx) => (
                            <UserPaymentViewRow
                              key={item._id}
                              {...item}
                              index={indx}
                            />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Stack>
                  <Stack alignItems="flex-end" p={2}>
                    <Pagination
                      onChange={handleChangePage}
                      page={parseInt(page)}
                      count={Math.ceil(userPayments.length / rowsPerPage)}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                    />
                  </Stack>
                </>
              ) : (
                <EmptyPageWrapper>
                  <EmptyCard
                    txt={t("NoPaymentForNow")}
                    img="/assets/media/noPayment.png"
                  />
                </EmptyPageWrapper>
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
