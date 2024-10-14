import { useEffect, useState } from "react";
import numeral from "numeral";
import {
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
import { InformationCircleOutlined as InformationCircleOutlinedIcon } from "../../../icons/information-circle-outlined";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {
  getMostSoldProducts,
  getOrdersByCity,
} from "redux-store/admin/dashboard/dashboard.slice";
import { getCity } from "utils/helpers";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
const applySort = (countries, sortDir) =>
  countries.sort((a, b) => {
    let newOrder = 0;

    if (a.visits < b.visits) {
      newOrder = -1;
    }

    if (a.visits > b.visits) {
      newOrder = 1;
    }

    return sortDir === "asc" ? newOrder : -newOrder;
  });

export const AnalyticsVisitsByCountry = (props) => {
  const [sort, setSort] = useState("desc");
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  const city = useSelector((state) => state.statistcis.statisticsByCity);
  const isCityStatsLoading = useSelector(
    (state) => state.statistcis.isCityStatsLoading
  );

  const handleSort = () => {
    setSort((prevOrder) => {
      if (prevOrder === "asc") {
        return "desc";
      }

      return "asc";
    });
  };

  useEffect(() => {
    dispatch(getOrdersByCity({ token }));
  }, [token]);

  return (
    <Card {...props}>
      <CardHeader
        title="Viloyatlar bo'yicha sotuvlar "
        action={
          <Tooltip title="Yangilanish sikli 1 soat">
            <InformationCircleOutlinedIcon sx={{ color: "action.active" }} />
          </Tooltip>
        }
      />

      {isCityStatsLoading ? (
        <Stack px={1}>
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={60} />
          <Skeleton width="100%" height={60} />
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Viloyatlar</TableCell>
              <TableCell sortDirection={sort}>
                <TableSortLabel active direction={sort} onClick={handleSort}>
                  Buyurtmlar soni
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          {city.length > 0 ? (
            <TableBody>
              {city.map((country) => (
                <TableRow
                  key={country.id}
                  sx={{
                    "&:last-child td": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell>
                    <Box>
                      <Typography sx={{ ml: 1 }} variant="subtitle2">
                        {getCity(country.id)}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {numeral(country.count).format("0,0")} dona
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <Box>
              <EmptyCard
                txt="Malumotlar mavjud emas ! "
                img="/assets/media/noBlackList.png"
              />
            </Box>
          )}
        </Table>
      )}

      <Divider />
    </Card>
  );
};
