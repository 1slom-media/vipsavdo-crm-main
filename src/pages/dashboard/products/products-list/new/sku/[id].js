import Head from "next/head";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { gtm } from "lib/gtm";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import ProductCreateAndEditSKU from "components/dashboard/products/SKUCreateAndEdit";
import { getProductSKUList } from "redux-store/product-sku/productSKU.slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const ProductCreateSKU = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const skuData = useSelector((state) => state.sku.data);
  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.sku.isUpdateLoading);

  useEffect(() => {
    if (router?.query?.id) {
      dispatch(getProductSKUList({ token, sku: router?.query?.id }));
    }
    gtm.push({ event: "page_view" });
  }, []);

  return (
    <>
      <Head>
        <title>Vipcrm | {t("ForYourBusiness")}</title>
      </Head>
      {skuData && (
        <ProductCreateAndEditSKU
          isLoading={isLoading}
          initialValues={{
            data: {
              ...skuData,
            },
          }}
        />
      )}
    </>
  );
};

ProductCreateSKU.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default ProductCreateSKU;
