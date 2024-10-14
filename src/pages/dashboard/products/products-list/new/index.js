import { Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { gtm } from "lib/gtm";
import { Box, Container } from "@mui/system";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import ProductCreateAndEdit from "components/dashboard/products/ProductCreateAndEdit";
import { useTranslation } from "react-i18next";

const ProductCreate = () => {
  const { t } = useTranslation("translation");

  const isLoading = useSelector((state) => state.productCreate.isLoading);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Vipcrm | {t("ForYourBusiness")}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container sx={{ px: { xs: 1 }, py: { xs: 6, md: 1 } }}>
          <Stack>
            <Typography variant="h5" color="text.legacy" mb={2}>
              {t("AddGoods")}
            </Typography>
            <ProductCreateAndEdit
              loading={isLoading}
              actionType="create"
              initialValues={{
                title: undefined,
                description: undefined,
                images: [],
                category: null,
                characteristics: [],
                adult: false,
                allowMarket: false,
                brand: null,
                video: null,
                madeIn: null,
                featureDescription: null,
                sizesDescription: null,
                manual: null,
              }}
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};

ProductCreate.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ProductCreate;
