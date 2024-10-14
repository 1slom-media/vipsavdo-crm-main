import { KeyboardArrowDown } from "@mui/icons-material";
import {
  Box,
  Card,
  MenuItem,
  Select,
  styled,
  Typography,
  useTheme,
} from "@mui/material";
// import { FlexBetween } from "components/flex-box";
// import { H5 } from "components/Typography";
import { analyticsChartOptions } from "constants/analytics";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const categories = [
  "Yan",
  "Fev",
  "Mar",
  "Apr",
  "May",
  "Iyn",
  "Iyl",
  "Avg",
  "Sbr",
  "Okt",
  "Noy",
  "Dek",
];

const StyledSelect = styled(Select)(({ theme }) => ({
  fontSize: 14,
  fontWeight: 500,
  color: theme.palette.grey[600],
  background: theme.palette.background.lightGray,
  borderRadius: "10px",
  cursor: "pointer",
  "& .MuiList-root": {
    paddingTop: "5px",
    paddingBottom: "5px",
    paddingTop: "5px",
  },
  "& fieldset": {
    border: "0 !important",
  },
  "& .MuiSelect-select": {
    padding: "10px",
    paddingRight: "8px !important",
  },
}));

const StyledBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const Analytics = () => {
  const theme = useTheme();
  const { t } = useTranslation("translation");

  const [selectType, setSelectType] = useState("yearly");

  const series = [
    {
      name: t("Sales"),
      data: [
        15000, 45000, 12000, 50000, 75000, 13000, 30000, 99000, 75000, 90000,
        55000, 15000,
      ],
    },
    {
      name: t("Expenses"),
      data: [
        1500, 48000, 19000, 59000, 25000, 9000, 36000, 9000, 79000, 70000,
        57000, 5000,
      ],
    },
  ];
  return (
    <Card
      sx={{
        p: 3,
      }}
    >
      <StyledBox component="div" display="flex" justifyContent="flex-between">
        <Typography variant="h5">{t("Statistika")}</Typography>

        <StyledSelect
          value={selectType}
          IconComponent={() => <KeyboardArrowDown />}
          onChange={(e) => setSelectType(e.target.value)}
        >
          <MenuItem value="yearly">{t("Yearly")}</MenuItem>
          <MenuItem value="yearly">{t("Monthly")}</MenuItem>
          <MenuItem value="yearly">{t("Weekly")}</MenuItem>
        </StyledSelect>
      </StyledBox>

      <ReactApexChart
        type="bar"
        height={300}
        series={series}
        options={analyticsChartOptions(theme, categories)}
      />
    </Card>
  );
};

export default Analytics;
