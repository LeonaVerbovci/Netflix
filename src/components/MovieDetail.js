import { Button, Grid } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";

function MovieDetail() {
  const location = useLocation();

  console.log("location", location);

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <div
          style={{
            backgroundImage: ` linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(https://image.tmdb.org/t/p/original${location.state.movie?.poster_path})`,
            height: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            style={{
              paddingTop: "300px",
              paddingLeft: "30px",
              paddingRight: "30px",
              fontFamily: "initial",
            }}
          >
            <Grid container>
              <h1 style={{ color: "red", fontSize: "50px" }}>
                {location.state.movie?.original_title}
              </h1>
            </Grid>
            <h4 style={{ color: "white" }}>
              Language : {location.state.movie?.original_language}
            </h4>
            <Grid container>
              <h3 style={{ color: "white", fontWeight: "100" }}>
                {location.state.movie?.overview}
              </h3>
              <Button
                variant="contained"
                sx={{ color: "black", bgcolor: "white" }}
              >
                Play Trailer
              </Button>
            </Grid>
          </div>
        </div>
      </Grid>
      <Grid item xs={6}>
        <div>
          <div>Add Review</div>
          <div>Show Review</div>
        </div>
      </Grid>
    </Grid>
  );
}

export default MovieDetail;
