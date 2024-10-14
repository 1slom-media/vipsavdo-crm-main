import {
  Checkbox,
  styled,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import UpDown from "components/icons/UpDown";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  padding: "16px 20px",
  color: theme.palette.primary.contrastText,
}));

const TableHeader = (props) => {
  const {
    order,
    heading,
    orderBy,
    rowCount,
    numSelected,
    onRequestSort,
    onSelectAll,
    hideSelectBtn,
  } = props;
  return (
    <TableHead
      sx={{
        borderBottom: "2px solid rgba(0, 0, 0, 0.05)",
      }}
    >
      <TableRow>
        {!hideSelectBtn && (
          <StyledTableCell align="left">
            <Checkbox
              color="info"
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={(event) => onSelectAll(event.target.checked, "product")}
            />
          </StyledTableCell>
        )}

        {heading.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={headCell.align}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              onClick={() => onRequestSort(headCell.id)}
              direction={orderBy === headCell.id ? order : "asc"}
              sx={{
                "& .MuiTableSortLabel-icon": {
                  opacity: 1,
                },
              }}
              IconComponent={() => (
                <UpDown
                  sx={{
                    fontSize: 14,
                    ml: 1,
                    color: "grey.600",
                  }}
                />
              )}
            >
              <Typography variant="subtitle1" color="text.secondary">
                {headCell.label}
              </Typography>
            </TableSortLabel>
          </StyledTableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

TableHeader.propTypes = {
  order: PropTypes.string,
  heading: PropTypes.array,
  orderBy: PropTypes.string,
  onRequestSort: PropTypes.func,
  onSelectAll: PropTypes.func,
  checked: PropTypes.bool,
  hideSelectBtn: PropTypes.bool,
  disableSort: PropTypes.bool,
};

TableHeader.defaultProps = {
  order: "",
  heading: [],
  orderBy: "",
  onRequestSort: () => {},
  onSelectAll: () => {},
  checked: false,
  hideSelectBtn: false,
  disableSort: false,
};

export default TableHeader;
