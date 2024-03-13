import { Box, Card, CardMedia, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div style={{ backgroundColor: "#181818" }}>
      <Grid container spacing={2}>
        {movies.map((movie) => {
          return (
            <Grid item xs={12} sm={6} md={3} lg={3}>
              <Box>
                <Link to="/movieDetail" state={{ movie: movie }}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={`https://image.tmdb.org/t/p/original${movie?.poster_path}`}
                    ></CardMedia>
                  </Card>
                </Link>
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Home;
