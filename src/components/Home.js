import { Box, Card, CardMedia, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";

function Home() {
  const [movies, setMovies] = useState([]);
  const getMovie = () => {
    try {
      fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=da703fb276661e683ccbbc69c8977230"
      )
        .then((res) => res.json())
        .then((json) => setMovies(json.results));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);
  console.log(movies);
  return (
    <div>
      <Grid container spacing={2}>
        {movies.map((movies) => {
          return (
            <Grid
              item
              xs={3}
              style={{
                paddingTop: "20px",
                paddingRight: "20px",
                paddingLeft: "20px",
              }}
            >
              <Box>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`https://image.tmdb.org/t/p/w500${movies.poster_path}`}
                  ></CardMedia>
                </Card>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
