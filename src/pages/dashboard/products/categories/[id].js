import {
  Box,
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
  styled,
} from "@mui/material";
import ConfirmDeleteModal from "components/admin/Modals/ConfirmDeleteModal.jsx ";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getByCategoryAction } from "redux-store/products/byCategory.slice";
import InfoCategories from "components/admin/InfoCategories";
import AdminTableHeader from "components/general/TableHead/Admin";
import heading from "constants/adminSubCategoryHeading";
import AdminCard from "components/general/Cards/AdminCard";
import CategoryUpdateModal from "components/admin/Modals/CategoryUpdateModal";
import ProductsRow from "components/admin/TableRows/ProductsRow";
import BreadCurmbsCustom from "components/admin/Dashboard/BreadCurmbs";
import { useState } from "react";
import { deleteAdminCategory } from "redux-store/admin/category/delete.slice";
import useAlert from "hooks/useAlert";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Container } from "@mui/system";
import SubCategoryAddModal from "components/admin/Modals/CreateSubCategory";
import { getOneCategoryAction } from "redux-store/admin/category/get.slice";
import CategoriesRow from "components/admin/TableRows/CategoriesRow";
import SubCategoryRow from "components/admin/TableRows/SubCategoryRow";
import { useTranslation } from "react-i18next";

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.categoryDelete.isLoading);
  const categories = useSelector((state) => state.categories.data);
  const products = useSelector((state) => state?.categories?.data);

  const [modal, setModal] = useState(false);

  React.useEffect(() => {
    if (router?.query?.id) {
      dispatch(
        getOneCategoryAction({
          uid: router?.query?.id,
          token,
        })
      );
    }
  }, [router?.query?.id]);

  const routes = [
    { label: t("Kategoriyalar"), link: "/dashboard/products/categories" },
    { label: products?.title[router.locale] },
  ];

  const GetRequest = () => {
    if (router?.query?.id) {
      dispatch(
        getOneCategoryAction({
          uid: router?.query?.id,
          token,
        })
      );
    }
  };

  return (
    <>
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack py={{ xs: "72px", md: "32px" }}>
          <BreadCurmbsCustom list={routes} />
          <Grid bgcolor="background.lightBlue" xs={12} lg={12} container>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mb={1}
              width="100%"
            >
              <Typography
                variant="h6"
                color="secondary.100"
                display={{ xs: "none", md: "block" }}
              >
                {products?.title[router.locale]}
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                gap={3}
                justifyContent={{ xs: "space-between", md: "normal" }}
                width={{ xs: "100%", md: "auto" }}
              >
                <CategoryUpdateModal
                  label={products?.title}
                  avatar={products?.avatar}
                  uid={products?.uid}
                />
                <SubCategoryAddModal id={products?.uid} callback={GetRequest} />
              </Box>
            </Stack>
          </Grid>
          <AdminCard
            sx={{
              minHeight: "70vh",
              maxHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflowY: "auto",
              "::-webkit-scrollbar": {
                display: "none",
              },
            }}
          >
            <TableContainer
              sx={{
                overflowY: "auto",
                "::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Table aria-label="simple table">
                <AdminTableHeader heading={heading} hideSelectBtn />
                <TableBody>
                  {products?.children?.map((item) => (
                    <SubCategoryRow
                      key={item._id}
                      _id={item?._id}
                      uid={item?.uid}
                      avatar={item?.avatar}
                      label={item?.title}
                      {...item}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AdminCard>
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
