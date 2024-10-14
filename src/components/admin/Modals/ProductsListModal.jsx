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
import { getAdminProductsBySearching } from "redux-store/admin/products/get.slice";
import ProductsRow from "../TableRows/ProductsRow";
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

const SearchProducts = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.adminProducts.isSearchLoading);
  const list = useSelector((state) => state.adminProducts.searchList);

  const [page, setPage] = React.useState(1);
  const [filterValue, setFilter] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    // dispatch(searchOrders({ token, query: e.target.value }));
    setFilter(e.target.value);
    dispatch(
      getAdminProductsBySearching({
        params: { page, filter: e.target.value, limit: 7 },
        token,
      })
    );
  };

  return (
    <main>
      <StyledSearch
        onClick={handleOpen}
        placeholder={`${t("Mahsulotlarni qidirish")}...`}
        size="small"
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
              {t("Mahsulotlarni qidirish")}
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
          <Box
            maxHeight="400px"
            sx={{
              overflowY: "auto",
              "::-webkit-scrollbar": {
                display: "none !important",
              },
              ".search": {
                fontSize: "11px",
              },
            }}
          >
            {isLoading ? (
              <Stack py={4}>
                <SearchLoader />
              </Stack>
            ) : list?.length ? (
              <TableContainer>
                <Table aria-label="simple table">
                  <AdminTableHeader
                    hideSelectBtn
                    //   heading={heading}
                    rowCount={list.length}
                  />
                  <TableBody>
                    {list.map((item) => (
                      <ProductsRow
                        // callback={rowCallback}
                        key={item._id}
                        searchModal={true}
                        {...item}
                      />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : null}
          </Box>
        </Box>
      </Modal>
    </main>
  );
};

export default SearchProducts;
