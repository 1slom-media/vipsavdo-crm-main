import { Box, Chip, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import React from "react";
import { checkStatus, getColor } from "utils/helpers";
import PaymentUpdateModal from "../Modals/EditPaymentModal";
import Link from "next/link";
import { StyledEditeBtn } from "./ItemCategoriesRow";
import ViewIcon from "components/icons/ViewIcon";

const PaymentRow = ({
  status,
  amount,
  index,
  createdAt,
  card,
  user,
  message,
  name,
  _id,
  id,
  uid,
}) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Typography variant="body1">#{uid ? uid : _id?.slice(0, 7)}</Typography>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Box display="flex" flexDirection="column">
          <Typography variant="body1" color="secondary.100">
            {name}
          </Typography>
          <Typography variant="caption" color="secondary.100">
            #{id}
          </Typography>
        </Box>
      </StyledTableCell>
      <StyledTableCell align="left">
        {amount?.toLocaleString()} so`m
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="body1">{card}</Typography>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Chip
          size="small"
          label={checkStatus(status)}
          color={status ? getColor(status) : "primary"}
        />
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="body1" color="secondary.100">
          {createdAt
            ? format(new Date(createdAt), "dd-MMMM, HH:mm", { locale: uz })
            : ""}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Box display="flex" alignItems="right" justifyContent="right" gap={2}>
          <Link href="/dashboard/payment">
            <StyledEditeBtn>
              <ViewIcon />
            </StyledEditeBtn>
          </Link>
          <PaymentUpdateModal
            initialValues={{ message, status, paymentId: _id }}
          />
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default PaymentRow;
