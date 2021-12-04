import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

export default function Stepper({ length, setActiveStep, activeStep }) {
  const theme = useTheme();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <MobileStepper
      variant='dots'
      steps={length}
      position='static'
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      style={{ marginTop: "5rem" }}
      nextButton={
        <Button
          style={{ textTransform: "none", color: "#223322" }}
          size='small'
          onClick={handleNext}
          disabled={activeStep === length - 1}
        >
          Next Product
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button
          style={{ textTransform: "none", color: "#223322" }}
          size='small'
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
          Previous Product
        </Button>
      }
    />
  );
}
