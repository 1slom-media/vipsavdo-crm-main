import {
  Box,
  IconButton,
  Modal,
  Stack,
  Table,
  TableBody,
  TableContainer,
  Typography,
  styled,
} from "@mui/material";
import CloseIcon from "components/icons/CloseIcon";
import React from "react";
import StyledSearch from "../StyledInputs/StyledSearch";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../Loaders/SerarchLoader";
import AdminTableHeader from "components/general/TableHead/Admin";
import { useRouter } from "next/router";
import { searchCustomer } from "redux-store/admin/customers/customers.slice";
import UsersRow from "../TableRows/UsersRow";
import { useTranslation } from "react-i18next";

const StyledIconBtn = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  borderRadius: "50%",
  background: theme.palette.background[200],
  width: "35px",
  height: "35px",
}));

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "98%", sm: 400, lg: 750 },
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "20px",
  outline: "none",
  minHeight: 150,
  paddingBottom: 5,
};

const SearchCustomers = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { t } = useTranslation("translation");

  const pageParam = router?.query?.page;
  const limitParam = router?.query?.limit;

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.customers.searchLoading);
  const list = useSelector((state) => state?.customers?.searchList);

  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilter] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    // dispatch(searchOrders({ token, query: e.target.value }));
    setFilter(e.target.value);
    dispatch(
      searchCustomer({
        params: { page: pageParam, filter: e.target.value, limit: limitParam },
        token,
      })
    );
  };
  return (
    <main>
      <StyledSearch
        onClick={handleOpen}
        placeholder={`${t("SearchUsers")}...`}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            py={1}
            px={2}
          >
            <Typography variant="h6" color="secondary.100">
              {t("SearchUsers")}
            </Typography>
            <StyledIconBtn onClick={handleClose}>
              <CloseIcon />
            </StyledIconBtn>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            py={1.5}
            px={{ xs: 1, sm: 2, lg: 6 }}
            bgcolor="background.gray"
          >
            <StyledSearch
              onChange={handleSearch}
              value={filterValue}
              placeholder={`${t("Mahsulotlarni qidirish")}...`}
              sx={{ width: "100%" }}
            />
          </Stack>
          {isLoading ? (
            <Stack py={4}>
              <SearchLoader />
            </Stack>
          ) : list?.length ? (
            <TableContainer
              sx={{
                "&::-webkit-scrollbar": {
                  height: "7px",
                },
                "&::-webkit-scrollbar-track": {
                  boxShadow: "inset 0 0 5px #10986f",
                  borderRadius: "5px",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#10986f",
                  borderRadius: "10px",
                },
              }}
            >
              <Table aria-label="simple table">
                <AdminTableHeader
                  hideSelectBtn
                  //   heading={heading}
                  rowCount={list.length}
                />
                <TableBody>
                  {list.map((cust) => (
                    <UsersRow
                      key={cust._id}
                      {...cust}
                      page={page}
                      filter={filterValue}
                      search={true}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </Box>
      </Modal>
    </main>
  );
};

export default SearchCustomers;
