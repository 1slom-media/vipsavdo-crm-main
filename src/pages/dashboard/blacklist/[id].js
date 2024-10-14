import {
  Grid,
  Pagination,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import ConfirmPhoneModal from "components/admin/Modals/AddBlacklistedModal";
import StyledSearch from "components/admin/StyledInputs/StyledSearch";
import BlackListRow from "components/admin/TableRows/BlackListRow";
import { AuthGuard } from "components/authentication/auth-guard";
import { DashboardLayout } from "components/dashboard/dashboard-layout";
import AdminCard from "components/general/Cards/AdminCard";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import AdminTableHeader from "components/general/TableHead/Admin";
import heading from "constants/blackListHeading";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBlackList } from "redux-store/admin/blacklist/blacklist.slice";

const Page = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const { list, countPage } = useSelector((state) => state.blacklist);

  const router = useRouter();

  const handlePageChange = (event, value) => {
    router.push(`/dashboard/blacklist/${value}`);
  };

  useEffect(() => {
    if (token && router?.query?.id) {
      dispatch(getBlackList({ token, page: router?.query?.id }));
    }
  }, [token, router?.query?.id]);

  return (
    <>
      <Head>
        <title>{t("CrmAdmin")}</title>
      </Head>
      <Container maxWidth="xl">
        <Stack my={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5" color="text.legacy">
                {t("BlackList")}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <StyledSearch placeholder={t("SearchProduct") + "..."} />
                <ConfirmPhoneModal />
              </Stack>
            </Grid>
            <Grid item xs={12}>
              {list.length > 0 ? (
                <AdminCard
                  sx={{
                    minHeight: "70vh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <TableContainer>
                    <Table arial-label="simple table">
                      <AdminTableHeader heading={heading} hideSelectBtn />
                      <TableBody>
                        {list.map((item, key) => (
                          <BlackListRow key={key} {...item} />
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                  {countPage > 0 ? (
                    <Stack alignItems="flex-end" py={2}>
                      <Pagination
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                        count={countPage}
                        page={router?.query?.id ? parseInt(router.query.id) : 1}
                        onChange={handlePageChange}
                      />
                    </Stack>
                  ) : (
                    <></>
                  )}
                </AdminCard>
              ) : (
                <EmptyPageWrapper>
                  <EmptyCard
                    txt={t("NoNumberAvailable")}
                    img="/assets/media/noBlackList.png"
                  />
                </EmptyPageWrapper>
              )}
            </Grid>
          </Grid>
        </Stack>
      </Container>
    </>
  );
};

Page.getLayout = (page) => (
  <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  </AuthGuard>
);

export default Page;
