import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import Form from './components/Form';
import SearchResults from './components/SearchResults';
import LyricsContainer from './components/LyricsContainer';
import VideoContainer from './components/VideoContainer';

function App() {
  const [lyrics, setLyrics] = useState([])
  const [songResults, setSongResults] = useState([])
  const [loading, setLoading] = useState("");
  const [video, setVideo] = useState("")

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Lyrics Finder</h1>
        <h5>Type in a Track and/or an Artist to search for lyrics!</h5>
        {/* search */}
        <Form setSongResults={setSongResults} setLyrics={setLyrics} setLoading={setLoading} setVideo={setVideo} />
        <VideoContainer videoURL={video} />
        <h4>{loading}</h4>
        {/* search results */}
        <SearchResults songResults={songResults}
          setLyrics={setLyrics}
          setSongResults={setSongResults}
          setLoading={setLoading}
          setVideo={setVideo} />
        {/* lyrics */}
        <LyricsContainer lyrics={lyrics} />
      </header>
    </div>
  );
}

export default App;
