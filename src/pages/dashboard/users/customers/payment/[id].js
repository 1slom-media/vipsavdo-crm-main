import { Card, Divider, Pagination, Stack, styled } from "@mui/material";
import Head from "next/head";
import CustomerProfileLayout from "../../../../../components/admin/CustomerView/layout";
import { customerNavigations } from "../../../../../constants/navigations";
import AdminCard from "../../../../../components/general/Cards/AdminCard";
import AdminTableHeader from "../../../../../components/general/TableHead/Admin";
import heading from "../../../../../constants/userViewPaymentHeading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import UserPaymentViewRow from "../../../../../components/admin/TableRows/UserPaymentViewRow";
import {
  getCustomerProfile,
  getCustomersPaymentsHistory,
} from "../../../../../redux-store/admin/customers/customers.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useRouter } from "next/router";
import useMuiTable from "../../../../../hooks/useMuiTable";
import PaymentFilter from "../../../../../components/admin/Users/PaymentFilter";
import { paymentStatus } from "../../../../../constants/statuses";
import EmptyPageWrapper from "../../../../../components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "../../../../../components/general/ErrorBoundry/EmptyCard";
import { AuthGuard } from "../../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../../components/dashboard/dashboard-layout";
import { Box, Container } from "@mui/system";
import TableLimitSelector from "../../../../../components/admin/Modals/TableLimitSelector";
import { useTranslation } from "react-i18next";

const TableAndSelectBox = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const idPar = router?.query?.id;
  const limitPar = router?.query?.limit;
  const pagePar = router?.query?.page;
  const statusPar = router?.query?.status;

  const token = useSelector((state) => state.auth.token);
  const statistics = useSelector(
    (state) => state.customers.paymentsHistory.payment
  );

  const statusFilter = useSelector(
    (state) => state.customers.paymentStatusFilter
  );
  const userPayments = useSelector(
    (state) => state.customers.customerProfile.paymentCount
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
            type: "payment",
            status: statusPar,
            page: pagePar,
            limit: limitPar,
          },
        })
      );
    }
  }, [token, idPar, statusFilter, statusPar, limitPar, pagePar]);

  const { rowsPerPage, filteredList, handleChangePage, handleRequestSort } =
    useMuiTable({
      size: 7,
      listData: statistics,
      defaultSort: "no",
    });

  return (
    <>
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack my={3} pt={{ xs: 8, md: 0 }}>
          <CustomerProfileLayout navs={customerNavigations}>
            <AdminCard sx={{ p: 0 }}>
              <TableAndSelectBox>
                <Stack py={3} px={2}>
                  <PaymentFilter
                    currStatus={userPayments}
                    status={paymentStatus}
                  />
                </Stack>
                <Box style={{ marginRight: "1rem" }}>
                  <TableLimitSelector isCustomerPage={true} isPayment={true} />
                </Box>
              </TableAndSelectBox>
              <Divider />
              {userPayments[statusFilter] !== 0 ||
              userPayments[statusFilter].length ? (
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
                      page={parseInt(pagePar)}
                      count={Math.ceil(statistics?.length / rowsPerPage)}
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
