import React from "react";
import { Container } from "react-bootstrap";

export default function VideoContainer({ videoURL }) {
  const test = "https://www.youtube.com/embed/xNRJwmlRBNU";

  return (
    <Container>
      {videoURL && (
        <div className="ratio ratio-16x9">
          <iframe
            src={videoURL}
            title="YouTube Video"
            height="540px"
            width="720px"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </Container>
  );
}
