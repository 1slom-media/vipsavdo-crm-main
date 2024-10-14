import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";

export const BlogNewsletter = () => {
  const theme = useTheme();
  const { t } = useTranslation("translation");

  return (
    <Card
      elevation={16}
      sx={{
        py: 10,
        px: 8,
      }}
    >
      <Grid
        alignItems="center"
        container
        justifyContent="space-between"
        spacing={3}
        wrap="nowrap"
      >
        <Grid item md={8} xs={12}>
          <Box
            sx={{
              alignItems: "flex-start",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h4">{t("JoinDevList")}</Typography>
            <Typography
              color="textSecondary"
              variant="body2"
              sx={{
                mb: 3,
                mt: 1,
              }}
            >
              {t("SubNotEmail")}
            </Typography>
            <TextField
              fullWidth
              label={t("EmailAddress")}
              name="email"
              sx={{ flexGrow: 1 }}
              type="email"
            />
            <Button fullWidth size="large" sx={{ mt: 2 }} variant="contained">
              {t("Subscribe")}
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            display: {
              md: "block",
              xs: "none",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              pt: "calc(421 / 472 * 100%)",
              "& img": {
                height: "auto",
                position: "absolute",
                top: 0,
                width: "100%",
              },
            }}
          >
            <img alt="" src={`/static/blog/blog_${theme.palette.mode}.svg`} />
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};
