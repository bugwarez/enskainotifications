import NotificationTabs from "@/components/NotificationTabs";
import { Box } from "@mui/material";
import React from "react";

function Home() {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "start",
        height: "80vh",
      }}
    >
      <NotificationTabs />
    </Box>
  );
}

export default Home;
