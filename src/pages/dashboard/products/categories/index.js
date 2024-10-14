import {
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import AdminCard from "components/general/Cards/AdminCard";
import heading from "constants/adminCategoriesHeading";
import AdminTableHeader from "components/general/TableHead/Admin";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAllCategoryAction } from "redux-store/admin/category/get.slice";
import CategoriesRow from "components/admin/TableRows/CategoriesRow";
import ConfirmAddModal from "components/admin/Modals/CategoryAddModal";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Box, Container } from "@mui/system";
import SearchProductsByCategory from "components/admin/Modals/ProductsCategoryListModal";
import TableLimitSelector from "components/admin/Modals/TableLimitSelector";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const categories = useSelector((state) => state.categories.list);
  const searchCategories = useSelector((state) => state);
  const pageCount = useSelector((state) => state.categories.pageCount);
  const token = useSelector((state) => state.auth.token);

  const currentPage = parseInt(router?.query?.page);
  const currentLimit = parseInt(router?.query?.limit);

  const [filterValue, setFilter] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(
        getAllCategoryAction({
          token,
          params: { limit: currentLimit, page: currentPage, filter: "" },
        })
      );
    }
  }, [currentPage, currentLimit]);

  useEffect(() => {
    if (token) {
      dispatch(
        getAllCategoryAction({
          token,
          params: {
            limit: currentLimit,
            page: currentPage,
            filter: filterValue,
          },
        })
      );
    }
  }, [filterValue]);

  const categoryCallBack = () => {
    dispatch(
      getAllCategoryAction({
        token,
        params: { limit: currentLimit, page: currentPage, filter: filterValue },
      })
    );
  };

  const handlePageChange = (event, newValue) => {
    router.push(
      `${router.pathname}?page=${newValue}&limit=${
        router?.query?.limit === undefined ? 7 : router?.query?.limit
      }`
    );
  };
  return (
    <>
      <Head>
        <title> Vipcrm | {t("ForYourBusiness")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack py={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" color="text.legacy">
                {t("ProductCategories")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid
                container
                display="flex"
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                xs={12}
              >
                <Grid item xs={12} md={6} mb={{ xs: 2, md: 0 }}>
                  <SearchProductsByCategory />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sx={{
                    display: "flex",
                    alignItems: "end",
                    justifyContent: { xs: "space-between", md: "end" },
                    flexDirection: "row",
                  }}
                >
                  <Box sx={{ marginRight: { xs: "0", md: "2rem" } }}>
                    <TableLimitSelector />
                  </Box>
                  <Box>
                    <ConfirmAddModal fullWidth callback={categoryCallBack} />
                  </Box>
                </Grid>
              </Grid>
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
                  <Table arial-label="simple table">
                    <AdminTableHeader heading={heading} hideSelectBtn />
                    <TableBody>
                      {categories.map((item) => (
                        <CategoriesRow
                          key={item._id}
                          _id={item?._id}
                          uid={item?.uid}
                          avatar={item?.avatar}
                          createdAt={item.createdAt}
                          updatedAt={item?.updatedAt}
                          callback={categoryCallBack}
                          {...item}
                        />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Stack alignItems="flex-end" py={2}>
                  <Pagination
                    variant="outlined"
                    page={currentPage}
                    shape="rounded"
                    color="primary"
                    onChange={handlePageChange}
                    count={pageCount}
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
