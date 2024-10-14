import { Chip, Typography, Stack } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import React from "react";
import { getColor, getStatusText } from "utils/helpers";
import ConfirmArchivemodal from "../Modals/ConfirmArchivemodal";
import Link from "next/link";
import { StyledEditeBtn } from "./ProductsRow";
import ViewIcon from "components/icons/ViewIcon";

const UserOrderPaymentRow = ({
  status,
  createdAt,
  isTaken,
  operator,
  address,
  number,
  prevStatus,
  statusFilter,
  referal_price,
  page,
  _id,
}) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Typography variant="body1" color="secondary.100">
          {number}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        {createdAt
          ? format(new Date(createdAt), "dd-MMMM, yyy, HH:mm", { locale: uz })
          : ""}
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="body1" color="secondary.100">
          {referal_price?.toLocaleString()} so`m
        </Typography>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Chip
          size="small"
          label={getStatusText(status)}
          sx={{
            p: "0.25rem 0.5rem",
            fontSize: 12,
            color: !!getColor(status) ? `${getColor(status)}.900` : "inherit",
            backgroundColor: `${!!getColor(status)}.200`
              ? `${getColor(status)}.200`
              : "none",
          }}
        />
      </StyledTableCell>
      <StyledTableCell align="center">
        {operator ? (
          <Chip
            size="small"
            label={operator}
            sx={{
              p: "0.25rem 0.5rem",
              fontSize: 12,
              color: `success.900`,
              backgroundColor: `success.200`,
            }}
          />
        ) : (
          <Chip
            size="small"
            label="Olinmagan"
            sx={{
              p: "0.25rem 0.5rem",
              fontSize: 12,
              color: `error.900`,
              backgroundColor: `error.200`,
            }}
          />
        )}
      </StyledTableCell>
      <StyledTableCell align="right">
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          gap={2}
        >
          <Link href={`/dashboard/orders/edit/${_id}`}>
            <StyledEditeBtn>
              <ViewIcon />
            </StyledEditeBtn>
          </Link>
          <ConfirmArchivemodal
            prevStatus={prevStatus}
            error={
              status === "archived"
                ? "Ushbu buyurtma arxivdan chiqarilmoqda! Tasdiqlaysizmi"
                : "Ushbu buyurtma arxivlanmoqda. Tasdiqlaysizmi?"
            }
            status={status}
            id={_id}
            page={page}
            statusFilter={statusFilter}
          />
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default UserOrderPaymentRow;
