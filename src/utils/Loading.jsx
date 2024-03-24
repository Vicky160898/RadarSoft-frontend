import React from "react";
import { Grid } from "@mui/material";
import { ThreeDots } from "react-loader-spinner";

function Loading() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }} // Set the minimum height of the container to full viewport height
    >
      <Grid item>
        <ThreeDots
          visible={true}
          height={80}
          width={80}
          color="#4fa94d"
          radius={9}
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </Grid>
    </Grid>
  );
}

export default Loading;
