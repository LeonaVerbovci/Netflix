import React, { useState } from "react";
import { Modal, Button, TextField } from "@mui/material";

function AddMovieModal({ open, onClose }) {
  const [movieTitle, setMovieTitle] = useState("");
  const [movieDescription, setMovieDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleClose = () => {
    setMovieTitle("");
    setMovieDescription("");
    setSelectedFile(null);
    onClose();
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddMovie = () => {
    // Here you can add your logic to actually add the movie
    console.log("Adding movie:", movieTitle, movieDescription);
    // Upload the selected file
    console.log("Selected file:", selectedFile);
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="add-movie-modal-title"
      aria-describedby="add-movie-modal-description"
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "5px",
        }}
      >
        <h2 id="add-movie-modal-title">Add a Movie</h2>
        <TextField
          label="Title"
          value={movieTitle}
          onChange={(e) => setMovieTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Description"
          value={movieDescription}
          onChange={(e) => setMovieDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ marginTop: "10px" }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginTop: "20px",
          }}
        >
          <Button
            onClick={handleClose}
            variant="contained"
            color="secondary"
            style={{
              marginRight: "10px",
              color: "black",
              backgroundColor: "white",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddMovie}
            variant="contained"
            style={{ backgroundColor: "green" }}
          >
            Add
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddMovieModal;
