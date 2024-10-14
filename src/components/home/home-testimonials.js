import { Avatar, Box, Container, Typography } from "@mui/material";

export const HomeTestimonials = (props) => (
  <Box
    sx={{
      backgroundColor: "primary.main",
      py: 15,
    }}
    {...props}
  >
    <Container
      maxWidth="md"
      sx={{
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography align="center" color="primary.contrastText" variant="h3">
        VIPCRM o`z egalariga biznesni avtomatlashtirishga foydani maksimal
        darajada oshirishga yordam beradi.
      </Typography>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          mt: 3,
        }}
      >
        <Avatar
          // src="/static/home/olivier.png"
          sx={{ mr: 2 }}
          variant="rounded"
        />
        <div>
          <Typography color="primary.contrastText" variant="h6">
            VIP IT STUDIO 
          </Typography>
          <Typography color="primary.contrastText" variant="body2">
            info@vipit.uz
          </Typography>
        </div>
      </Box>
    </Container>
  </Box>
);
