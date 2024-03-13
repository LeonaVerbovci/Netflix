import React, { useEffect, useState } from "react";
import netflix from "../images/net-logo.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import { signOut } from "firebase/auth";

function Navbar() {
  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();
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

  const signinClick = () => {
    navigate("/signin");
  };

  useEffect(() => {
    getMovie();
  }, []);
  console.log(auth.currentUser?.email);

  return (
    <div
      style={{
        backgroundImage: ` linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${movies[3]?.poster_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        paddingBottom: "2%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <img
          style={{
            width: "250px",
            height: "120px",
          }}
          src={netflix}
          alt="netflix logo"
        />
        {auth.currentUser ? (
          <Button
            onClick={logout}
            variant="contained"
            color="error"
            sx={{ height: "40px", marginRight: "5%" }}
          >
            Logout
          </Button>
        ) : (
          <Button
            onClick={signinClick}
            color="error"
            variant="contained"
            sx={{ height: "40px", marginRight: "5%" }}
          >
            Sign In
          </Button>
        )}
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
        <Button
          variant="contained"
          sx={{ color: "black", bgcolor: "white", fontWeight: "bold" }}
        >
          Play Episode
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
