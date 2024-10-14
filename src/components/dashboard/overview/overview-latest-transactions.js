import { format, subDays } from "date-fns";
import numeral from "numeral";
import {
  Box,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Scrollbar } from "../../scrollbar";
import { SeverityPill } from "../../severity-pill";
import { useSelector } from "react-redux";
import uz from "date-fns/locale/uz";
import EmptyPageWrapper from "components/general/ErrorBoundry/EmptyPageWrapper";
import EmptyCard from "components/general/ErrorBoundry/EmptyCard";
import { width } from "@mui/system";
export const OverviewLatestTransactions = (props) => {
  const transactions = useSelector((state) => state.dashboard.lastPayments);

  return (
    <Card {...props} sx={{ height: "100% !important" }}>
      <CardHeader title="Eng so'ngi admin to'lovlari" />

      {transactions.length > 0 ? (
        <Scrollbar>
          <Table sx={{ minWidth: 600 }}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>O`tkazma</TableCell>
                <TableCell />
                <TableCell>Qiymati</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow
                  key={transaction.id}
                  sx={{
                    "&:last-child td": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell width={100}>
                    <Box
                      sx={{
                        p: 1,
                        backgroundColor: (theme) =>
                          theme.palette.mode === "dark"
                            ? "neutral.800"
                            : "neutral.200",
                        borderRadius: 2,
                        maxWidth: "fit-content",
                      }}
                    >
                      <Typography
                        align="center"
                        color="textSecondary"
                        variant="subtitle2"
                      >
                        {format(new Date(transaction.updatedAt), "LLL", {
                          locale: uz,
                        }).toUpperCase()}
                      </Typography>
                      <Typography
                        align="center"
                        color="textSecondary"
                        variant="h6"
                      >
                        {format(new Date(transaction.updatedAt), "d")}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <div>
                      <Typography variant="subtitle2">
                        {transaction?.name
                          ? transaction.name
                          : "Vipsavdo mijozi"}
                      </Typography>
                      <Typography color="textSecondary" variant="body2">
                        {transaction.card}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={
                        (transaction.status === "fulfilled" && "success") ||
                        (transaction.status === "rejected" && "error") ||
                        "warning"
                      }
                    >
                      {transaction.status}
                    </SeverityPill>
                  </TableCell>
                  <TableCell width={180}>
                    <Typography
                      color={
                        transaction.status === "fulfilled"
                          ? "success.main"
                          : "error.main"
                      }
                      variant="subtitle2"
                    >
                      {numeral(transaction.amount).format("0,0.00")}
                    </Typography>
                    <Typography color="textSecondary" variant="body2">
                      UZS
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      ) : (
        <Box>
          <EmptyCard
            txt="Malumotlar mavjud emas ! "
            img="/assets/media/noBlackList.png"
          />
        </Box>
      )}
    </Card>
  );
};
