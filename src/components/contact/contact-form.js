import {
  Box,
  Button,
  Grid,
  Link,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export const ContactForm = () => {
  const { t } = useTranslation("translation");
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            {t("FullName")} *
          </Typography>
          <TextField fullWidth name="name" required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            {t("CompanyName")}*
          </Typography>
          <TextField fullWidth name="company" required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            {t("WorkEmail")} *
          </Typography>
          <TextField fullWidth name="email" type="email" required />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            {t("PhoneNumber")} *
          </Typography>
          <TextField fullWidth name="phone" required type="tel" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            {t("CompanySize")}
          </Typography>
          <Select fullWidth>
            <MenuItem value="10-20">1-10</MenuItem>
            <MenuItem value="11-30">11-30</MenuItem>
            <MenuItem value="31-50">31-50</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            {t("Team")}
          </Typography>
          <Select fullWidth>
            <MenuItem value="engineering">{t("Engineering")}</MenuItem>
            <MenuItem value="design">{t("Design")}</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            {t("ProjectBudget")} *
          </Typography>
          <Select fullWidth required>
            <MenuItem value={20000}>$20,000+</MenuItem>
            <MenuItem value={50000}>$50,000+</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ mb: 1 }} variant="subtitle2">
            {t("Message")}
          </Typography>
          <TextField fullWidth name="message" required multiline rows={6} />
        </Grid>
      </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
        }}
      >
        <Button fullWidth size="large" variant="contained">
          {t("LetsTalk")}
        </Button>
      </Box>
      <Typography color="textSecondary" sx={{ mt: 3 }} variant="body2">
        {t("BySubmittingUAgree")}{" "}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          {t("PrivacyPolicy")}
        </Link>{" "}
        {t("And")}{" "}
        <Link
          color="textPrimary"
          href="#"
          underline="always"
          variant="subtitle2"
        >
          {t("CookiePolicy")}
        </Link>
        .
      </Typography>
    </form>
  );
};
