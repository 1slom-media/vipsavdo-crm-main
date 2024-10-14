import { Box, Stack, Typography, IconButton, styled } from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React from "react";
import SwitchInput from "components/general/Inputs/Switch";
import format from "date-fns/format";
import uz from "date-fns/locale/uz";
import EditIcon from "components/icons/EditIcon";

import ConfirmDeleteModal from "../Modals/ConfirmDeleteModal.jsx ";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const StyledEditeBtn = styled(IconButton)(({ theme }) => ({
  padding: "10px",
  borderRadius: "50%",
  background: theme.palette.background.iconButtonLight,
  width: "35px",
  height: "35px",
}));

const ItemCategoriesRow = (data) => {
  const { t } = useTranslation("translation");

  return (
    <StyledTableRow>
      <StyledTableCell align="left">
        <Stack direction="row" justifyContent="flex-start" gap="10px">
          <Box
            component="img"
            alt="img-alt"
            src={data.image}
            width="50px"
            height="50px"
            borderRadius="50%"
          />
          <Stack direction="column" justifyContent="space-between">
            <Typography variant="subtitle1" color="secondary.100">
              {data?.name}
            </Typography>
            <Typography
              variant="string"
              color="secondary.100"
              sx={{
                opacity: "0.7",
              }}
            >
              {data?._id}
            </Typography>
          </Stack>
        </Stack>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="subtitle1" color="secondary.100">
          {data?.referal_price} so`m
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <Typography variant="subtitle1" color="secondary.100">
          {data?.price} so`m
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="left">
        <SwitchInput />
      </StyledTableCell>
      <StyledTableCell align="center">
        <Typography variant="subtitle1" color="secondary.100">
          {data?.createdAt
            ? format(new Date(data?.createdAt), "dd-MMMM, HH:mm", {
                locale: uz,
              })
            : ""}
        </Typography>
      </StyledTableCell>

      <StyledTableCell align="center">
        <Box display="flex" alignItems="center" justifyContent="center" gap={2}>
          <Link href={`#`}>
            <StyledEditeBtn>
              <EditIcon />
            </StyledEditeBtn>
          </Link>
          <ConfirmDeleteModal error={t("ConfirmDeleteProd")} />
        </Box>
      </StyledTableCell>
    </StyledTableRow>
  );
};

export default ItemCategoriesRow;
