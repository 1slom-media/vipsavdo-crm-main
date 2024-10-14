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
import heading from "constants/FeaturesCategoriesHeading";
import AdminTableHeader from "components/general/TableHead/Admin";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Box, Container } from "@mui/system";
import TableLimitSelector from "components/admin/Modals/TableLimitSelector";
import { useRouter } from "next/router";
import FeaturesRow from "components/admin/TableRows/FeaturesRow";
import { getFeaturesList } from "redux-store/admin/features/features.slice";
import FeaturesListModal from "components/admin/Modals/FeaturesListModal";
import FeaturesAddModal from "components/admin/Modals/FeaturesAddModal";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const features = useSelector((state) => state.features.list);
  const pageCount = useSelector((state) => state.features.pageCount);
  const token = useSelector((state) => state.auth.token);

  const currentPage = router?.query?.page;
  const currentLimit = router?.query?.limit;

  const [filterValue, setFilter] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(
        getFeaturesList({
          token,
          params: { limit: currentLimit, page: currentPage, filter: "" },
        })
      );
    }
  }, [currentPage, currentLimit]);

  useEffect(() => {
    if (token) {
      dispatch(
        getFeaturesList({
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
      getFeaturesList({
        token,
        params: { limit: currentLimit, page: currentPage, filter: filterValue },
      })
    );
  };

  const handlePageChange = (event, newValue) => {
    router.push(
      `${router.pathname}?page=${newValue}&limit=${router?.query?.limit}`
    );
  };

  useEffect(() => {
    dispatch(getFeaturesList({ token, params: {} }));
  }, []);
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
                {t("Hususiyatlar")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                flexDirection={{ xs: "column-reverse", md: "row" }}
              >
                <FeaturesListModal />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "space-between", md: "normal" },
                    width: { xs: "100%", md: "auto" },
                    marginBottom: { xs: "20px", md: "0" },
                  }}
                >
                  <Box style={{ marginRight: "2rem" }}>
                    <TableLimitSelector />
                  </Box>
                  <FeaturesAddModal callback={categoryCallBack} />
                </Box>
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
                  <Table arial-label="simple table">
                    <AdminTableHeader heading={heading} hideSelectBtn />
                    <TableBody>
                      {features?.map((item) => (
                        <FeaturesRow
                          key={item.uid}
                          uid={item?.uid}
                          title={item?.title}
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
                    page={parseInt(currentPage)}
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
