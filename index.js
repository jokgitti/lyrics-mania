const express = require('express');
const bodyParser = require('body-parser');
const api = require('./api');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/random_lyrics/', async (req, res) => {
  try {
    const { text: artist } = req.body;
    if (!artist) {
      res.send(400);
      return;
    }

    const tracksResponse = await api.trackSearch({ artist });

    const tracks = tracksResponse.data.message.body.track_list.map(track => track.track);

    const validTracks = tracks.filter(track => track.has_lyrics);
    if (validTracks.length === 0) {
      res.send(404);
      return;
    }

    const randomTrackIndex = Math.floor(Math.random() * validTracks.length);
    const track = validTracks[randomTrackIndex];

    const lyricsResponse = await api.lyricsGet({ trackId: track.track_id });
    const lyrics = lyricsResponse.data.message.body.lyrics.lyrics_body;

    res.send({
      name: track.track_name,
      artist: track.artist_name,
      lyrics: lyrics.replace('******* This Lyrics is NOT for Commercial use *******', ''),
    });
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
