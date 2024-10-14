import { Avatar, Chip, Stack, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import ViewIcon from "components/icons/ViewIcon";
import { format } from "date-fns";
import { uz } from "date-fns/locale";
import React from "react";
import { getCity, getUserStatusColor } from "utils/helpers";
import AdminCopyModal from "../Modals/AdminCopyModal";
import ConfirmUserStatusChange, {
  StyledIconBtn,
} from "../Modals/ConfirmUserStatusChange";

const OperatorsRow = ({
  avatar,
  _id,
  region,
  name,
  phone,
  balance,
  paid,
  status,
  createdAt,
  username,
  telegramID,
  search,
}) => {
  let img = avatar;
  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Stack direction="row">
          <Avatar src={img} />
          <Stack ml={2}>
            <Typography>{name}</Typography>
            <Typography>#{_id}</Typography>
          </Stack>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="left">{phone}</StyledTableCell>
      <StyledTableCell align="left">{getCity(region)}</StyledTableCell>
      <StyledTableCell align="left">
        {balance.toLocaleString()} so`m
      </StyledTableCell>
      <StyledTableCell align="left">
        {paid.toLocaleString()} so`m
      </StyledTableCell>
      {search ? null : (
        <StyledTableCell align="left">
          {format(new Date(createdAt), "dd-MMMM, yyyy, HH:mm", { locale: uz })}
        </StyledTableCell>
      )}
      <StyledTableCell align="left">
        <Chip
          size="small"
          label={status === 1 ? "Faol" : "Block"}
          sx={{
            p: "0.25rem 0.5rem",
            fontSize: 12,
            color: !!getUserStatusColor(status)
              ? `${getUserStatusColor(status)}.900`
              : "inherit",
            backgroundColor: `${!!getUserStatusColor(status)}.200`
              ? `${getUserStatusColor(status)}.200`
              : "none",
          }}
        />
      </StyledTableCell>
      <StyledTableCell align="right">
        <Stack direction="row" alignItems="center" gap={1}>
          <StyledIconBtn href={`/dashboard/users/operators/profile/${_id}`}>
            <ViewIcon />
          </StyledIconBtn>
          <AdminCopyModal
            img={avatar}
            name={name}
            tgId={telegramID}
            phone={phone}
            balance={balance}
            username={username}
          />
          <ConfirmUserStatusChange id={_id} status={status} />
        </Stack>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default OperatorsRow;
