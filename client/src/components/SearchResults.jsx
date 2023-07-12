import React from "react";

export default function SearchResults({
  songResults,
  setLyrics,
  setSongResults,
  setLoading,
  setVideo,
}) {
  const handleLyricsRender = (url) => {
    setLoading("Loading...");

    // ghost town, kanye west
    fetch(`/lyrics`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        url,
      }),
    })
      .then((res) => res.json())
      .then((lyrics) => {
        setLyrics(lyrics);
        setSongResults([]);
        setLoading("");
      });
  };

  const handleVideoRender = (title, artist) => {
    // ghost town, kanye west
    fetch(`https://api.vimeo.com/videos?query=${artist} ${title}`, {
      method: "GET",
      headers: {
        Authorization: "bearer 989590d710db4b6df1e96202fd01f2f0",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((videos) => {
        setVideo(videos.data[0]?.player_embed_url);
      });
  };

  // vimeo endpoint: 'https://api.vimeo.com/videos?query=Piano Man%20billy joel'

  return (
    <div className="results-container" style={{ width: "100%" }}>
      {songResults.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          {songResults.map((song, idx) => (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                margin: "20px",
                width: "300px",
              }}
              key={idx}
            >
              <img
                src={song.song_art_image_url}
                height="200px"
                width="200px"
                alt="song_art_image_url"
                style={{
                  borderRadius: "20px",
                }}
              />
              <h5
                onClick={() => {
                  handleLyricsRender(song.url);
                  handleVideoRender(song.title, song.artist);
                }}
                style={{ color: "white", cursor: "pointer" }}
              >
                {song.full_title}
              </h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
