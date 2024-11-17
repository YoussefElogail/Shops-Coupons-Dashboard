import { Box, Button, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
export default function Heading({
  title,
  handleOpen,
  buttonTitle,
}: {
  title: string;
  handleOpen?: () => void;
  buttonTitle?: string;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        boxShadow: "rgba(0, 0, 0, 0.18) 0px 2px 4px",
        padding: "1rem",
        backgroundColor: "white",
      }}
    >
      <Typography
        className="storesHeaderTitle"
        variant="h4"
        color={"primary"}
        fontWeight={900}
      >
        {title}
      </Typography>
      {buttonTitle ? (
        <Button variant="contained" endIcon={<AddIcon />} onClick={handleOpen}>
          {buttonTitle}
        </Button>
      ) : (
        ""
      )}
    </Box>
  );
}
