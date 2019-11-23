const express = require('express');
const api = require('./api');

const app = express();
const port = process.env.PORT || 3000;

app.get('/random_lyrics/:artist', async (req, res) => {
  try {
    const { artist } = req.params;
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
