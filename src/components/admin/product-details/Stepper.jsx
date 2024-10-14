import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useTranslation } from "react-i18next";

const steps = [
  "Tovar kartochkasi",
  "Mahsulot SKU birikmasi",
  "Yakuniy saqlash",
];

export default function ProductCreateStepper({ step, onSave, isLoading }) {
  const { t } = useTranslation("translation");
  const [activeStep, setActiveStep] = React.useState(step);

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Stack width="100%" display={{ xs: "none", md: "flex" }}>
        <Stepper
          nonLinear
          activeStep={step}
          // orientation={{ xs: "vertical", md: "" }}
        >
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <Stack width="100%" display={{ xs: "", md: "none" }}>
        <Stepper nonLinear activeStep={step} orientation="vertical">
          {steps.map((label, index) => (
            <Step key={label}>
              <StepButton color="inherit">{label}</StepButton>
            </Step>
          ))}
        </Stepper>
      </Stack>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: { xs: "space-between", md: "end" },
          mt: { xs: 3, md: 0 },
          width: { xs: "100%", md: "max-contet" },
        }}
      >
        <LoadingButton loading={isLoading} variant="contained" onClick={onSave}>
          {step === 1 ? t("EndIt") : t("Next")}
        </LoadingButton>
      </Box>
    </Box>
  );
}
