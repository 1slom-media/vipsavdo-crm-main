import { Table, TableBody, TableContainer, Typography } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import AdminCard from "components/general/Cards/AdminCard";
import Head from "next/head";
import { useRouter } from "next/router";
import SubFeaturesAddModal from "components/admin/Modals/SubFeatureAddModal";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSubFeaturesList } from "../../../../redux-store/admin/subfeatures/subfeatures.slice";
import AdminTableHeader from "../../../../components/general/TableHead/Admin";
import SubFeaturesRow from "../../../../components/admin/TableRows/SubFeaturesRow";
import heading from "../../../../constants/SubFeaturesCategoriesHeading";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import BreadCurmbsCustom from "components/admin/Dashboard/BreadCurmbs";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const subfeatures = useSelector((state) => state.subfeatures.list);

  useEffect(() => {
    dispatch(
      getSubFeaturesList({
        token,
        params: { id: router.query.id },
      })
    );
  }, []);

  const routersTitle = {
    uz: "Hususiyatlar",
    ru: "Характеристики",
    en: "Features",
  };

  const routes = [
    {
      label: routersTitle[router.locale],
      link: "/dashboard/products/features",
    },
    { label: router?.query?.name },
  ];

  return (
    <Box>
      <Head>
        <title>{t("Feature")}</title>
      </Head>
      <Container>
        <Stack py={2}>
          <Stack
            direction={{ xs: "column", md: "row" }}
            alignItems={{ xs: "start", md: "center" }}
            justifyContent="space-between"
            my={3}
            mt={9}
          >
            <BreadCurmbsCustom list={routes} />
            <SubFeaturesAddModal />
          </Stack>
          <AdminCard
            sx={{
              minHeight: "70vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              borderRadius: "4px",
            }}
          >
            {subfeatures && subfeatures?.length > 0 ? (
              <TableContainer>
                <Table arial-label="simple table">
                  <AdminTableHeader heading={heading} hideSelectBtn />
                  <TableBody>
                    {subfeatures?.map((item, index) => (
                      <SubFeaturesRow
                        key={item.uid}
                        index={index}
                        id={item._id}
                        uid={item?.uid}
                        view={item?.view}
                        label={item?.title}
                        createdAt={item.createdAt}
                        updatedAt={item?.updatedAt}
                        callback={() => ""}
                        {...item}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box>
                <EmptyCard
                  txt="Ichki xususiyatlar mavjud emas ! "
                  img="/assets/media/noBlackList.png"
                />
              </Box>
            )}
          </AdminCard>
        </Stack>
      </Container>
    </Box>
  );
};

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Page;
