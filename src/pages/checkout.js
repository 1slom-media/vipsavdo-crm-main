import { useEffect, useState } from "react";
import NextLink from "next/link";
import Head from "next/head";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { CheckoutBilling } from "../components/checkout/checkout-billing";
import { CheckoutOrderSummary } from "../components/checkout/checkout-order-summary";
import { ArrowLeft as ArrowLeftIcon } from "../icons/arrow-left";
import { ArrowRight as ArrowRightIcon } from "../icons/arrow-right";
import { Lock as LockIcon } from "../icons/lock";
import { gtm } from "../lib/gtm";
import { useTranslation } from "react-i18next";

const productsData = [
  {
    id: "97375399bf10f57d0f0f7fd9",
    image: "/static/mock-images/products-list/product_1.png",
    name: "Healthcare Erbology",
    price: 23.99,
    quantity: 1,
  },
  {
    id: "ece4069546ff025047b97735",
    image: "/static/mock-images/products-list/product_2.png",
    name: "Makeup Lancome Rouge",
    price: 95.0,
    quantity: 1,
  },
];

const Checkout = () => {
  const { t } = useTranslation("translation");
  const [billing, setBilling] = useState({
    address: "",
    cardExpirationDate: "",
    cardNumber: "",
    cardOwner: "",
    cardSecurityCode: "",
    firstName: "",
    lastName: "",
    optionalAddress: "",
    paymentMethod: "visa",
    state: "",
    zip: "",
  });
  const [products, setProducts] = useState(productsData);

  useEffect(() => {
    gtm.push({ event: "page_view" });
  }, []);

  const handleBillingChange = (event) => {
    setBilling((prevBilling) => ({
      ...prevBilling,
      [event.target.name]: event.target.value,
    }));
  };

  const handleProductQuantityChange = (event, productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        if (product.id === productId) {
          return {
            ...product,
            quantity: event.target.value,
          };
        }

        return product;
      })
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const subtotal = products.reduce(
    (accumulator, product) => accumulator + product.price * product.quantity,
    0
  );
  const shippingTax = 12;
  const total = subtotal + shippingTax;

  return (
    <>
      <Head>
        <title>
          {t("Checkout")} | Vipcrm | {t("ForYourBusiness")}
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          backgroundColor: "background.paper",
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <form onSubmit={handleSubmit}>
            <NextLink href="/dashboard" passHref>
              <Button
                component="a"
                startIcon={<ArrowLeftIcon fontSize="small" />}
              >
                {t("Dashboard")}
              </Button>
            </NextLink>
            <Typography variant="h3" sx={{ mt: 3 }}>
              {t("Checkout")}
            </Typography>
            <Box mt={6}>
              <Grid container spacing={6}>
                <Grid item md={7} xs={12}>
                  <CheckoutBilling
                    billing={billing}
                    onChange={handleBillingChange}
                  />
                </Grid>
                <Grid item md={5} xs={12}>
                  <CheckoutOrderSummary
                    onQuantityChange={handleProductQuantityChange}
                    products={products}
                    shippingTax={shippingTax}
                    subtotal={subtotal}
                    total={total}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ mt: 6 }}>
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <LockIcon fontWeight="small" sx={{ color: "text.secondary" }} />
                <Typography sx={{ ml: 2 }} variant="subtitle2">
                  {t("SecureCheckout")}
                </Typography>
              </Box>
              <Typography color="textSecondary" sx={{ mt: 2 }} variant="body2">
                {t("SecureCheckoutDesc")}
              </Typography>
              <Button
                color="primary"
                endIcon={<ArrowRightIcon fontSize="small" />}
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
              >
                {t("CompleteOrder")}
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Checkout;
