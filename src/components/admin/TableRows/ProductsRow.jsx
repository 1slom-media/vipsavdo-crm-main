import {
  Box,
  Stack,
  Typography,
  IconButton,
  styled,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React, { useState } from "react";
import SwitchInput from "components/general/Inputs/Switch";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAdminProduct,
  setUpdateID,
} from "redux-store/admin/products/update.slice";
import useAlert from "hooks/useAlert";
import CircularProgress from "@mui/material/CircularProgress";

import Link from "next/link";
import { useRouter } from "next/router";
import ViewIcon from "components/icons/ViewIcon";
import { updateAdminSpamProduct } from "redux-store/admin/products/updateSpam.slice";

export const StyledEditeBtn = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
}));

const ProductsRow = ({
  title,
  category,
  image,
  uid,
  createdAt,
  blocked,
  allowMarket,
  callback,
  searchModal,
  totalAvailableAmount,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const alert = useAlert();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const token = useSelector((state) => state.auth.token);
  const isUpdateLoading = useSelector((state) => state.productUpdate.isLoading);
  const isSpamLoading = useSelector(
    (state) => state.productSpamUpdate.isLoading
  );
  const updateID = useSelector((state) => state.productUpdate.updateID);

  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          gap="10px"
        >
          <Avatar src={image} variant="rounded" alt={name} />
          <Stack direction="column" justifyContent="space-between">
            <Typography
              variant="subtitle1"
              color="secondary.100"
              textTransform="uppercase"
              fontSize="13px"
              className="search"
            >
              {title[router.locale]?.slice(0, 40)}
            </Typography>
            <Typography
              variant="subtitle1"
              color="secondary.100"
              fontSize="13px"
              className="search"
            >
              {uid}
            </Typography>
          </Stack>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="center">{totalAvailableAmount}</StyledTableCell>
      <StyledTableCell align="left">
        <Typography
          variant="subtitle1"
          color="secondary.100"
          textTransform="uppercase"
          className="search"
          fontSize="13px"
        >
          {category[router.locale]}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        {isUpdateLoading && updateID === uid ? (
          <CircularProgress size={30} />
        ) : (
          <SwitchInput
            checked={allowMarket}
            onChange={(e) => {
              const updatedRowData = {
                allowMarket: e.target.checked,
              };
              dispatch(setUpdateID(uid));
              dispatch(
                updateAdminProduct({
                  data: updatedRowData,
                  token,
                  uid,
                  callback,
                  alert,
                })
              );
            }}
          />
        )}
      </StyledTableCell>

      <StyledTableCell align="center">
        {isSpamLoading && updateID === uid ? (
          <CircularProgress size={30} />
        ) : (
          <SwitchInput
            checked={blocked}
            onChange={(e) => {
              const updatedRowData = {
                blocked: e.target.checked,
              };
              dispatch(setUpdateID(uid));
              dispatch(
                updateAdminSpamProduct({
                  data: updatedRowData,
                  token,
                  uid: uid,
                  callback,
                  alert,
                })
              );
            }}
          />
        )}
      </StyledTableCell>
      <StyledTableCell
        align="center"
        sx={{
          display: searchModal ? "none" : "",
          fontSize: "13px",
        }}
      >
        {createdAt
          ? format(new Date(createdAt), "dd-MMMM, HH:mm", { locale: uz })
          : ""}
      </StyledTableCell>
      <StyledTableCell align="right">
        <Box display="flex" alignItems="right" justifyContent="right" gap={2}>
          <Link href={`/dashboard/products/products-list/${uid}`}>
            <StyledEditeBtn>
              <ViewIcon />
            </StyledEditeBtn>
          </Link>
          <StyledEditeBtn
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreVertIcon />
          </StyledEditeBtn>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() =>
                router.push(`/dashboard/products/products-list/edit/${uid}`)
              }
            >
              Tovar malumotlar tahriri
            </MenuItem>
            <MenuItem
              onClick={() =>
                router.push(`/dashboard/products/products-list/edit/sku/${uid}`)
              }
            >
              Tovar SKU tahriri
            </MenuItem>
            <MenuItem onClick={handleClose}>Xususiyatlarni yangilash</MenuItem>
          </Menu>
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};

ProductsRow.defaultProps = {
  callback: () => {},
};

export default ProductsRow;
