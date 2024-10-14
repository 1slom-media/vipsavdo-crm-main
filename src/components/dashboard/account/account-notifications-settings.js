import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  Typography,
} from "@mui/material";

export const AccountNotificationsSettings = () => (
  <Card>
    <CardContent>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <Typography variant="h6">Telegram</Typography>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <div>
              <Typography variant="subtitle1">
                Mahsulot yangilanishlari
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
                Qo`shish, Yangilash, O`chirish
              </Typography>
            </div>
            <Switch defaultChecked />
          </Box>
          <Divider />
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <div>
              <Typography variant="subtitle1">
                Xavsizlik ogohlantirishlari
              </Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Xavfli deb topilgan xarakatlar to`g`risida ogohlantirish
              </Typography>
            </div>
            <Switch defaultChecked />
          </Box>
        </Grid>
      </Grid>
      <Divider sx={{ my: 3 }} />
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <Typography variant="h6">SMS habarlar</Typography>
        </Grid>
        <Grid item md={8} sm={12} xs={12}>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <div>
              <Typography variant="subtitle1">
                To`lovlar haqida oldindan habar
              </Typography>
              <Typography color="textSecondary" sx={{ mt: 1 }} variant="body2">
                To`lanadigan to`lovlar haqida oldindan ogohlantirish
              </Typography>
            </div>
            <Switch />
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);
