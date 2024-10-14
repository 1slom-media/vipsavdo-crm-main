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
import React, { useEffect } from "react";
import AdminCard from "components/general/Cards/AdminCard";
import heading from "constants/BrandsHeading";
import AdminTableHeader from "components/general/TableHead/Admin";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Box, Container } from "@mui/system";
import TableLimitSelector from "components/admin/Modals/TableLimitSelector";
import { useRouter } from "next/router";
import FeaturesListModal from "components/admin/Modals/FeaturesListModal";
import { getBrands } from "redux-store/brands/brands.slice";
import BrandsAddModal from "components/admin/Modals/BrandsAddModal";

import BrandRow from "components/admin/TableRows/BrandRow";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const pageCount = useSelector((state) => state.brands.countPage);
  const token = useSelector((state) => state.auth.token);

  const currentPage = router?.query?.page;
  const currentLimit = router?.query?.limit;

  const brandsList = useSelector((state) => state.brands.data);

  useEffect(() => {
    if (token) {
      dispatch(
        getBrands({
          token,
          params: { limit: currentLimit, page: currentPage, filter: "" },
        })
      );
    }
  }, [currentPage, currentLimit]);

  useEffect(() => {
    if (token) {
      dispatch(getBrands());
    }
  }, []);

  const categoryCallBack = () => {
    dispatch();
  };

  const handlePageChange = (event, newValue) => {
    router.push(
      `${router.pathname}?page=${newValue}&limit=${router?.query?.limit}`
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
                {t("Brendlar to'plami")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction={{ xs: "column-reverse", md: "row" }}
                alignItems="center"
                justifyContent="space-between"
                gap={{ xs: "15px" }}
              >
                <FeaturesListModal />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: { xs: "100%", md: "auto" },
                  }}
                >
                  <Box sx={{ marginRight: "2rem" }}>
                    <TableLimitSelector />
                  </Box>
                  <BrandsAddModal callback={categoryCallBack} />
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
                      {brandsList?.brands?.map((item) => (
                        <BrandRow key={item.uid} {...item} />
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
