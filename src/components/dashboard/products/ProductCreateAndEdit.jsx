import { Button, Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";
import SwitchInput from "components/general/Inputs/Switch";
import AdminCard from "components/general/Cards/AdminCard";
import { reduxForm, Field, getFormValues, reset } from "redux-form";
import { useSelector, useDispatch } from "react-redux";
import { createAdminProduct } from "redux-store/admin/products/create.slice";
import useAlert from "hooks/useAlert";
import { getAllCategoryAction } from "redux-store/admin/category/get.slice";
import { useEffect } from "react";
import { gtm } from "lib/gtm";
import FeaturesSelect from "components/admin/Features/FeaturesSelect";
import { getAllFeaturesList } from "redux-store/admin/features/features.slice";
import CategorySelectForm from "components/admin/product-details/CategorySelectForm";
import VideoPicker from "components/admin/product-details/VideoPicker";
import ProductCreateStepper from "components/admin/product-details/Stepper";
import NameInputs from "components/admin/product-details/NameInputs";
import DescriptionInputs from "components/admin/product-details/DescriptionInputs";
import ImageLoaderForm from "components/admin/product-details/ImageLoaderForm";
import CountrySelectForm from "components/admin/product-details/CountrySelectForm";
import BrandSelectForm from "components/admin/product-details/BrandSelectForm";
import { useRouter } from "next/router";
import { updateAdminProduct } from "redux-store/admin/products/update.slice";

const ProductCreateAndEdit = ({ handleSubmit, actionType, loading }) => {
  const alert = useAlert();
  const token = useSelector((state) => state.auth.token);
  const router = useRouter();
  const dispatch = useDispatch();

  const data = useSelector((state) =>
    getFormValues("product_edit_create_form")(state)
  );

  const colorFeature = data?.characteristics?.find((feta) => {
    const confitition = feta?.values[0];
    return confitition?.isColor;
  });

  const callback = (data) => {
    dispatch(reset("product_edit_create_form"));
    router.push(`/dashboard/products/products-list/new/sku/${data?.data?.uid}`);
  };

  const addProduct = (values) => {
    dispatch(createAdminProduct({ data: values, token, alert, callback }));
  };

  const updateProduct = (values) => {
    dispatch(updateAdminProduct({ data: values, token, alert, callback }));
  };

  useEffect(() => {
    dispatch(getAllCategoryAction({ token, params: { limit: 20 } }));
    dispatch(getAllFeaturesList({ token, params: {} }));
    gtm.push({ event: "page_view" });
  }, []);

  const handleAction = (values) => {
    if (actionType === "create") {
      addProduct(values);
    }
    if (actionType === "update") {
      updateProduct(values);
    }
  };

  return (
    <>
      <Stack mb={4}>
        <ProductCreateStepper
          onSave={handleSubmit(handleAction)}
          step={0}
          isLoading={loading}
        />
      </Stack>
      <Stack gap="20px">
        <AdminCard>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Field component={NameInputs} name="title" />
            </Grid>
            <Grid item xs={12}>
              <Field
                component={DescriptionInputs}
                name="description"
                label_uz="Mahsulot O'zbekcha malumotlari"
                label_ru="Mahsulot Ruscha malumotlari"
                label_en="Mahsulot Inglizcha malumotlari"
              />
            </Grid>
          </Grid>
        </AdminCard>
        <Stack>
          <Typography mb={2}>TOVAR BO`YICHA UMUMIY RASMLAR</Typography>
          <AdminCard>
            <Grid container>
              <Grid item xs={12}>
                <Stack my={2}>
                  <Stack direction="row" gap="15px">
                    <Typography variant="string">Format:</Typography>
                    <Typography variant="caption">
                      PNG, JPEG, JPG, WEBP. Tavsiya etilgan aniqlik 1080×1440
                    </Typography>
                  </Stack>
                  <Stack direction="row" gap="15px">
                    <Typography variant="string">Hajmi:</Typography>
                    <Typography variant="caption">
                      fayl hajmi 5 MB dan oshmasligi kerak
                    </Typography>
                  </Stack>
                  <Stack direction="row" gap="15px">
                    <Typography variant="string">
                      Joylashish tartibi:
                    </Typography>
                    <Typography variant="caption">
                      birinchi rasm tovar kartasidagi asosiy rasmga aylanadi
                    </Typography>
                  </Stack>

                  <Stack direction="row" alignItems="center" gap="15px">
                    <Typography variant="string">Rasmlar turi:</Typography>
                    <Typography variant="caption">
                      studiyada suratga olingan, tomonlar nisbati 3×4
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" gap="15px">
                    <Typography variant="string">Orqa fon:</Typography>
                    <Typography variant="caption">
                      tovar #efefef rangli oq fonda suratga olingan boʻlishi
                      kerak
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Field component={ImageLoaderForm} name="images" />
              </Grid>
            </Grid>
          </AdminCard>
        </Stack>
        <Stack>
          <Typography mb={2}>MAHSULOT VIDEOSI</Typography>
          <AdminCard>
            <Stack mb={2}>
              <Typography variant="caption">
                FORMAT 1080*1440, HAJMI 10MB GACHA
              </Typography>
            </Stack>
            <Field
              component={VideoPicker}
              size="small"
              fullWidth
              name="video"
              label="Mahsulot videosi"
            />
          </AdminCard>
        </Stack>
        <Stack>
          <Typography mb={2}>MAHSULOT KATEGORIYASI</Typography>
          <AdminCard>
            <Field
              component={CategorySelectForm}
              size="small"
              fullWidth
              name="category"
              label="Mahsulot Kategoriyasi"
            />
          </AdminCard>
        </Stack>
        <Stack>
          <Typography mb={2}>MAHSULOT BRENDI</Typography>
          <AdminCard>
            <Field
              component={BrandSelectForm}
              size="small"
              fullWidth
              name="brand"
            />
          </AdminCard>
        </Stack>
        {/* Features */}
        <Stack>
          <Typography mb={2}>MAHSULOT ISHLAB CHIQARILGAN DAVLAT</Typography>
          <AdminCard>
            <Field
              component={CountrySelectForm}
              size="small"
              fullWidth
              name="madeIn"
            />
          </AdminCard>
        </Stack>
        {/* Features */}
        <Stack>
          <Typography color="text.legacy" variant="body2" mb={2}>
            MAHSULOT XUSUSIYATLARI
          </Typography>

          <AdminCard>
            <Stack>
              <Field
                component={FeaturesSelect}
                name="characteristics"
                label="Maxsulot xususiyatini tanlang"
                size={"small"}
              />
            </Stack>
          </AdminCard>
        </Stack>

        {/* Features */}
        {/* Features */}
        {colorFeature?.values?.length ? (
          <Stack>
            <Typography color="text.legacy" variant="body2" mb={2}>
              TANLANGAN RANG XUSUSIYAT SURATLARI
            </Typography>

            <AdminCard>
              {colorFeature?.values?.map((sub, indx) => (
                <Stack key={indx}>
                  <Typography my={3}>
                    {sub?.title[router?.locale]} suratlari
                  </Typography>
                  <Field
                    component={ImageLoaderForm}
                    name="images"
                    label="Maxsulot xususiyatini tanlang"
                    size={"small"}
                    isColorPhotos
                    color={sub}
                  />
                </Stack>
              ))}
            </AdminCard>
          </Stack>
        ) : null}

        {/* Features */}
        <Stack>
          <Typography mb={2}>MAHSULOT SOZLAMALARI</Typography>
          <AdminCard>
            <Grid container spacing={5}>
              <Grid item xs={12} md={6}>
                <Stack
                  direction="row"
                  alignItems="center"
                  bgcolor="background.lightGray"
                  gap="10px"
                >
                  <Field
                    component={SwitchInput}
                    name="blocked"
                    placeholder="Kategoriyani tanlang"
                  />
                  <Typography color="text.legacy" variant="string">
                    Mahsulotni qoralama sifatida saqlash
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack
                  direction="row"
                  alignItems="center"
                  bgcolor="background.lightGray"
                  gap="10px"
                >
                  <Field
                    component={SwitchInput}
                    name="allowMarket"
                    placeholder="Kategoriyani tanlang"
                  />
                  <Typography color="text.legacy" variant="string">
                    Reklama bo`limiga joylash
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={12} md={6}>
                <Stack
                  direction="row"
                  alignItems="center"
                  bgcolor="background.lightGray"
                  gap="10px"
                >
                  <Field
                    component={SwitchInput}
                    name="adult"
                    placeholder="Kategoriyani tanlang"
                  />
                  <Typography color="text.legacy" variant="string">
                    18 yoshdan yuqorilar uchun
                  </Typography>
                </Stack>
              </Grid>
            </Grid>
          </AdminCard>
        </Stack>
        <Stack>
          <Typography mb={2}>
            MAHSULOT QO`LLANMASI
            <Typography component="span" fontSize="9px" color="primary">
              {"   "}Kiritish shart emas
            </Typography>
          </Typography>
          <AdminCard>
            <Field
              component={DescriptionInputs}
              name="manual"
              label_uz="Mahsulot qo'llanmasi malumotlari O'zbekcha"
              label_ru="Mahsulot qo'llanmasi malumotlari Ruscha"
              label_en="Mahsulot qo'llanmasi malumotlari Inglizcha"
            />
          </AdminCard>
        </Stack>
        <Stack>
          <Typography mb={2}>
            MAHSULOT XUSUSIYATI MALUMOTLARI{" "}
            <Typography component="span" fontSize="9px" color="primary">
              {"   "}Kiritish shart emas
            </Typography>
          </Typography>
          <AdminCard>
            <Field
              component={DescriptionInputs}
              name="featureDescription"
              label_uz="Mahsulot hususiyatlari malumotlari O'zbekcha"
              label_ru="Mahsulot hususiyatlari malumotlari Ruscha"
              label_en="Mahsulot hususiyatlari malumotlari Inglizcha"
            />
          </AdminCard>
        </Stack>
        <Stack>
          <Typography mb={2}>
            MAHSULOT O`LCHAM MALUMOTLARI{" "}
            <Typography component="span" fontSize="9px" color="primary">
              {"   "}Kiritish shart emas
            </Typography>
          </Typography>
          <AdminCard>
            <Field
              component={DescriptionInputs}
              name="sizesDescription"
              label_uz="O'lcham malumotlari O'zbekcha"
              label_ru="O'lcham malumotlari Ruscha"
              label_en="O'lcham malumotlari Inglizcha"
            />
          </AdminCard>
        </Stack>
      </Stack>
    </>
  );
};

function validate(values, props) {
  let errors = {};
  const requiredFields = ["title", "description"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = {
        uz: "O'zbek tilidagi malumot kiritlmadi",
        ru: "Rus tilidagi malumot kiritlmadi",
        en: "Ingliz tilidagi malumot kiritlmadi",
      };
    }
    if (values[field]) {
      let customError = {};
      if (values[field] && !values[field]["uz"]) {
        customError["uz"] = "O'zbek tilidagi malumot kiritlmadi";
      }
      if (values[field] && !values[field]["ru"]) {
        customError["ru"] = "Rus tilidagi malumot kiritlmadi";
      }
      if (values[field] && !values[field]["en"]) {
        customError["en"] = "Ingliz tilidagi malumot kiritlmadi";
      }
      if (customError && Object.values(customError)?.length) {
        errors[field] = customError;
      }
    }
  });

  const halfRequiredFields = [
    "featureDescription",
    "sizesDescription",
    "manual",
  ];

  halfRequiredFields?.forEach((field) => {
    if (values[field]) {
      let customError = {};
      if (values[field] && !values[field]["uz"]) {
        customError["uz"] = "O'zbek tilidagi malumot kiritlmadi";
      }
      if (values[field] && !values[field]["ru"]) {
        customError["ru"] = "Rus tilidagi malumot kiritlmadi";
      }
      if (values[field] && !values[field]["en"]) {
        customError["en"] = "Ingliz tilidagi malumot kiritlmadi";
      }
      if (Object.values(customError)?.length > 0) {
        errors[field] = customError;
      }
    }
  });

  const singleRequiredFields = ["images"];

  singleRequiredFields.forEach((field) => {
    if (values[field] && values[field]?.length === 0) {
      errors[field] = "Talab etiladigan suratlar yuklanmadi";
    }
  });

  return errors;
}

export default reduxForm({
  form: "product_edit_create_form",
  validate,
  enableReinitialize: true,
})(ProductCreateAndEdit);
