import {
  Chip,
  Checkbox,
  Stack,
  Typography,
  TableCell,
  IconButton,
  Box,
  Table,
  TableBody,
  TableRow,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React, { useState } from "react";
import { getCity, getColor, getStatusText } from "utils/helpers";
import ConfirmArchivemodal from "../Modals/ConfirmArchivemodal";
import { StyledEditeBtn } from "./ProductsRow";
import PropTypes from "prop-types";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import ViewIcon from "components/icons/ViewIcon";
import Link from "next/link";
import { handleOrderCheck } from "redux-store/checkbox/checkbox.slice";
import { useDispatch, useSelector } from "react-redux";
import Tooltip from "@mui/material/Tooltip";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";

const AdminOrdersRow = ({
  number,
  name,
  phone,
  city_id,
  createdAt,
  isTaken,
  status,
  orderItems,
  prevStatus,
  _id,
  page,
  statusFilter,
  operator,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const checkedList = useSelector((state) => state.checkbox.orders);
  const [open, setOpen] = useState(false);

  const price = orderItems.reduce((a, b) => {
    let total = b.price ? b.price : b.productId?.price;
    let quantity = b.quantity ? b.quantity : b.productId?.quantity;
    return a + total * quantity;
  }, 0);

  const count = orderItems.reduce((a, b) => {
    return a + b.quantity;
  }, 0);

  const handleCheck = () => {
    dispatch(handleOrderCheck(_id));
  };

  return (
    <>
      <StyledTableRow>
        <StyledTableCell align="left">
          <Checkbox
            checked={checkedList.includes(_id)}
            onChange={handleCheck}
          />
        </StyledTableCell>
        <StyledTableCell align="left">#{number}</StyledTableCell>
        <StyledTableCell align="left">
          <Tooltip title={name} sx={{ cursor: "pointer" }}>
            <Typography>{name?.slice(0, 10)}</Typography>
          </Tooltip>
        </StyledTableCell>
        <StyledTableCell align="center">{phone}</StyledTableCell>
        <StyledTableCell align="center">
          {count} {t("Dona")}
        </StyledTableCell>
        <StyledTableCell align="center">{getCity(city_id)}</StyledTableCell>
        <StyledTableCell align="center">
          {price.toLocaleString()} so`m
        </StyledTableCell>
        <StyledTableCell align="center">
          {isTaken ? (
            <Stack alignItems="start">
              <Typography variant="string" color="primary">
                {operator?.name}
              </Typography>
              <Typography variant="caption">{operator?.phone}</Typography>
            </Stack>
          ) : (
            <Chip
              size="small"
              label="Olinmagan"
              color="error"
              variant="outlined"
            />
          )}
        </StyledTableCell>
        <StyledTableCell align="left">
          <Tooltip title={name} sx={{ cursor: "pointer" }}>
            <Typography>
              {createdAt
                ? format(new Date(createdAt), "dd-MMMM HH:mm, yyyy", { locale: uz })
                : null}
            </Typography>
          </Tooltip>
        </StyledTableCell>
        <StyledTableCell align="right">
          <Stack
            direction="row"
            justifyContent="right"
            alignItems="right"
            gap={2}
          >
            <Link href={`/dashboard/orders/orders-list/edit/${_id}`}>
              <StyledEditeBtn>
                <ViewIcon />
              </StyledEditeBtn>
            </Link>
            <ConfirmArchivemodal
              prevStatus={prevStatus}
              error={
                status === "archived"
                  ? t("ProdBeingUnarchiv")
                  : t("ProdBeingArchiv")
              }
              status={status}
              id={_id}
              page={page}
              statusFilter={statusFilter}
            />
            {orderItems && orderItems?.length > 0 && (
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!open)}
              >
                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            )}
          </Stack>
        </StyledTableCell>
      </StyledTableRow>
      <StyledTableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={11}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            style={{ border: "none" }}
          >
            <Table size="small" aria-label="purchases">
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                {orderItems.map((item) => (
                  <TableRow key={item.date} sx={{ "& td": { border: "none" } }}>
                    <TableCell>
                      <Avatar
                        sx={{ border: "0.01px solid #999999" }}
                        variant={"rounded"}
                        alt={item?.name ? "" : ""}
                        src={item?.product?.image}
                      />
                    </TableCell>
                    <TableCell>{item?.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat().format(item?.price)}
                    </TableCell>
                    <TableCell>
                      * {item?.quantity} {t("Dona")}
                    </TableCell>
                    <TableCell>
                      ={" "}
                      {new Intl.NumberFormat().format(
                        item?.quantity * item?.price
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </Box>
            </Table>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </>
  );
};

AdminOrdersRow.propTypes = {
  orderItems: PropTypes.arr,
};

AdminOrdersRow.defaultProps = {
  orderItems: [],
};

export default AdminOrdersRow;
