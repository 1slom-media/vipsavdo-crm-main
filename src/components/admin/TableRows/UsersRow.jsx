import {
  Avatar,
  Stack,
  Typography,
  styled,
  IconButton,
  Chip,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React from "react";
import { getCity } from "utils/helpers";
import format from "date-fns/format";
import { uz } from "date-fns/locale";
import ViewIcon from "components/icons/ViewIcon";
import ConfirmUserStatusChange from "../Modals/ConfirmUserStatusChange";
import AdminCopyModal from "../Modals/AdminCopyModal";
import { getUserStatusColor } from "utils/helpers";

const StyledIconBtn = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  borderRadius: "50%",
  background: theme.palette.background[200],
  width: "35px",
  height: "35px",
}));

const UsersRow = ({
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
  page,
  filter,
  search,
}) => {
  let img = avatar;
  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Stack direction="row">
          <Avatar src={img} alt={name} />
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
          <StyledIconBtn href={`/dashboard/users/customers/profile/${_id}`}>
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

export default UsersRow;
