import React from "react";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@mui/material";
import { GoogleAuth, auth } from "../firebase/setup";
import netflix from "../images/netflix-logo.png";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, GoogleAuth);

      auth.currentUser?.emailVerified && navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  console.log(auth?.currentUser);

  return (
    <div
      style={{ backgroundColor: "#181818", height: "100vh", padding: "20px" }}
    >
      <img
        style={{ width: "120px", height: "120px" }}
        src={netflix}
        alt="netflix logo"
      />
      <div style={{ position: "fixed", left: "45%", top: "35%" }}>
        <Button onClick={googleSignIn} variant="contained" color="error">
          Sign In
        </Button>
        <br />
        <h2 style={{ color: "white" }}>
          Let's start to <br /> explore movies <br /> from here.
        </h2>
      </div>
    </div>
  );
}

export default Signin;