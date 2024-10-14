import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import Card1 from "../Cards/Card1";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can use your own error logging service here
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      return (
        <Stack mt={2}>
          <Card1
            sx={{
              borderRadius: 5,
              width: { xs: "100%", lg: "60%", margin: "auto" },
            }}
          >
            <Stack direction="row" justifyContent="center">
              <Box
                width={300}
                component="img"
                src="/assets/media/error.png"
                alt="not found image"
              />
            </Stack>
            <Stack>
              <Typography align="center" variant="body2" color="text.secondary">
                Xatolik
              </Typography>
              <Typography align="center" variant="body1" color="text.secondary">
                Nomalum xatolik yuz berdi! Muammo platforma taminotchilariga
                jo`natildi. Tez orada muammo bartaraf etiladi.
                Noqulayliklar uchun uzr...
              </Typography>
            </Stack>
            <Stack mt={2} direction="row" justifyContent="center">
              <Button
                onClick={() => this.setState({ hasError: false })}
                variant="contained"
                color="secondary"
              >
                Qayta yuklash
              </Button>
            </Stack>
          </Card1>
        </Stack>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
