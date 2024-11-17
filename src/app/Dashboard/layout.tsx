"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import DashboardHeader from "./DashboardHeader";
import DashboardMenu from "./DashboardMenu";
import Grid from "@mui/material/Unstable_Grid2";
import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

const theme = createTheme({
  palette: {
    primary: { main: "#212121" },
  },
  typography: {
    fontFamily: ["Maven Pro", "sans-serif"].join(),
  },
});
const queryClient = new QueryClient();

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  const handleDrawerOpen: () => void = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose: () => void = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Grid container sx={{ backgroundColor: "#F3F3F9", display: "flex" }}>
            <Grid xs={6} md={2}>
              <DashboardMenu
                open={drawerOpen}
                handleDrawerClose={handleDrawerClose}
              />
            </Grid>
            <Grid xs={12} md={10}>
              <DashboardHeader handleDrawerOpen={handleDrawerOpen} />
              <Container maxWidth="xl">{children}</Container>
            </Grid>
          </Grid>
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
