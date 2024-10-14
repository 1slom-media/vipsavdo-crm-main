import { Box, Card, Container, Grid, Link, Typography } from "@mui/material";

export const HomeClients = (props) => (
  <Box
    sx={{
      backgroundColor: "background.paper",
      py: 15,
    }}
    {...props}
  >
    <Container maxWidth="lg">
      <Typography align="center" sx={{ pb: 6 }} variant="h3">
        Biz sizga eng yaxshisini taklif qilamiz
      </Typography>
      <Grid container spacing={3}>
        <Grid item md={6} xs={12}>
          <Card
            sx={{
              height: "100%",
              p: 3,
              position: "relative",
            }}
            variant="outlined"
          >
            <Typography sx={{ color: "textPrimary" }} variant="h5">
              Foydalanish
            </Typography>
            <Typography
              sx={{
                color: "textPrimary",
                py: 2,
              }}
              variant="body2"
            >
              Qanday foydalanish mumkin
            </Typography>
            <Link
              href="/docs/welcome"
              color="textPrimary"
              underline="always"
              variant="body1"
            >
              Usbu havola orqali tashrif buyurishingiz mumkin
            </Link>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card
            sx={{
              height: "100%",
              p: 3,
              position: "relative",
            }}
            variant="outlined"
          >
            <Typography sx={{ color: "textPrimary" }} variant="h5">
              Qulayliklar
            </Typography>
            <Typography
              sx={{
                color: "textPrimary",
                py: 2,
              }}
              variant="body2"
            >
              Bizda barcha qulayliklar mavjud
            </Typography>
            <Link
              href="/browse"
              color="textPrimary"
              underline="always"
              variant="body1"
            >
              Usbu havola orqali tashrif buyuring
            </Link>
          </Card>
        </Grid>
      </Grid>
    </Container>
  </Box>
);
