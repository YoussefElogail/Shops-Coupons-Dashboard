import { Box } from "@mui/material";
import Heading from "../DashboardSharedComponent/Heading";
import UsersList from "./(userscomponent)/Userslist";

export default function Users() {
  return (
    <Box sx={{ margin: "1rem 0" }}>
      <Heading title="Users" />
      <UsersList />
    </Box>
  );
}
