import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import YouTube from "react-youtube";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Trailer({ location }) {
  const [tailerView, setTrailerView] = useState([]);
  const showTrailer = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/${location.state.movie.id}/videos?api_key=da703fb276661e683ccbbc69c8977230&language=en-US`
    )
      .then((res) => res.json())
      .then((json) => setTrailerView(json.results));
  };

  useEffect(() => {
    showTrailer();
  }, []);

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <Button
        variant="conatined"
        sx={{ color: "black", bgcolor: "white" }}
        onClick={openModal}
      >
        PLAY TRAILER
      </Button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
        {tailerView.length > 0 && <YouTube videoId={tailerView[0].key} />}
      </Modal>
    </div>
  );
}

export default Trailer;
