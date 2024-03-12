import React, { useEffect, useState } from "react";
import netflix from "../images/netflix-logo.png";
import { Button } from "@mui/material";

function Navbar() {
  const [movies, setMovies] = useState([]);

  const getMovie = () => {
    try {
      fetch(
        "https://api.themoviedb.org/3/discover/movie?api_key=da703fb276661e683ccbbc69c8977230"
      )
        .then((res) => res.json())
        .then((json) => {
          setMovies(json.results);
        });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movies[3]?.poster_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "500px",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0px 30px",
        }}
      >
        <img
          style={{
            width: "120px",
            height: "120px",
            mixBlendMode: "color-burn",
          }}
          src={netflix}
          alt="netflix logo"
        />
        <Button color="error" variant="contained" sx={{ height: "40px" }}>
          Sign In
        </Button>
      </div>
      <div style={{ padding: "20px" }}>
        <h1
          style={{
            color: "#F1F1F1",
            fontSize: "70px",
            fontFamily: "initial",
            textAlign: "left",
          }}
        >
          {movies[3]?.original_title}
        </h1>
        <h3 style={{ color: "#F1F1F1" }}>{movies[3]?.overview}</h3>
      </div>
      <Button
        variant="contained"
        sx={{ color: "black", bgcolor: "white", fontWeight: "bold" }}
      >
        Play Episode
      </Button>
    </div>
  );
}

export default Navbar;
