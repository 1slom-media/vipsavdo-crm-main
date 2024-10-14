import React from "react";
import {
  Button,
  Divider,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
} from "@mui/material";
import Head from "next/head";
import CustomerProfileLayout from "components/admin/CustomerView/layout";
import { operatorNavigations } from "constants/navigations";
import OrderFilter from "components/admin/Operators/OrderFilter";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { orderStatuses } from "constants/statuses";
import {
  getOperatorProfile,
  getOperatorsOrderHistory,
} from "redux-store/admin/operators/operator.slice";
import AdminCard from "components/general/Cards/AdminCard";
import AdminTableHeader from "components/general/TableHead/Admin";
import heading from "constants/userOrdersHeading";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import UserOrderPaymentRow from "components/admin/TableRows/UserOrderPayments";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Box, Container } from "@mui/system";
import TableLimitSelector from "components/admin/Modals/TableLimitSelector";
import ConfirmDeleteModal from "../../../../../components/admin/Modals/ConfirmDeleteModal.jsx ";
import OperatorsConfirmModal from "../../../../../components/admin/Modals/OperatorsConfirmModal";
import useAlert from "../../../../../hooks/useAlert";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const { id, status, limit, page } = router?.query;
  const token = useSelector((state) => state.auth.token);

  const data = useSelector((state) => state.operators.paymentsHistory);
  const handlePageChange = (_, p) => {
    // router.push("/");
  };

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
        getOperatorsOrderHistory({
          token,
          params: {
            userId: id,
            type: "order",
            status,
            page,
          },
        })
      );
    }
  }, [id, status, token, page, limit]);

  const changeListStatus = () => {};

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
                  <OrderFilter
                    status={orderStatuses}
                    current={status}
                    size={data?.size}
                  />
                </Stack>
                <Box style={{ marginRight: "1rem" }}>
                  <TableLimitSelector
                    status={true}
                    isOperatorPage={true}
                    isCustomerPage={true}
                    isPayment={false}
                  />
                </Box>
              </Box>
              <Divider />
              <Stack p={2}>
                {data?.size >= 1 ? (
                  <TableContainer>
                    <Table>
                      <AdminTableHeader hideSelectBtn heading={heading} />
                      <TableBody>
                        {data?.orders?.map((item, index) => (
                          <UserOrderPaymentRow
                            key={item._id}
                            {...item}
                            index={index}
                          />
                        ))}
                      </TableBody>
                    </Table>
                    {status === "new" && (
                      <OperatorsConfirmModal
                        uid={id}
                        token={token}
                        alert={alert}
                        status={status}
                        page={page}
                      />
                    )}
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
              {data?.countPage >= 2 && (
                <Stack alignItems="flex-end" p={2}>
                  <Pagination
                    onChange={handlePageChange}
                    page={parseInt(page)}
                    count={data?.countPage}
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
