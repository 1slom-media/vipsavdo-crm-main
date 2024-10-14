import {
  Box,
  Grid,
  Typography,
  TableContainer,
  Table,
  TableBody,
  Button,
  TableHead,
  TableRow,
  TableCell,
  Avatar,
  Card,
  Chip,
} from "@mui/material";
import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminGame } from "redux-store/admin/game/game.slice";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import { Container } from "@mui/system";
import Link from "next/link";
import { StyledEditeBtn } from "components/admin/TableRows/ItemCategoriesRow";
import ViewIcon from "components/icons/ViewIcon";
import { useRouter } from "next/router";
import DeleteGameModal from "components/admin/Modals/DeleteGameModal";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
const Page = () => {
  const dispatch = useDispatch();
  const route = useRouter();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const gameData = useSelector((state) => state?.game?.data?.competitions);

  useEffect(() => {
    dispatch(getAdminGame({ token }));
  }, [route]);

  const checkFnc = () => dispatch(getAdminGame({ token }));

  return (
    <>
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Grid container pt={6}>
            <Grid
              item
              xs={12}
              justifyContent="space-between"
              display="flex"
              mb={2}
              flexDirection={{ xs: "column-reverse", md: "row" }}
              gap="10px"
            >
              <Typography variant="h5" color="text.legacy">
                {t("GameList")}
              </Typography>
              <Box
                style={{
                  display: "flex",
                }}
              >
                <Link href={"/dashboard/game/add"}>
                  <Button
                    startIcon={<AddIcon />}
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth={{ xs: true, md: false }}
                  >
                    {t("AddGame")}
                  </Button>
                </Link>
              </Box>
            </Grid>

            <TableContainer
              sx={{
                height: "72vh",
                "&::-webkit-scrollbar": {
                  display: "none",
                },
              }}
            >
              <Card>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>{t("Image")}</TableCell>
                      <TableCell>{t("Nomi")}</TableCell>
                      <TableCell>{t("StartDate")} </TableCell>
                      <TableCell>{t("EndTime")}</TableCell>
                      <TableCell>{t("Holati")}</TableCell>
                      <TableCell>{t("Action")}</TableCell>
                    </TableRow>
                  </TableHead>

                  {gameData?.length < 0 ? (
                    <>Sabir</>
                  ) : (
                    <TableBody>
                      {gameData?.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <Avatar
                              src={item.banner}
                              sx={{ width: 46, height: 46 }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box>
                              <Typography sx={{ ml: 1 }} variant="subtitle2">
                                {item.name}
                              </Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box>{item.startTime?.slice(0, 10)}</Box>
                          </TableCell>
                          <TableCell>{item.endTime?.slice(0, 10)}</TableCell>
                          <TableCell>
                            {item.status === 1 ? (
                              <Chip color="primary" label="Faol" />
                            ) : (
                              <Chip color="error" label="Faol emas" />
                            )}
                          </TableCell>
                          <TableCell>
                            <Box display="flex">
                              <Link href={`/dashboard/game/${item._id}`}>
                                <StyledEditeBtn>
                                  <ViewIcon />
                                </StyledEditeBtn>
                              </Link>
                              <DeleteGameModal
                                id={item?._id}
                                callBack={checkFnc}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  )}
                </Table>
              </Card>
            </TableContainer>
          </Grid>
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
