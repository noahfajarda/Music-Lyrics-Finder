import React, { useReducer, useState } from "react";

// import materialize to handle error
import M from "materialize-css";

export default function Form({
  setSongResults,
  setLyrics,
  setLoading,
  setVideo,
}) {
  const [state, dispatch] = useReducer(
    (state, action) => ({
      ...state,
      ...action,
    }),
    {
      track: "Ghost Town",
      artist: "Kanye West",
    }
  );

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!state.track && !state.artist) {
      // show pop-up
      M.toast({
        html: "Either a track or artist was not entered",
        classes: "#c62828 red darken-3",
      });
      return;
    }
    setLoading("Loading...");
    setVideo("");

    // ghost town, kanye west
    fetch(`/track/${state.track}/${state.artist}`)
      .then((res) => res.json())
      .then((results) => {
        setSongResults(results);
        setLyrics([]);
        setLoading("");
      });
  };

  return (
    <form
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onSubmit={(e) => handleFormSubmit(e)}
    >
      {/* form */}
      <h3>Track</h3>
      <input
        style={{ color: "black" }}
        className="w-40"
        type="text"
        value={state.track}
        onChange={(e) => dispatch({ track: e.target.value })}
      />
      <h3>Artist</h3>
      <input
        className="w-40"
        type="text"
        value={state.artist}
        style={{ color: "black" }}
        onChange={(e) => dispatch({ artist: e.target.value })}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
