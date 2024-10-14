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

const UserPaymentViewRow = ({
  status,
  amount,
  index,
  createdAt,
  card,
  message,
  _id,
}) => {
  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Typography variant="body1" color="secondary.100">
          {index + 1}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        {amount?.toLocaleString()} so`m
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="body1" color="secondary.100">
          {card}
        </Typography>
      </StyledTableCell>

      <StyledTableCell align="left">
        <Chip
          size="small"
          label={checkStatus(status)}
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
      <StyledTableCell align="left">
        <Typography variant="body1" color="secondary.100">
          {createdAt
            ? format(new Date(createdAt), "dd-MMMM, HH:mm", { locale: uz })
            : ""}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="right">
        <Box display="flex" alignItems="right" justifyContent="right" gap={2}>
          <PaymentUpdateModal
            initialValues={{ message, status, paymentId: _id }}
          />
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default UserPaymentViewRow;
