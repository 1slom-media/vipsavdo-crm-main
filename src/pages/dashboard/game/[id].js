import {
  Box,
  Grid,
  Typography,
  styled,
  Divider,
  TableContainer,
  Table,
  TableBody,
  Button,
} from "@mui/material";
import GameListRow from "components/admin/TableRows/GameListRow";
import Card1 from "components/general/Cards/Card1";
import AdminTableHeader from "components/general/TableHead/Admin";
import heading from "constants/gameListHeading";
import Head from "next/head";
import { useEffect } from "react";
import ReactHtmlParser from "react-html-parser";
import { useDispatch, useSelector } from "react-redux";
import format from "date-fns/format";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Container } from "@mui/system";
import Link from "next/link";
import ConfirmKonkursModal from "components/admin/Modals/ConfirmKonkursModal";
import { useRouter } from "next/router";
import { getGameById } from "redux-store/admin/game/game.slice";
import { Edit } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const StyledImgBox = styled(Box)(() => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
}));
const StyledBox = styled(Box)(({ theme }) => ({
  width: "100%",
  height: "430px",
  overflow: "hidden",
  borderRadius: "10px",
  [theme.breakpoints.down("md")]: {
    height: "250px",
    marginBottom: "20px",
  },
}));
const StyledTimeWrapperBox = styled(Box)(({ theme }) => ({
  borderRadius: "20px",
  height: "100%",
  background: theme.palette.background.main,
  overflow: "hidden",
}));
const StyledTimeBox = styled(Box)(() => ({
  padding: "35px 80px",
  position: "relative",
  "&:before": {
    content: "url(/assets/media/clock.svg)",
    width: "30px",
    height: "30px",
    position: "absolute",
    left: "20px",
  },
}));
const Page = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { t } = useTranslation("translation");

  const data = useSelector((state) => state.game.data?.data?.konkurs);
  const users = useSelector((state) => state.game.data.users);
  const id = useRouter().asPath.slice(16);

  useEffect(() => {
    dispatch(getGameById({ token, id }));
  }, [id]);

  return (
    <>
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: { xs: 10, md: 4 },
        }}
      >
        <Container maxWidth="xl">
          <Grid container>
            <Grid
              item
              xs={12}
              justifyContent="space-between"
              display="flex"
              mb={2}
              flexDirection={{ xs: "column", md: "row" }}
              gap={{ xs: "7px", md: "0" }}
            >
              <Typography variant="h5" color="text.legacy">
                {t("Konkurs")}
              </Typography>

              <Box style={{ display: "flex" }}>
                <Box style={{ marginRight: "1rem" }}>
                  <ConfirmKonkursModal />
                </Box>
                <Link href={`/dashboard/game/edit/${id}`}>
                  <Button
                    variant="contained"
                    color="warning"
                    style={{ marginRight: "1rem" }}
                  >
                    <Edit fontSize="17px" sx={{ marginRight: "5px" }} />
                    {t("Edit")}
                  </Button>
                </Link>
              </Box>
            </Grid>
          </Grid>
          {data ? (
            <Grid container>
              <Grid container xs={12} spacing={{ xs: 0, lg: 2 }} mb={1.5}>
                <Grid item xs={12} lg={9} md={12}>
                  <StyledBox>
                    <StyledImgBox
                      component="img"
                      src={data.banner}
                      alt="konkurImg"
                    />
                  </StyledBox>
                </Grid>
                <Grid item xs={12} md={12} lg={3}>
                  <StyledTimeWrapperBox>
                    <Box bgcolor="background.300" p={3.5}>
                      <Typography
                        variant="h6"
                        color="white"
                        textTransform="uppercase"
                      >
                        {t("DurationContest")}
                      </Typography>
                    </Box>

                    <StyledTimeBox>
                      <Typography
                        variant="string"
                        color="text.lightGray"
                        mb={2}
                      >
                        {t("StartDate")}:
                      </Typography>
                      <Typography variant="h6" color="text.legacy">
                        {data?.startTime &&
                          format(
                            new Date(data?.startTime),
                            "dd-MM-yyyy, HH:mm"
                          )}
                      </Typography>
                    </StyledTimeBox>
                    <Divider
                      variant="middle"
                      orientation="horizontal"
                      sx={{ borderStyle: "dashed" }}
                    />
                    <StyledTimeBox>
                      <Typography
                        variant="string"
                        color="text.lightGray"
                        mb={2}
                      >
                        {t("EndTime")}:
                      </Typography>
                      <Typography variant="h6" color="text.legacy">
                        {data?.endTime &&
                          format(new Date(data?.endTime), "dd-MM-yyyy, HH:mm")}
                      </Typography>
                    </StyledTimeBox>
                  </StyledTimeWrapperBox>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Card1>
                  <TableContainer>
                    <Table aria-label="simple table">
                      <AdminTableHeader
                        hideSelectBtn
                        heading={heading}
                        rowCount={users?.length}
                      />
                      <TableBody>
                        {users?.map((item, key) => (
                          <GameListRow key={key} {...item} index={key + 1} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Card1>
                <GameListRow />
              </Grid>
              <Grid item xs={12} mt={2}>
                <Card1>
                  <Typography
                    variant="subtitle2"
                    color="text.black"
                    textAlign="center"
                  >
                    {data?.name}
                  </Typography>

                  <Box sx={{ textAlign: "center", margin: "20px 0" }}>
                    {ReactHtmlParser(data?.content)}
                  </Box>
                </Card1>
              </Grid>
            </Grid>
          ) : (
            <EmptyPageWrapper>
              <EmptyCard
                img="/assets/media/no-data.png"
                txt={t("NoGameFound")}
              />
            </EmptyPageWrapper>
          )}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Page;
