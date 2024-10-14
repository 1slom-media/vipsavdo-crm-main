import {
  Grid,
  Box,
  Typography,
  CircularProgress,
  Divider,
  Rating,
  Tabs,
  Tab,
} from "@mui/material";
import { Container, Stack } from "@mui/system";
import BreadCurmbsCustom from "components/admin/Dashboard/BreadCurmbs";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getAdminSingleProduct } from "redux-store/admin/products/get.slice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ImgCarousel from "components/admin/Carusel/ImgCarousel";
import useAlert from "hooks/useAlert";
import SwitchInput from "components/general/Inputs/Switch";
import {
  setUpdateID,
  updateAdminProduct,
} from "redux-store/admin/products/update.slice";
import { updateAdminSpamProduct } from "redux-store/admin/products/updateSpam.slice";
import Link from "next/link";
import { StyledEditeBtn } from "components/admin/TableRows/ItemCategoriesRow";
import EditIcon from "components/icons/EditIcon";
import PriceAndFuture from "components/admin/product-details/PriceAndFuture";
import CommentProducts from "components/admin/product-details/CommentProducts";
import ReactHtmlParser from "react-html-parser";
import { useTranslation } from "react-i18next";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

const Page = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isUpdateLoading = useSelector((state) => state.productUpdate.isLoading);
  const updateID = useSelector((state) => state.productUpdate.updateID);
  const isSpamLoading = useSelector(
    (state) => state.productSpamUpdate.isLoading
  );
  const list = useSelector((state) => state.adminProducts.single);
  const uid = useSelector((state) => state.adminProducts.single.uid);

  const [panel, setPanel] = useState(0);

  React.useEffect(() => {
    if (router?.query?.id) {
      dispatch(
        getAdminSingleProduct({
          id: router?.query?.id,
          token,
        })
      );
    }
  }, [router?.query?.id]);

  const backArr = {
    uz: "Orqaga",
    ru: "Назад",
    en: "Back",
  };

  const reviewsList = {
    uz: "Ko'rishlar soni",
    ru: "Количество просмотров",
    en: "Reviews",
  };

  const callback = () => {
    if (router?.query?.id) {
      dispatch(
        getAdminSingleProduct({
          id: router?.query?.id,
          token,
        })
      );
    }
  };
  const handleChange = (event, newValue) => {
    setPanel(newValue);
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  return (
    <>
      <Head>
        <title>CRM {t("Mahsulot")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack py={{ xs: "72px", md: "12px" }}>
          <Grid
            container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: "10px",
            }}
          >
            <Grid item>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/dashboard/products/products-list")}
              >
                <ArrowBackIosIcon fontSize="14px" />
                <Typography color="text">{backArr[router.locale]}</Typography>
              </Box>
            </Grid>
            <Grid item sx={{ display: "flex" }}>
              <Box mr="10px">
                <Link href={`/dashboard/products/products-list/edit/${uid}`}>
                  <StyledEditeBtn>
                    <EditIcon />
                  </StyledEditeBtn>
                </Link>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Typography variant="body1" color="text">
                    {t("Advertising")}:
                  </Typography>
                </Box>
                <Box minWidth="58px">
                  {isUpdateLoading && updateID === list?.uid ? (
                    <CircularProgress size={30} />
                  ) : (
                    <SwitchInput
                      checked={list?.allowMarket}
                      onChange={(e) => {
                        const updatedRowData = {
                          allowMarket: e.target.checked,
                        };
                        dispatch(setUpdateID(uid));
                        dispatch(
                          updateAdminProduct({
                            data: updatedRowData,
                            token,
                            uid: uid,
                            callback,
                            alert,
                          })
                        );
                      }}
                    />
                  )}
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box>
                  <Box>
                    <Typography variant="body1" color="text">
                      {t("BlockProduct")} :
                    </Typography>
                  </Box>
                </Box>
                <Box minWidth="58px">
                  {isSpamLoading && updateID === uid ? (
                    <CircularProgress size={30} />
                  ) : (
                    <SwitchInput
                      checked={list?.blocked}
                      onChange={(e) => {
                        const updatedRowData = {
                          blocked: e.target.checked,
                        };
                        dispatch(setUpdateID(uid));
                        dispatch(
                          updateAdminSpamProduct({
                            data: updatedRowData,
                            token,
                            uid: uid,
                            callback,
                            alert,
                          })
                        );
                      }}
                    />
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
          <Divider variant="fullWidth" orientation="horizontal" />
          <Grid container px={3} pt={2} spacing={2} gap="20px" pb={4}>
            <Grid item xs={12} md={4}>
              <ImgCarousel imgArr={list.images} />
            </Grid>
            <Grid item>
              <Box maxWidth="600px" mb="15px">
                <Typography variant="h5" color="text">
                  {list?.title?.[router.locale]}
                </Typography>
              </Box>
              <Box
                mb="15px"
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Rating
                  name="half-rating-read"
                  defaultValue={list?.rating}
                  precision={0.5}
                  readOnly
                />
                <Typography variant="body" color="text">
                  ( {list?.reviewsAmount} {reviewsList[router.locale]})
                </Typography>
              </Box>
              <PriceAndFuture
                future={list?.characteristics}
                data={list.skuList}
              />
            </Grid>
          </Grid>
          <Divider variant="fullWidth" orientation="horizontal" />
          <Grid
            container
            sx={{ display: "block !important" }}
            xs={12}
            minHeight="500px"
          >
            <Box sx={{ width: "100%" }}>
              <Tabs
                value={panel}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Mahsulot tavsifi" {...a11yProps(0)} />
                <Tab label="Sharhlar (4)" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <Box>
              <CustomTabPanel value={panel} index={0}>
                <Typography variant="body1" color="text">
                  {ReactHtmlParser(list?.description?.[router.locale])}
                </Typography>
              </CustomTabPanel>
              <CustomTabPanel value={panel} index={1}>
                <CommentProducts list={list} />
              </CustomTabPanel>
            </Box>
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
