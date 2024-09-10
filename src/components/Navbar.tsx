import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="secondary" elevation={0} position="static">
        <Toolbar
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <img
            src="https://ensk.ai/static/c69a70736cb39de1896d57d88ad52ed4/02f45/primary_negative.webp"
            alt="logo"
            width={100}
            height={"auto"}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notifications
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
