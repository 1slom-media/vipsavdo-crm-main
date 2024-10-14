import { useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Divider,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
  Typography,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getMostSoldProducts } from "redux-store/admin/dashboard/dashboard.slice";
import { formatNumber } from "utils/helpers";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";

export const AnalyticsMostSoldProducts = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const productMost = useSelector((state) => state.statistcis.mostSoldList);
  const ProductMostSoldStatus = useSelector(
    (state) => state.statistcis.isMostSoldLoading
  );

  useEffect(() => {
    dispatch(getMostSoldProducts({ token }));
  }, [token]);

  return (
    <Card sx={{ paddingBottom: "20px", height: "100%" }}>
      <CardHeader
        title="Eng ko'p sotigan tavarlar"
        // action={<Tooltip title="Widget25 Source by channel"/>}
      />

      {ProductMostSoldStatus ? (
        <Stack px={1}>
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={60} />
        </Stack>
      ) : (
        <>
          {productMost.length > 0 ? (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Rasmi</TableCell>
                  <TableCell>Nomi</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Narxi</TableCell>
                  <TableCell>Zakazlar soni </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productMost.map((item) => (
                  <TableRow key={item.product.id}>
                    <TableCell>
                      <Avatar
                        src={item?.product?.image?.[0]}
                        sx={{ width: 46, height: 46 }}
                      />
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography sx={{ ml: 1 }} variant="subtitle2">
                          {item.product.name}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box>
                        <Typography sx={{ ml: 1 }} variant="subtitle2">
                          {item.product.active ? "Active" : "No Active"}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {formatNumber(item.product.price)} so`m
                    </TableCell>
                    <TableCell>{item.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Box>
              <EmptyCard
                txt="Malumotlar mavjud emas ! "
                img="/assets/media/noBlackList.png"
              />
            </Box>
          )}
        </>
      )}
    </Card>
  );
};
