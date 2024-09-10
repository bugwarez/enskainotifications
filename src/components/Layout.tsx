import React from "react";
import Box from "@mui/material/Box";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        paddingX: { xs: 3, sm: 5, md: 12, lg: 15, xl: 17 },
        paddingY: { xs: 1, sm: 2, md: 3, lg: 4, xl: 5 },
      }}
    >
      {children}
    </Box>
  );
}

export default Layout;
