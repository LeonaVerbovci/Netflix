import React, { useCallback, useEffect, useState } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useLocation } from "react-router-dom";
import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { auth, database } from "../firebase/setup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MovieDetail() {
  const [review, setReview] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const location = useLocation();

  const moviePosterUrl = `https://image.tmdb.org/t/p/original${location.state.movie?.poster_path}`;

  const moviewRef = doc(database, "Movies", `${location.state.movie.id}`);
  const reviewRef = collection(moviewRef, "Reviews");

  const addReview = async () => {
    try {
      await addDoc(reviewRef, {
        movieReview: review,
        email: auth.currentUser?.email,
        username: auth.currentUser?.displayName,
        profile_image: auth.currentUser?.photoURL,
      });
      showReview();
      toast.success("Review added Successfully!", { theme: "dark" });
    } catch (err) {
      console.error(err);
    }
  };

  const showReview = useCallback(async () => {
    try {
      const data = await getDocs(reviewRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReviewData(filteredData);
    } catch (err) {
      console.error(err);
    }
  }, [reviewRef]);

  useEffect(() => {
    showReview(); // Fetch reviews on component mount
  }, [showReview]); // Include showReview in dependency array

  return (
    <Grid container>
      <Grid item xs={8}>
        <div
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${moviePosterUrl})`,
            height: "100vh",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            paddingTop: "300px",
            paddingLeft: "30px",
            paddingRight: "30px",
            fontFamily: "initial",
          }}
        >
          <ToastContainer autoClose={2000} />
          <h1 style={{ color: "red", fontSize: "50px" }}>
            {location.state.movie?.original_title}
          </h1>
          <div style={{ display: "flex" }}>
            <h4 style={{ color: "white" }}>
              Language : {location.state.movie?.original_language} -
            </h4>
            <h4 style={{ color: "white", marginLeft: "10px" }}>
              Release Date : {location.state.movie?.release_date}
            </h4>
          </div>
          <h3 style={{ color: "white", fontWeight: "100" }}>
            {location.state.movie?.overview}
          </h3>
          <Button variant="contained" sx={{ color: "black", bgcolor: "white" }}>
            Play Trailer
          </Button>
        </div>
      </Grid>
      <Grid item xs={4}>
        <div
          style={{ backgroundColor: "black", height: "100vh", padding: "40px" }}
        >
          <h5 style={{ color: "#A4A4A4", fontWeight: "100" }}>Add REVIEW</h5>
          <TextField
            onChange={(e) => setReview(e.target.value)}
            size="small"
            label="Review"
            variant="outlined"
            style={{ backgroundColor: "white", borderRadius: "5px" }}
          />
          <Button
            onClick={addReview}
            sx={{ ml: "10px", bgcolor: "red", color: "white" }}
            variant="contained"
          >
            Submit
          </Button>
          <h5
            style={{ color: "#A4A4A4", fontWeight: "100", marginTop: "20px" }}
          >
            REVIEWS
          </h5>
          {reviewData.map((each) => (
            <div
              key={each.id}
              style={{ display: "flex", alignItems: "center" }}
            >
              <img
                style={{ width: "40px", borderRadius: "100%" }}
                src={each.profile_image}
                alt="profile img"
              />
              <h4 style={{ color: "white", paddingLeft: "10px" }}>
                {each.username}
              </h4>
              <h6 style={{ color: "grey", paddingLeft: "10px" }}>
                {each.movieReview}
              </h6>
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
}

export default MovieDetail;
