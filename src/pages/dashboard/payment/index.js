import {
  Button,
  Grid,
  IconButton,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
  styled,
} from "@mui/material";
import AdminLayout from "components/admin/AdminLayout";
import PaymentRow from "components/admin/TableRows/PaymentRow";
import AdminCard from "components/general/Cards/AdminCard";
import AdminTableHeader from "components/general/TableHead/Admin";
import heading from "constants/paymentHeading";
import Head from "next/head";
import { getPaymentsList } from "redux-store/admin/payment/payment.slice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import StyledSearch from "components/admin/StyledInputs/StyledSearch";
import PaymentFiterModal from "components/admin/Modals/PaymentsFilterModal";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import TableLimitSelector from "components/admin/Modals/TableLimitSelector";
import SearchPayment from "components/admin/Modals/PaymentListModal";
import { useTranslation } from "react-i18next";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  background: theme.palette.background.filter,
  border: "1px solid",
  borderColor: theme.palette.background.card,
  height: "40px",
}));

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const curPage = router?.query?.page;
  const curLimit = router?.query?.limit;

  const token = useSelector((state) => state.auth.token);
  const { list, pageCount, isGetLoading } = useSelector(
    (state) => state.payment
  );

  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(
      getPaymentsList({
        token,

        params: { page: curPage, filter: query, limit: curLimit },
      })
    );
  }, [token, curPage, curLimit]);

  const handleSearch = (event) => {
    setQuery(event.target.value);
    dispatch(
      getPaymentsList({
        token,

        params: { page: 1, filter: event.target.value, limit: 8 },
      })
    );
  };

  const handleFilterClear = () => {
    setPage(1);
    setQuery("");
    dispatch(
      getPaymentsList({
        token,

        params: { page: 1, filter: "", limit: 8 },
      })
    );
  };

  const handlePageChange = (event, newValue) => {
    router.push(
      `${router.pathname}?page=${newValue}&limit=${router?.query?.limit}`
    );
  };

  return (
    <>
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack my={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.legacy">
                {t("PaymentReqList")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" gap={2}>
                <SearchPayment />
                <PaymentFiterModal
                  initialValues={{ status: "all" }}
                  token={token}
                  page={curPage}
                  filter={query}
                />
                <Tooltip title={t("ClearFilter")}>
                  <StyledIconButton onClick={handleFilterClear}>
                    <SettingsBackupRestoreIcon />
                  </StyledIconButton>
                </Tooltip>

                <TableLimitSelector />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <AdminCard
                sx={{
                  minHeight: "70vh",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <TableContainer>
                  <Table aria-label="simple table">
                    <AdminTableHeader
                      hideSelectBtn
                      heading={heading}
                      rowCount={list?.length}
                    />
                    <TableBody>
                      {list.map((item, key) => (
                        <PaymentRow key={item._id} {...item} index={key} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack alignItems="flex-end" py={2}>
                  <Pagination
                    onChange={handlePageChange}
                    page={parseInt(curPage)}
                    count={pageCount}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
                </Stack>
              </AdminCard>
            </Grid>
          </Grid>
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
