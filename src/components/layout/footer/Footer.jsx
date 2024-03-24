import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "#2196f3",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        marginTop: "40px",
        color: "#fff",
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography variant="h5">Radar Blog App</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              A platform for sharing and exploring blogs on various topics.
            </Typography>
          </Grid>
          <Grid item xs={12} mt={2}>
            <Typography variant="subtitle2">
              {`© ${new Date().getFullYear()} Radar Blog App | All Rights Reserved`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
