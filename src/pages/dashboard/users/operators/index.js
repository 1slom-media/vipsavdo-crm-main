import { Stack, Grid, Typography } from "@mui/material";
import Head from "next/head";
import AdminCard from "../../../../components/general/Cards/AdminCard";
import AdminTableHeader from "../../../../components/general/TableHead/Admin";
import heading from "../../../../constants/adminCustomersHeading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Pagination from "@mui/material/Pagination";
import EmptyPageWrapper from "../../../../components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "../../../../components/general/ErrorBoundry/EmptyCard";
import { getOperatorsList } from "../../../../redux-store/admin/operators/operator.slice";
import OperatorsRow from "../../../../components/admin/TableRows/OperatorsRow";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { Container } from "@mui/system";
import { useRouter } from "next/router";
import TableLimitSelector from "../../../../components/admin/Modals/TableLimitSelector";
import SearchOperators from "../../../../components/admin/Modals/OperatorsListModal";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const pageParam = router?.query?.page;
  const limitParam = router?.query?.limit;

  const token = useSelector((state) => state.auth.token);
  const operators = useSelector((state) => state.operators.list);
  const pageCount = useSelector((state) => state.operators.pageCount);
  const isLoading = useSelector((state) => state.operators.isGetLoading);

  const isUserBlockLoading = useSelector(
    (state) => state.customers.isUpdateLoading
  );

  useEffect(() => {
    if (token) {
      dispatch(
        getOperatorsList({
          token,

          params: { page: pageParam, limit: limitParam, filter: "" },
        })
      );
    }
  }, [token, pageParam, limitParam, isUserBlockLoading]);

  const handleChangePage = (event, newValue) => {
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
                {t("OperatorsList")}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <SearchOperators />
              </Stack>
              <Stack>
                <TableLimitSelector />
              </Stack>
            </Grid>
            <Grid item xs={12} flex="1 1 auto">
              {!operators.length && !isLoading ? (
                <EmptyPageWrapper>
                  <EmptyCard
                    img="/assets/media/no-data.png"
                    txt={t("NoOperatorAdded")}
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
                        rowCount={operators.length}
                      />
                      <TableBody>
                        {operators.map((operator) => (
                          <OperatorsRow key={operator._id} {...operator} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Stack alignItems="flex-end" py={2}>
                    <Pagination
                      onChange={handleChangePage}
                      page={parseInt(pageParam)}
                      count={pageCount}
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
