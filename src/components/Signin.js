import React from "react";
import { signInWithPopup } from "firebase/auth";
import { Button } from "@mui/material";
import { GoogleAuth, auth } from "../firebase/setup";
import netflix from "../images/net-logo.svg";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signin() {
  const navigate = useNavigate();

  const googleSignIn = async () => {
    try {
      await signInWithPopup(auth, GoogleAuth);
      setTimeout(() => {
        auth.currentUser?.emailVerified && navigate("/");
      }, 2000);
      toast.success("Signed In Successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  console.log(auth?.currentUser);

  return (
    <div style={{ backgroundColor: "#181818", height: "100vh" }}>
      <ToastContainer autoClose={2000} />
      <img
        style={{ width: "250px", height: "120px", margin: 0, padding: 0 }}
        src={netflix}
        alt="netflix logo"
      />
      <div style={{ position: "fixed", left: "45%", top: "35%" }}>
        <Button onClick={googleSignIn} variant="contained" color="error">
          Sign In with a Google
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
