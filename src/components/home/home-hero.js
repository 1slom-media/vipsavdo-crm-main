import NextLink from "next/link";
import { Avatar, Box, Button, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { CheckCircleOutlined as CheckCircleOutlinedIcon } from "../../icons/check-circle-outlined";
import { Users as UsersIcon } from "../../icons/users";
import { Star as StarIcon } from "../../icons/star";
import { Template as TemplateIcon } from "../../icons/template";

export const HomeHero = (props) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        pt: 6,
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
        <Typography color="primary" variant="overline">
          TAKLIF
        </Typography>
        <Typography align="center" variant="h1">
          VIPCRM - Online magaziningiz uchun eng qulay boshqaruv tizimi
        </Typography>
        <Typography
          align="center"
          color="textSecondary"
          variant="subtitle1"
          sx={{ py: 3 }}
        >
          Ishonchli va mutlaqo havfsiz bo`lgan boshqaruv tizimi sizga
          mutloq qulay boshqaruv va hotirjamlikni taqdim etadi...
        </Typography>
        <Box
          sx={{
            alignItems: {
              sm: "center",
              xs: "flex-start",
            },
            display: "flex",
            flexDirection: {
              sm: "row",
              xs: "column",
            },
            py: 3,
            m: -1,
            "& > *": {
              m: 1,
            },
          }}
        >
          <Typography color="textSecondary" variant="caption">
            Avfzalliklari:
          </Typography>
          {["Qulay", "Ishonchli", "Xavfsiz", "Hamyonbop"].map((item) => (
            <Box
              key={item}
              sx={{
                alignItems: "center",
                display: "flex",
                m: 2,
              }}
            >
              <CheckCircleOutlinedIcon color="success" sx={{ mr: 1 }} />
              <Typography variant="subtitle2">{item}</Typography>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            mx: -1,
            mt: 2,
            mb: 6,
            "& > a": {
              m: 1,
            },
          }}
        >
          <NextLink href="/" passHref>
            <Button component="a" size="large" variant="outlined">
              Tizim haqida barchasi
            </Button>
          </NextLink>
          <NextLink href="/" passHref>
            <Button component="a" size="large" variant="contained">
              Biz bilan aloqa
            </Button>
          </NextLink>
        </Box>
      </Container>
      <Box
        sx={{
          maxWidth: 980,
          width: "100%",
          mx: "auto",
        }}
      >
        <Box
          sx={{
            position: "relative",
            pt: "calc(600 / 980 * 100%)",
            "& img": {
              height: "auto",
              position: "absolute",
              top: 0,
              width: "100%",
            },
          }}
        >
          <img alt="" src={`/static/home/hero_${theme.palette.mode}.png`} />
        </Box>
      </Box>
      <Box sx={{ py: 8 }}>
        <Container
          maxWidth="md"
          sx={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: {
              xs: "column",
              md: "row",
            },
            px: 3,
          }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                height: 40,
                mb: 2,
                width: 40,
              }}
              variant="rounded"
            >
              <UsersIcon fontSize="small" />
            </Avatar>
            <Typography
              sx={{
                color: "textPrimary",
                textAlign: "center",
              }}
              variant="h4"
            >
              4.5k+
            </Typography>
            <Typography sx={{ color: "textPrimary" }} variant="overline">
              Mamnun mijozlar
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "secondary.main",
                height: 40,
                mb: 2,
                width: 40,
              }}
              variant="rounded"
            >
              <StarIcon fontSize="small" />
            </Avatar>
            <Typography
              sx={{
                color: "textPrimary",
                textAlign: "center",
              }}
              variant="h4"
            >
              5/5
            </Typography>
            <Typography sx={{ color: "textPrimary" }} variant="overline">
              Darajali servis
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "warning.main",
                height: 40,
                mb: 2,
                width: 40,
              }}
              variant="rounded"
            >
              <TemplateIcon fontSize="small" />
            </Avatar>
            <Typography
              sx={{
                color: "textPrimary",
                textAlign: "center",
              }}
              variant="h4"
            >
              UI
            </Typography>
            <Typography sx={{ color: "textPrimary" }} variant="overline">
              Mutlaq qulaylik
            </Typography>
          </Box>
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Avatar
              sx={{
                backgroundColor: "info.main",
                height: 40,
                mb: 2,
                width: 40,
              }}
              variant="rounded"
            >
              <UsersIcon fontSize="small" />
            </Avatar>
            <Typography
              sx={{
                color: "textPrimary",
                textAlign: "center",
              }}
              variant="h4"
            >
              1M+
            </Typography>
            <Typography sx={{ color: "textPrimary" }} variant="overline">
              Kunlik foydalanuvchilar
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};
