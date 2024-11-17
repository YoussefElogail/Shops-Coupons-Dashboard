"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Login from "./login";
import { createTheme, ThemeProvider } from "@mui/material/styles"; // Updated import

const theme = createTheme({
  palette: {
    primary: { main: "#212121" },
  },
  typography: {
    fontFamily: ["Maven Pro", "sans-serif"].join(),
  },
});
const queryClient = new QueryClient();
export default function Page() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Login />
      
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
