import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography
} from '@mui/material';

const paymentMethods = [
  {
    label: 'Visa Credit/Debit Card',
    value: 'visa'
  },
  {
    label: 'PayPal',
    value: 'paypal'
  }
];

export const Form13 = () => (
  <Box
    sx={{
      backgroundColor: 'background.paper',
      minHeight: '100%',
      p: 3
    }}
  >
    <form onSubmit={(event) => event.preventDefault()}>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex'
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 20,
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            width: 40
          }}
        >
          <Typography
            sx={{ fontWeight: 'fontWeightBold' }}
            variant="h6"
          >
            1
          </Typography>
        </Box>
        <Typography
          sx={{ ml: 2 }}
          variant="h6"
        >
          Billing Address
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label={t("FirstName")}
              name="firstName"
            />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label={t("LastName")}
              name="lastName"
            />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label={t("StreetAddress")}
              name="address"
            />
          </Grid>
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label={t("StreetLine")}
              name="optionalAddress"
            />
          </Grid>
          <Grid
            item
            sm={3}
            xs={12}
          >
            <TextField
              fullWidth
              label="State"
              name="state"
            />
          </Grid>
          <Grid
            item
            sm={3}
            xs={12}
          >
            <TextField
              fullWidth
              label={t("Zip")}
              name="zip"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 6
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 20,
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            width: 40
          }}
        >
          <Typography
            sx={{ fontWeight: 'fontWeightBold' }}
            variant="h6"
          >
            2
          </Typography>
        </Box>
        <Typography
          sx={{ ml: 2 }}
          variant="h6"
        >
          {t("ShippingAddress")}
        </Typography>
      </Box>
      <Box
        sx={{
          color: 'text.primary',
          mt: 3
        }}
      >
        <FormControlLabel
          control={(
            <Checkbox
              defaultChecked
              sx={{ ml: 1 }}
            />
          )}
          label={t("SameBillingAdd")}
        />
      </Box>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          mt: 6
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            border: (theme) => `1px solid ${theme.palette.divider}`,
            borderRadius: 20,
            display: 'flex',
            height: 40,
            justifyContent: 'center',
            width: 40
          }}
        >
          <Typography
            sx={{ fontWeight: 'fontWeightBold' }}
            variant="h6"
          >
            3
          </Typography>
        </Box>
        <Typography
          sx={{ ml: 2 }}
          variant="h6"
        >
          {t("PaymentMethod")}
        </Typography>
      </Box>
      <Box sx={{ mt: 3 }}>
        <RadioGroup
          name="paymentMethod"
          sx={{ flexDirection: 'row' }}
        >
          {paymentMethods.map((paymentMethod) => (
            <FormControlLabel
              control={<Radio sx={{ ml: 1 }} />}
              key={paymentMethod.value}
              label={(
                <Typography variant="body1">
                  {paymentMethod.label}
                </Typography>
              )}
              value={paymentMethod.value}
            />
          ))}
        </RadioGroup>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label={t("NameOnCard")}
              name="cardOwner"
            />
          </Grid>
          <Grid
            item
            sm={6}
          />
          <Grid
            item
            sm={6}
            xs={12}
          >
            <TextField
              fullWidth
              label={t("CardNumber")}
              name="cardNumber"
            />
          </Grid>
          <Grid
            item
            sm={6}
          />
          <Grid
            item
            sm={3}
            xs={12}
          >
            <TextField
              fullWidth
              label={t("ExpireDate")}
              name="cardExpirationDate"
              placeholder="MM/YY"
            />
          </Grid>
          <Grid
            item
            sm={3}
            xs={12}
          >
            <TextField
              fullWidth
              label={t("SecurityCode")}
              name="cardSecurityCode"
            />
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mt: 3
        }}
      >
        <Button
          type="submit"
          variant="contained"
        >
          Submit
        </Button>
      </Box>
    </form>
  </Box>
);
