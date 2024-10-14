import {
  Box,
  Chip,
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
import { searchOrders } from "redux-store/admin/orders/orders.slice";
import { useDispatch, useSelector } from "react-redux";
import SearchLoader from "../Loaders/SerarchLoader";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import { getColor, getStatusText } from "utils/helpers";
import Link from "next/link";
import ViewIcon from "components/icons/ViewIcon";
import { StyledEditeBtn } from "../TableRows/ItemCategoriesRow";
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
  top: "40%",
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

const SearchModal = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);
  const isLoading = useSelector((state) => state.orders.isSearchLoading);
  const list = useSelector((state) => state.orders.searchResult);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSearch = (e) => {
    dispatch(searchOrders({ token, query: e.target.value }));
  };

  return (
    <Box maxWidth="80%">
      <StyledSearch
        onClick={handleOpen}
        placeholder={`${t("Buyurtmalarni qidirish")}...`}
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
              {t("Buyurtmalarni qidirish")}
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
              placeholder={`${t("Buyurtmalarni qidirish")}...`}
              sx={{ width: "100%" }}
            />
          </Stack>
          {isLoading ? (
            <Stack py={4}>
              <SearchLoader />
            </Stack>
          ) : list?.length ? (
            <TableContainer sx={{ height: "400px" }}>
              <Table>
                <TableBody>
                  {list?.map((order) => (
                    <StyledTableRow key={order._id}>
                      <StyledTableCell align="center">
                        {order.number}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.name}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {order.phone}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Chip
                          size="small"
                          label={getStatusText(order.status)}
                          sx={{
                            p: "0.25rem 0.5rem",
                            fontSize: 12,
                            color: !!getColor(order.status)
                              ? `${getColor(order.status)}.900`
                              : "inherit",
                            backgroundColor: `${!!getColor(order.status)}.200`
                              ? `${getColor(order.status)}.200`
                              : "none",
                          }}
                        />
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Link
                          href={`/dashboard/orders/orders-list/edit/${order._id}`}
                        >
                          <StyledEditeBtn>
                            <ViewIcon />
                          </StyledEditeBtn>
                        </Link>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </Box>
      </Modal>
    </Box>
  );
};

export default SearchModal;
