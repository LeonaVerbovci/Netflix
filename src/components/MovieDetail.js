import { Button, Grid, TextField } from "@mui/material";
import { doc, addDoc, collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { auth, database } from "../firebase/setup";

function MovieDetail() {
  const [review, setReview] = useState("");
  const [reviewData, setReviewData] = useState([]);

  const location = useLocation();
  console.log("location", location);

  const moviewRef = doc(database, "Movies", `${location.state.movie.id}`);
  const reviewRef = collection(moviewRef, "Reviews");

  console.log("auth", auth);
  const addReview = async () => {
    try {
      await addDoc(reviewRef, {
        movieReview: review,
        email: auth.currentUser?.email,
        username: auth.currentUser?.displayName,
        profile_image: auth.currentUser?.photoURL,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const showReview = async () => {
    try {
      const data = await getDocs(reviewRef);
      //   console.log("data", data);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setReviewData(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    showReview();
  }, []);
  //   console.log("review data", reviewData);
  return (
    <Grid container>
      <Grid item xs={8}>
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
            <div style={{ display: "flex" }}>
              <h4 style={{ color: "white" }}>
                Language : {location.state.movie?.original_language} -
              </h4>
              <h4 style={{ color: "white" }}>
                Release Date : {location.state.movie?.release_date}
              </h4>
            </div>

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
      <Grid item xs={4}>
        <div
          style={{
            backgroundColor: "black",
            height: "100vh",
            padding: "40px",
          }}
        >
          <Grid container>
            <div>
              <h5 style={{ color: "#A4A4A4", fontWeight: "100" }}>
                Add REVIEW
              </h5>
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
            </div>
          </Grid>
          <Grid container>
            <div>
              <h5 style={{ color: "#A4A4A4", fontWeight: "100" }}>REVIEW</h5>
              {reviewData.map((each) => {
                return (
                  <>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <img
                        style={{ width: "40px", borderRadius: "100%" }}
                        src={each.profile_image}
                        alt="profile img"
                      />
                      <h4 style={{ color: "white", paddingLeft: "10px" }}>
                        {each.username}
                      </h4>
                    </div>

                    <h6 style={{ color: "grey" }}>{each.movieReview}</h6>
                  </>
                );
              })}
            </div>
          </Grid>
        </div>
      </Grid>
    </Grid>
  );
}

export default MovieDetail;
