import { Stack, Grid, Typography } from "@mui/material";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import Head from "next/head";
import AdminCard from "../../../../components/general/Cards/AdminCard";
import AdminTableHeader from "../../../../components/general/TableHead/Admin";
import heading from "../../../../constants/adminCustomersHeading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import EmptyPageWrapper from "../../../../components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "../../../../components/general/ErrorBoundry/EmptyCard";
import UsersRow from "../../../../components/admin/TableRows/UsersRow";
import { getCustomersList } from "../../../../redux-store/admin/customers/customers.slice";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import TableLimitSelector from "../../../../components/admin/Modals/TableLimitSelector";
import SearchCustomers from "../../../../components/admin/Modals/CustomersListModal";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const pageParam = router?.query?.page;
  const limitParam = router?.query?.limit;

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.customers.isGetLoading);

  const isUserBlockLoading = useSelector(
    (state) => state.customers.isUpdateLoading
  );
  const { customers, countPage } = useSelector((state) => state.customers);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (token) {
      dispatch(
        getCustomersList({
          token,

          params: { page: pageParam, limit: limitParam, filter: "" },
        })
      );
    }
  }, [token, pageParam, limitParam, isUserBlockLoading]);

  const handleChangePage = (event, newValue) => {
    setPage(newValue);
    router.push(`${router.pathname}?page=${newValue}&limit=${limitParam}`);
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
              <Typography variant="h5" color="text.legacy">
                {t("UsersList")}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                alignItems: { xs: "start", md: "center" },
                justifyContent: "space-between",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: "10px", md: "0" },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <SearchCustomers />
              </Stack>
              <Stack width={{ xs: "100%", md: "auto" }}>
                <TableLimitSelector />
              </Stack>
            </Grid>
            <Grid item xs={12} flex="1 1 auto">
              {!customers.length && !isLoading ? (
                <EmptyPageWrapper>
                  <EmptyCard
                    img="/assets/media/no-data.png"
                    txt={t("NoUserListFound")}
                  />
                </EmptyPageWrapper>
              ) : (
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
                        rowCount={customers.length}
                      />
                      <TableBody>
                        {customers.map((cust) => (
                          <UsersRow key={cust._id} {...cust} page={page} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Stack alignItems="flex-end" py={2}>
                    <Pagination
                      onChange={handleChangePage}
                      page={parseInt(pageParam)}
                      count={countPage}
                      color="primary"
                      variant="outlined"
                      shape="rounded"
                    />
                  </Stack>
                </AdminCard>
              )}
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
