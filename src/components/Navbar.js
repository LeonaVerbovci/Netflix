import React, { useEffect, useState } from "react";
import netflix from "../images/net-logo.svg";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/setup";
import { signOut } from "firebase/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Trailer from "./Trailer";
import axios from "axios";
import AddMovieModal from "../components/Addmovie";

function Navbar() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [isAddMovieModalOpen, setIsAddMovieModalOpen] = useState(false); // State to control the visibility of the AddMovieModal

  useEffect(() => {
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
    getMovie();
  }, []);

  const logout = async () => {
    try {
      await signOut(auth);
      navigate("/");
      toast.success("Logged out Successfully!", {
        theme: "dark",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const signinClick = () => {
    navigate("/signin");
  };

  const toggleAddMovieModal = () => {
    setIsAddMovieModalOpen(!isAddMovieModalOpen);
  };

  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${movies[3]?.poster_path})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        paddingBottom: "2%",
      }}
    >
      <ToastContainer autoClose={2000} />
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
          alt="Netflix Logo"
        />
        {auth.currentUser ? (
          <div style={{ display: "flex", paddingRight: "50px" }}>
            <Button
              onClick={logout}
              variant="contained"
              color="error"
              sx={{ height: "40px", marginRight: "5px" }}
            >
              Logout
            </Button>
            <Button
              onClick={toggleAddMovieModal}
              variant="contained"
              color="success"
            >
              Add Movie
            </Button>
          </div>
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
          sx={{
            height: "45px",
            color: "white",
            bgcolor: "grey",
            fontWeight: "bold",
          }}
        >
          Play Trailer
        </Button>
      </div>

      {auth.currentUser && (
        <AddMovieModal
          open={isAddMovieModalOpen}
          onClose={toggleAddMovieModal}
        />
      )}
    </div>
  );
}

export default Navbar;
