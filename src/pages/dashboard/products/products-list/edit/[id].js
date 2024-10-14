import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminSingleProduct } from "redux-store/admin/products/get.slice";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Box, Container } from "@mui/system";
import Head from "next/head";
import ProductCreateAndEdit from "components/dashboard/products/ProductCreateAndEdit";
import { useTranslation } from "react-i18next";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const product = useSelector((state) => state.adminProducts.single);

  useEffect(() => {
    if (router?.query?.id) {
      dispatch(getAdminSingleProduct({ id: router?.query?.id }));
    }
  }, [router?.query?.id]);

  return (
    <>
      <Head>
        <title>Vipsavdo | {t("Management")}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container sx={{ px: { xs: 1 }, py: { xs: 6, md: 1 } }}>
          {product?.uid && (
            <ProductCreateAndEdit
              // loading={isLoading}
              actionType="update"
              initialValues={{
                title: product?.title,
                description: {},
                images: product?.images ? product.images : [],
                category: product?.category,
                characteristics: product?.characteristics,  
                adult: product?.adult,
                allowMarket: product?.allowMarket,
                brand: product?.brand,
                video: product?.video,
                madeIn: product?.madeIn,
                featureDescription: product?.featureDescription,
                sizesDescription: product?.sizesDescription,
                manual: product?.manual,
              }}
            />
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Page;
