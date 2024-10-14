import { Box, Chip, Typography } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React from "react";
import { getColor } from "utils/helpers";
import EditBlackListedModal from "../Modals/EditBlackListedModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteBlackList,
  getBlackList,
} from "redux-store/admin/blacklist/blacklist.slice";
import ConfirmDeletePhone from "../Modals/ConfirmDeletePhone";
import { useTranslation } from "react-i18next";

const BlackListRow = ({ _id, phone, isBlock }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const token = useSelector((state) => state.auth.token);

  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const { isDeleteLoading } = useSelector((state) => state.blacklist);

  const callBack = (status) => {
    if (status == 200 || 201) {
      dispatch(getBlackList({ token }));
      handleClose1();
      alert.success({ title: "Blok", text: t("PhoneNumberDeleted") });
    } else {
      dispatch(getBlackList({ token }));
      alert.error({ title: "Blok", text: t("ErrorDec") + "!" });
    }
  };

  const deleteNumberFromList = () => {
    dispatch(deleteBlackList({ token, callBack, id: _id }));
  };

  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Typography variant="body1">{_id}</Typography>
      </StyledTableCell>

      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="secondary.100">
          {phone}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="secondary.100">
          <Chip
            size="small"
            label={isBlock ? "Block" : "Aktiv"}
            sx={{
              p: "0.25rem 0.5rem",
              fontSize: 12,
              color: `${getColor(isBlock ? "canceled" : "delivered")}.900`,
              backgroundColor: `${getColor(
                isBlock ? "canceled" : "delivered"
              )}.200`,
            }}
          />
        </Typography>
      </StyledTableCell>

      <StyledTableCell align="center ">
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <EditBlackListedModal
            initialValues={{ phone, id: _id }}
            open={open}
            handleClose={handleClose}
            handleOpen={handleOpen}
          />
          <ConfirmDeletePhone
            error={t("ConfirmDeletePhoneNumber")}
            isOpen={open1}
            id={_id}
            phone={phone}
            onSuccess={deleteNumberFromList}
            handleClose={handleClose1}
            handleOpen={handleOpen1}
            loading={isDeleteLoading}
          />
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default BlackListRow;
