import PropTypes from "prop-types";
import { Box, Button, Card, Chip, Typography } from "@mui/material";

export const OverviewBanner = (props) => {
  const { onDismiss, ...other } = props;

  return (
    <Card
      sx={{
        alignItems: "center",
        backgroundColor: "primary.main",
        color: "primary.contrastText",
        display: "flex",
        flexDirection: {
          xs: "column",
          md: "row",
        },
        p: 4,
      }}
      {...other}
    >
      <Box
        sx={{
          mr: 4,
          width: 200,
          height: 200,
          "& img": {
            height: 200,
            width: "auto",
          },
        }}
      >
        <img alt="" src="/static/banner-illustration.png" />
      </Box>
      <div>
        <div>
          <Chip color="secondary" label="Yangi" />
        </div>
        <Typography color="inherit" sx={{ mt: 2 }} variant="h4">
          Vipcrm platformasiga hush kelibsiz!
        </Typography>
        <Typography color="inherit" sx={{ mt: 1 }} variant="subtitle2">
          Yangilangan biznes boshqaruvi platformasi. Endi yanada ko`proq
          qulayliklar bilan.
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button color="secondary" onClick={onDismiss} variant="contained">
            Bannerni yopish
          </Button>
        </Box>
      </div>
    </Card>
  );
};

OverviewBanner.propTypes = {
  onDismiss: PropTypes.func,
};
