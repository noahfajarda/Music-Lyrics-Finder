import React from "react";

export default function LyricsContainer({ lyrics }) {
  return (
    <div className="lyrics-container">
      {/* lyrics */}
      {lyrics.length > 0 && (
        <div>
          {lyrics.map((line, idx) => {
            // add another line to match lyrics format
            if (line.includes("[")) {
              return (
                <div key={idx}>
                  <br />
                  <div>{line}</div>
                </div>
              );
            }
            return <div key={idx}>{line}</div>;
          })}
        </div>
      )}
    </div>
  );
}
