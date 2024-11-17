"use client";
import useGetUsers from "@/app/customHooks/usersHooks/useGetUsers";
import { Box, CircularProgress, IconButton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

const userTitles: string[] = ["email", "phone"];
const userTitlesList = userTitles.map((title) => {
  return (
    <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
      {title}
    </Grid>
  );
});

export default function UsersList() {
  const { data, isPending } = useGetUsers();
  const usersData: userType[] = data?.data.data;
  const usersList = usersData?.map((user, index) => {
    return (
      <Grid
        spacing={2}
        container
        key={index}
        sx={{
          boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem 0",
          color: "primary.main",
          margin: "1rem 0",
        }}
      >
        <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          {user.email}
        </Grid>
        <Grid xs={6} sx={{ display: "flex", justifyContent: "center" }}>
          {user.phone_number}
        </Grid>
      </Grid>
    );
  });
  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Grid
        spacing={2}
        container
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          padding: "0.5rem 0",
          margin: "1rem 0",
        }}
      >
        {userTitlesList}
      </Grid>
      {isPending ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        usersList
      )}
    </Box>
  );
}
