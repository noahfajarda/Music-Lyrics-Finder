const express = require('express');
const router = express.Router()

// to retrieve lyrics
const axios = require("axios");
const cheerio = require("cheerio");

async function getLyrics(url) {
  let { data } = await axios.get(url);
  const $ = cheerio.load(data);
  let lyrics = $('div[class="lyrics"]').text().trim();
  if (!lyrics) {
    lyrics = "";
    $('div[class^="Lyrics__Container"]').each((i, elem) => {
      if ($(elem).text().length !== 0) {
        let snippet = $(elem)
          .html()
          .replace(/<br>/g, "\n")
          .replace(/<(?!\s*br\s*\/?)[^>]+>/gi, "");

        lyrics += $("<textarea/>").html(snippet).text().trim() + "\n\n";
      }
    });
  }
  return lyrics.trim();
}

async function getSongs(song, artist) {
  const token = "pwUpWRQwegLyPxG9hbfzkmhpGCYexXSF4LxV_8r2dxGSss6ThUkHNNdOMV4E0ZpI"

  // search song
  const data = await fetch(
    `https://api.genius.com/search?q=${song}${artist}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  const songData = await data.json();
  return songData;
}

router.get("/track/:song/:artist", async (req, res) => {
  let data = await getSongs(req.params.song, req.params.artist || "")
  data = data.response.hits.map(result => {
    const { url, song_art_image_url, full_title } = result.result
    return { url, song_art_image_url, full_title }
  })
  res.send(data)
})

router.get("/track/:song", async (req, res) => {
  let data = await getSongs(req.params.song, "")
  data = data.response.hits.map(result => {
    const { url, song_art_image_url, full_title } = result.result
    return { url, song_art_image_url, full_title }
  })
  res.send(data)
})

router.post("/lyrics", async (req, res) => {
  const songURL = req.body.url
  // get lyrics
  const lyrics = (await getLyrics(songURL)).split("\n");
  res.send(lyrics)
})

module.exports = router;
