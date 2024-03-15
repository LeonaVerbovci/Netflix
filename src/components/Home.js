import { Box, Card, CardMedia, Grid } from "@mui/material";
import { doc, setDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { database } from "../firebase/setup";
import axios from "axios";

function Home() {
  const [movies, setMovies] = useState([]);

  const getMovie = async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/discover/movie?api_key=da703fb276661e683ccbbc69c8977230"
      );
      setMovies(response.data.results);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  const addMovie = async (movie) => {
    const movieRef = doc(database, "Movies", `${movie.id}`);
    try {
      await setDoc(movieRef, {
        movieName: movie.original_title,
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#181818" }}>
      <Grid container spacing={2}>
        {movies.map((movie) => {
          addMovie(movie);
          return (
            <Grid item xs={12} sm={6} md={3} lg={3} key={movie.id}>
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
