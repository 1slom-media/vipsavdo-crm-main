import {
  Box,
  Button,
  Grid,
  Stack,
  styled,
  Typography,
  IconButton,
} from "@mui/material";
import CaruselModal1 from "components/admin/Modals/CaruselModal1";
import { useTranslation } from "react-i18next";
const StyledBox = styled(Box)(({ theme }) => ({
  background: "linear-gradient(155.28deg, #383638 9.94%, #000000 43.76%)",
  borderRadius: "40px",
  width: "100%",
  height: "300px",
}));

const StyledImgBox = styled(Box)(({ theme }) => ({
  width: "250px",
  height: "200px",
  position: "absolute",
  right: "50px",
  bottom: "50px",
}));
const StyledImg = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "100%",
}));

const Page = ({ data }) => {
  const { t } = useTranslation("translation");

  return (
    <StyledBox px={8} position="relative">
      <CaruselModal1 />
      <Grid container display="flex" flexDirection="column">
        <Grid item xs={12} md={6} pt={4} mb={5}>
          <Typography
            variant="h6"
            color="light.main"
            sx={{ wordBreak: "break-word" }}
          >
            {data?.title}
          </Typography>
        </Grid>

        <Grid item xs={12} md={6} mb={3}>
          <Typography
            variant="string"
            color="light.main"
            sx={{ wordBreak: "break-word" }}
          >
            {data?.text}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button className="mdBl" color="primary" variant="contained">
            {t("Buy")}
          </Button>
        </Grid>
      </Grid>
      <StyledImgBox>
        <StyledImg component="img" src={data?.img} alt="banner-img" />
      </StyledImgBox>
    </StyledBox>
  );
};
export default Page;
