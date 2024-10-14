import NextLink from "next/link";
import { format } from "date-fns";
import numeral from "numeral";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Chip,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../../utils/get-initials";
import { Scrollbar } from "../../scrollbar";
import { getStatusText, getColor } from "utils/helpers";
import { useState } from "react";

import * as React from "react";
import Collapse from "@mui/material/Collapse";
import TableHead from "@mui/material/TableHead";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const InvoiceRow = (props) => {
  const { invoice } = props;

  const [open, setOpen] = useState(false);

  return (
    <>
      <TableRow
        key={invoice.id}
        sx={{
          boxShadow: 1,
          transition: (theme) =>
            theme.transitions.create("box-shadow", {
              easing: theme.transitions.easing.easeOut,
            }),
          "&:hover": {
            boxShadow: 8,
          },
          "& > td": {
            backgroundColor: "background.paper",
            borderBottom: 0,
          },
        }}
      >
        <TableCell width="25%">
          <NextLink href="/dashboard/invoices/1" passHref>
            <Box
              component="a"
              sx={{
                alignItems: "center",
                display: "inline-flex",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              <Avatar
                sx={{
                  height: 42,
                  width: 42,
                }}
              >
                {getInitials(invoice.name)}
              </Avatar>
              <Box sx={{ ml: 2 }}>
                <Typography color="textPrimary" variant="subtitle2">
                  #{invoice.uid}
                </Typography>
                <Typography color="textSecondary" variant="body2">
                  {invoice?.name}
                </Typography>
              </Box>
            </Box>
          </NextLink>
        </TableCell>
        <TableCell>
          <Typography variant="body2">{invoice?.phone}</Typography>
          <Typography variant="body2" color="textSecondary">
            {numeral(invoice.price).format("0,0.00")} so`m
          </Typography>
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle2">Yaratildi</Typography>
            <Typography color="textSecondary" variant="body2">
              {invoice.createdAt &&
                format(new Date(invoice?.createdAt), "dd/MM/yyyy HH:mm")}
            </Typography>
          </Box>
        </TableCell>
        <TableCell>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Chip
              label={getStatusText(invoice?.status)}
              color={getColor(invoice?.status)}
              variant="outlined"
              size="small"
              sx={{ width: "max-content" }}
            />
          </Box>
        </TableCell>
        {invoice && invoice?.products?.length > 0 ? (
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
        ) : (
          <TableCell></TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
            style={{ border: "none" }}
          >
            <Table size="small" aria-label="purchases">
              <TableBody
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                }}
              >
                {invoice?.products?.map((item) => (
                  <TableRow key={item.date} sx={{ "& td": { border: "none" } }}>
                    <TableCell>
                      <Avatar
                        sx={{ border: "0.01px solid #999999" }}
                        variant={"rounded"}
                        alt={item?.name}
                        src={item?.image}
                      />
                    </TableCell>
                    <TableCell>{item?.productId?.name}</TableCell>
                    <TableCell>
                      {new Intl.NumberFormat().format(item?.price)}
                    </TableCell>
                    <TableCell>* {item?.quantity} ta</TableCell>
                    <TableCell>
                      ={" "}
                      {new Intl.NumberFormat().format(
                        item?.quantity * item?.price
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export const InvoiceListTable = (props) => {
  const {
    group,
    invoices,
    invoicesCount,
    onPageChange,
    onRowsPerPageChange,
    page,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Scrollbar>
        <Table
          sx={{
            borderCollapse: "separate",
            borderSpacing: (theme) => `0 ${theme.spacing(3)}`,
            minWidth: 600,
            marginTop: (theme) => `-${theme.spacing(3)}`,
            p: "1px",
          }}
        >
          <TableBody>
            {invoices?.map((item) => (
              <InvoiceRow key={item._id} invoice={item} />
            ))}
          </TableBody>
        </Table>
      </Scrollbar>
      <TablePagination
        component="div"
        labelRowsPerPage="Qatorlar sonini belgilash"
        count={invoicesCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[7, 10, 25]}
      />
    </div>
  );
};

InvoiceListTable.propTypes = {
  group: PropTypes.bool,
  invoices: PropTypes.array.isRequired,
  invoicesCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
