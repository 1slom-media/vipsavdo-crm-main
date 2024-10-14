import { Stack } from "@mui/system";
import { Button, Grid, InputAdornment, TextField } from "@mui/material";
import { useRouter } from "next/router";
import { regions } from "utils/regions";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";
import FilteredOrdersStatusChangeModal from "../Modals/FilteredOrdersStatusChange";
import { useTranslation } from "react-i18next";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const OrderFilters = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation("translation");

  const { page, limit, status, from, to } = router?.query;

  const token = useSelector((state) => state.auth.token);

  const clearParams = () => {
    router.push(
      `${router?.pathname}?page=${page}&limit=${limit}&status=${status}`
    );
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    const regionsSelected = value;

    const searchParams = new URLSearchParams();
    searchParams.append("page", 1);
    searchParams.append("limit", limit);
    searchParams.append("status", status);
    searchParams.append("regionQueryString", regionsSelected);

    if (router?.query?.startTime && router?.query?.endTime) {
      searchParams.append("startTime", router?.query?.startTime);
      searchParams.append("endTime", router?.query?.endTime);
    }

    router.push(`${router.pathname}?${searchParams?.toString()}`);
  };

  const handleTimeStartFilter = (newValue) => {
    const startTime = format(new Date(newValue), "yyyy-MM-dd");
    const endTime = router?.query?.endTime
      ? format(new Date(router?.query?.endTime), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd");

    const searchParams = new URLSearchParams();
    searchParams.append("page", 1);
    searchParams.append("limit", limit);
    searchParams.append("status", status);
    searchParams.append("startTime", startTime);
    searchParams.append("endTime", endTime);
    if (
      router.query?.regionQueryString &&
      router.query?.regionQueryString !== "undefined"
    ) {
      searchParams.append("regionQueryString", router.query?.regionQueryString);
    }
    router.push(`${router.pathname}?${searchParams?.toString()}`);
  };

  const handleTimeEndFilter = (newValue) => {
    const startDate = router?.query?.startTime
      ? format(new Date(router?.query?.startTime), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd");
    const endTime = format(new Date(newValue), "yyyy-MM-dd");

    const searchParams = new URLSearchParams();
    searchParams.append("page", 1);
    searchParams.append("limit", limit);
    searchParams.append("status", status);
    searchParams.append("startTime", startDate);
    searchParams.append("endTime", endTime);
    if (
      router.query?.regionQueryString &&
      router.query?.regionQueryString !== "undefined"
    ) {
      searchParams.append("regionQueryString", router.query?.regionQueryString);
    }
    router.push(`${router.pathname}?${searchParams?.toString()}`);
  };

  return (
    <Stack p={{ xs: 0, md: 2 }} py={2}>
      <Grid container spacing={{ xs: 0, md: 2 }} gap={1}>
        <Grid item xs={12} md={3}>
          <MobileDatePicker
            inputFormat="dd-MMMM, yyy, HH:mm"
            value={
              router?.query?.startTime
                ? new Date(router?.query?.startTime)
                : null
            }
            cancelLabel={t("Cancel")}
            onChange={handleTimeStartFilter}
            sx={{ width: { xs: "100%", md: "auto" } }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("From")}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <CalendarMonthIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <MobileDatePicker
            inputFormat="dd-MMMM, yyy, HH:mm"
            value={
              router?.query?.endTime ? new Date(router?.query?.endTime) : null
            }
            cancelLabel={t("Cancel")}
            onChange={handleTimeEndFilter}
            sx={{ width: { xs: "100%", md: "auto" } }}
            renderInput={(params) => (
              <TextField
                {...params}
                label={t("To")}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <CalendarMonthIcon />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <FormControl sx={{ width: "100%" }}>
            <InputLabel id="demo-multiple-checkbox-label">
              {t("RegionFilter")}
            </InputLabel>
            <Select
              labelId="demo-multiple-checkbox-label"
              id="demo-multiple-checkbox"
              multiple
              value={
                router?.query?.regionQueryString &&
                router?.query?.regionQueryString !== "undefined"
                  ? router?.query?.regionQueryString?.split(",")
                  : []
              }
              onChange={handleChange}
              input={
                <OutlinedInput
                  label={t("RegionFilter")}
                  placeholder={t("RegionFilter")}
                />
              }
              renderValue={(selected) =>
                selected.map((item, indx) => {
                  const findRegion = regions?.find(
                    (reg) => reg.id === parseInt(item)
                  );
                  return `${indx > 0 ? "," : ""}${findRegion.label}`;
                })
              }
              MenuProps={MenuProps}
            >
              {regions.map((region) => (
                <MenuItem key={region.id} value={region.id?.toString()}>
                  <Checkbox
                    checked={router?.query?.regionQueryString?.includes(
                      region?.id?.toString()
                    )}
                  />
                  <ListItemText primary={region.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          {router?.query?.regionQueryString ||
          router?.query?.startTime ||
          router?.query?.endTime ? (
            <Stack direction="row" alignItems="center" height="100%" gap="10px">
              <Button color={"error"} variant="text" onClick={clearParams}>
                <ClearIcon />
              </Button>
              <FilteredOrdersStatusChangeModal />
            </Stack>
          ) : null}
        </Grid>
      </Grid>
    </Stack>
  );
};

export default OrderFilters;
