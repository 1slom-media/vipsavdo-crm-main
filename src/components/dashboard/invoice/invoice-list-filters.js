import { useRef } from "react";
import PropTypes from "prop-types";
import {
  Box,
  Button,
  Checkbox,
  Drawer,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputAdornment,
  Stack,
  Switch,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Search as SearchIcon } from "../../../icons/search";
import { X } from "../../../icons/x";
import { Scrollbar } from "../../scrollbar";
import { regions } from "utils/regions";
import { useRouter } from "next/router";
import ClearIcon from "@mui/icons-material/Clear";
import { MobileDatePicker } from "@mui/x-date-pickers";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { format } from "date-fns";
import { useTranslation } from "react-i18next";

const FiltersDrawerDesktop = styled(Drawer)({
  flexShrink: 0,
  width: 380,
  "& .MuiDrawer-paper": {
    position: "relative",
    width: 380,
  },
});

const FiltersDrawerMobile = styled(Drawer)({
  maxWidth: "100%",
  width: 380,
  "& .MuiDrawer-paper": {
    height: "calc(100% - 64px)",
    maxWidth: "100%",
    top: 64,
    width: 380,
  },
});

export const InvoiceListFilters = (props) => {
  const {
    containerRef,
    filters = {},
    onChange,
    onClose,
    open,
    ...other
  } = props;

  const router = useRouter();
  const queryRef = useRef(null);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));
  const { t } = useTranslation();
  const path = "/dashboard/invoices/orders-invoice";
  const { page, limit, status, from, to, filter, region } = router?.query;

  const handleQueryChange = (event) => {
    event.preventDefault();
    onChange?.({
      ...filters,
      query: queryRef.current?.value,
    });
  };

  const handleStartDateChange = (newValue) => {
    const startTime = format(new Date(newValue), "yyyy-MM-dd");

    const endTime = router?.query?.to
      ? format(new Date(router?.query?.to), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd");
    console.log("queryyyyyyyyyy", startTime);
    router?.push(
      `${path}?page=1&limit=${router?.query?.limit}&from=${startTime}&to=${endTime}`
    );
  };

  const handleEndDateChange = (newValue) => {
    const endTime = format(new Date(newValue), "yyyy-MM-dd");
    console.log("queryyyyyyyyyy", endTime);
    const startTime = router?.query?.from
      ? format(new Date(router?.query?.from), "yyyy-MM-dd")
      : format(new Date(), "yyyy-MM-dd");

    if (region) {
    }

    router?.push(
      `${path}?page=1&limit=${router?.query?.limit}&from=${startTime}&to=${endTime}`
    );
  };

  const handleCustomerChange = (event) => {
    const newValue = event.target.value;
    let regions = router?.query?.region
      ? router?.query?.region?.split(",")
      : [];
    if (regions?.includes(newValue)) {
      regions = regions.filter((dd) => dd !== newValue);
    } else {
      regions?.push(newValue);
    }

    if (from && to) {
      router?.push(
        `${path}?page=1&limit=${router?.query?.limit}&status=${router?.query?.status}&region=${regions}&from=${from}&to=${to}`
      );
    } else {
      router?.push(
        `${path}?page=1&limit=${router?.query?.limit}&status=${router?.query?.status}&region=${regions}`
      );
    }
  };

  const handleInputChange = (e) => {
    router?.push(
      `${path}?page=1&limit=${router?.query?.limit}&status=${router?.query?.status}&filter=${e.target.value}`
    );
  };

  const clearParams = () => {
    router.push(
      `${router?.pathname}?page=${page}&limit=${limit}&status=${"new"}`
    );
  };

  const content = (
    <Box
      sx={{
        pb: 3,
        pt: {
          xs: 3,
          lg: 8,
        },
        px: 3,
      }}
    >
      <Box
        sx={{
          display: {
            lg: "none",
          },
          mb: 2,
        }}
      >
        <IconButton onClick={onClose}>
          <X fontSize="small" />
        </IconButton>
      </Box>
      <Box component="form" onSubmit={handleQueryChange}>
        <Box mb={2}>
          <Typography variant="caption" color="text.secondary">
            Qidiruv parametri : Isim , Raqam , #id
          </Typography>
        </Box>
        <TextField
          defaultValue=""
          fullWidth
          inputProps={{ ref: queryRef }}
          onChange={(e) => handleInputChange(e)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
          label="Qidiruv"
          placeholder="Qidiruv parametrini kirting"
        />
      </Box>
      <Typography color="textSecondary" sx={{ mt: 3 }} variant="subtitle2">
        Vaqt parametrlari orqali qidiruv
      </Typography>
      <Stack spacing={2} sx={{ mt: 2 }}>
        <MobileDatePicker
          inputFormat="dd-MMMM, yyy, HH:mm"
          value={router?.query?.from ? new Date(router?.query?.from) : null}
          cancelLabel={"Cancel"}
          onChange={handleStartDateChange}
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
        <MobileDatePicker
          inputFormat="dd-MMMM, yyy, HH:mm"
          value={router?.query?.to ? new Date(router?.query?.to) : null}
          cancelLabel={"Cancel"}
          onChange={handleEndDateChange}
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
      </Stack>
      <Typography color="textSecondary" sx={{ mt: 3 }} variant="subtitle2">
        Viloyatlar kesimida filtrlash
      </Typography>
      <Box
        sx={{
          backgroundColor: "background.default",
          borderColor: "divider",
          borderRadius: 1,
          borderStyle: "solid",
          borderWidth: 1,
          mt: 2,
        }}
      >
        <Scrollbar sx={{ maxHeight: 200 }}>
          <FormGroup
            sx={{
              py: 1,
              px: 1.5,
            }}
          >
            {regions.map((region) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={router?.query?.region?.includes(region?.id)}
                    onChange={handleCustomerChange}
                  />
                }
                key={region.id}
                label={region.label}
                value={region.id}
              />
            ))}
          </FormGroup>
        </Scrollbar>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
        mt={2}
      >
        <Button
          color={"error"}
          variant="contained"
          onClick={clearParams}
          fullWidth
        >
          <ClearIcon />
          Filterlarni tozalsh
        </Button>
      </Box>
    </Box>
  );

  if (lgUp) {
    return (
      <FiltersDrawerDesktop
        anchor="left"
        open={open}
        SlideProps={{ container: containerRef?.current }}
        variant="persistent"
        {...other}
      >
        {content}
      </FiltersDrawerDesktop>
    );
  }

  return (
    <FiltersDrawerMobile
      anchor="left"
      ModalProps={{ container: containerRef?.current }}
      onClose={onClose}
      open={open}
      SlideProps={{ container: containerRef?.current }}
      variant="temporary"
      {...other}
    >
      {content}
    </FiltersDrawerMobile>
  );
};

InvoiceListFilters.propTypes = {
  containerRef: PropTypes.any,
  filters: PropTypes.object,
  onChange: PropTypes.func,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
