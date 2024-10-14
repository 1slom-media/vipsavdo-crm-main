import { Stack, Grid, Typography, Button, styled } from "@mui/material";
import Head from "next/head";
import AddIcon from "@mui/icons-material/Add";
import AdminCard from "../../../../components/general/Cards/AdminCard";
import AdminTableHeader from "../../../../components/general/TableHead/Admin";
import Link from "next/link";
import heading from "../../../../constants/adminProductsHeading";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ProductsRow from "../../../../components/admin/TableRows/ProductsRow";
import Pagination from "@mui/material/Pagination";
import EmptyPageWrapper from "../../../../components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "../../../../components/general/ErrorBoundry/EmptyCard";
import { getAdminProducts } from "../../../../redux-store/admin/products/get.slice";
import { AuthGuard } from "../../../../components/authentication/auth-guard";
import { DashboardLayout } from "../../../../components/dashboard/dashboard-layout";
import { Container } from "@mui/system";
import SearchProducts from "../../../../components/admin/Modals/ProductsListModal";
import { useRouter } from "next/router";
import TableLimitSelector from "../../../../components/admin/Modals/TableLimitSelector";
import { Box } from "@mui/system";
import { useTranslation } from "react-i18next";

const StyledStack = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column-reverse",
  },
}));

const StyledBox = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    flexDirection: "column-reverse",
    width: "100%",
    gap: "10px",
    marginBottom: "10px",
  },
}));

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const currentPage = parseInt(router?.query?.page);
  const currentLimit = parseInt(router?.query?.limit);

  const [filterValue, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const { list, pageCount, isLoading } = useSelector(
    (state) => state.adminProducts
  );
  const token = useSelector((state) => state.auth.token);

  // useEffect(() => {
  //   setPage(localStorage.getItem("page"));
  // }, []);

  useEffect(() => {
    dispatch(
      getAdminProducts({
        params: {
          page: currentPage,
          limit: currentLimit || 7,
        },
        token,
      })
    );
  }, [currentPage, currentLimit]);

  const handlePageChange = (event, newValue) => {
    router.push(
      `${router.pathname}?page=${newValue}&limit=${router?.query?.limit}`
    );
  };

  const rowCallback = () => {
    dispatch(
      getAdminProducts({
        params: { page, filter: filterValue, limit: 7 },
        token,
      })
    );
  };

  return (
    <Container maxWidth="xl">
      <Head>
        <title>Vipsavdo | {t("Mahsulotlar ro'yhati")}</title>
      </Head>
      <Stack py={4} pt={{ xs: 9, md: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5" color="text.legacy">
              {t("Mahsulotlar ro'yhati")}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <StyledStack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <SearchProducts />
              <StyledBox style={{ display: "flex", gap: "10px" }}>
                <Box style={{ marginRight: { sx: "0rem", md: "2rem" } }}>
                  <TableLimitSelector />
                </Box>

                <Link href="/dashboard/products/products-list/new">
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    color="primary"
                    size="small"
                  >
                    {t("Mahsulot qo'shish")}
                  </Button>
                </Link>
              </StyledBox>
            </StyledStack>
          </Grid>
          <Grid item xs={12} flex="1 1 auto">
            {!list.length && !isLoading ? (
              <EmptyPageWrapper>
                <EmptyCard
                  img="/assets/media/no-data.png"
                  txt={t("UnavailableProduct")}
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
                      rowCount={list.length}
                    />
                    <TableBody>
                      {list.map((item) => (
                        <ProductsRow
                          callback={rowCallback}
                          key={item._id}
                          {...item}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack alignItems="flex-end" py={2}>
                  <Pagination
                    onChange={handlePageChange}
                    count={pageCount}
                    page={currentPage}
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
  );
};

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Page;
