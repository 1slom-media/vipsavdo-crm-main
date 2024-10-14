import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableContainer,
  Typography,
} from "@mui/material";
import {
  StyledTableCell,
  StyledTableRow,
} from "components/general/StyledComponents/tablesStyled";
import React, { useState } from "react";
import { StyledEditeBtn } from "./ProductsRow";
import ViewIcon from "components/icons/ViewIcon";
import Link from "next/link";
import CategoryUpdateModal from "../Modals/CategoryUpdateModal";
import { useDispatch, useSelector } from "react-redux";
import useAlert from "hooks/useAlert";
import {
  getAllCategoryAction,
  getOneCategoryAction,
} from "redux-store/admin/category/get.slice";
import { useRouter } from "next/router";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import AddIcon from "@mui/icons-material/Add";
import ChildeCategoryAdd from "../Modals/ChildeCategoryAdd";
const SubCategoryRow = ({ label, uid, avatar, children, _id }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const token = useSelector((state) => state.auth.token);
  const page = router?.query?.page;
  const limit = router?.query?.limit;

  const [open, setOpen] = React.useState(false);

  const GetRequest = () => {
    if (router?.query?.id) {
      dispatch(
        getOneCategoryAction({
          uid: router?.query?.id,
          token,
        })
      );
    }
  };

  return (
    <>
      <StyledTableRow>
        <StyledTableCell align="left" width="846px">
          <Typography
            bgcolor="background.gray"
            variant="subtitle1"
            color="secondary.100"
            borderRadius="25px"
            width="80%"
            p={1}
          >
            {label[router.locale]}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="left">
          <Typography variant="subtitle1" color="secondary.100">
            {uid}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="right">
          <Box display="flex" alignItems="right" justifyContent="right" gap={2}>
            <ChildeCategoryAdd id={uid} callback={GetRequest} />
            <CategoryUpdateModal label={label} uid={uid} />

            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </Box>
        </StyledTableCell>
      </StyledTableRow>

      <StyledTableRow>
        <StyledTableCell style={{ padding: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Table aria-label="simple table">
              {children?.map((item) => (
                <TableBody key={item.uid}>
                  <StyledTableCell align="left" width="846px">
                    <Typography
                      bgcolor="background.gray"
                      variant="subtitle1"
                      color="secondary.100"
                      align="left"
                      borderRadius="25px"
                      p={1}
                    >
                      {item.title[router.locale]}
                    </Typography>
                  </StyledTableCell>

                  <StyledTableCell align="left">
                    <Typography variant="subtitle1" color="secondary.100">
                      {item.uid}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="left"></StyledTableCell>
                  <StyledTableCell align="right" width="270px !important">
                    <Box
                      display="flex"
                      alignItems="right"
                      justifyContent="right"
                      gap={2}
                    >
                      <CategoryUpdateModal
                        label={item.title}
                        uid={item.uid}
                        avatar={item.avatar}
                      />
                    </Box>
                  </StyledTableCell>
                </TableBody>
              ))}
            </Table>
          </Collapse>
        </StyledTableCell>
      </StyledTableRow>
    </>
  );
};

export default SubCategoryRow;
