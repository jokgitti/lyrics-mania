const express = require('express');
const bodyParser = require('body-parser');
const slackMessage = require('./slackMessage');
const tracks = require('./tracks');
const lyrics = require('./lyrics');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/random_lyrics/', async (req, res) => {
  try {
    const { text: artist, response_url } = req.body;
    if (!artist) {
      res.send(400);
      return;
    }

    const track = await tracks.getRandomTrackByArtist(artist);
    if (!track) {
      res.send(404);
      return;
    }

    const trackId = track.track_id;
    const textLyrics = await lyrics.getLyricsByTrackId(trackId);

    const info = {
      title: track.track_name,
      artist: track.artist_name,
      album: track.album_name,
      link: track.track_share_url,
      lyrics: textLyrics.replace(
        '******* This Lyrics is NOT for Commercial use *******',
        '',
      ),
    };

    if (process.env.NODE_ENV === 'production') {
      await slackMessage.sendSlackMessage({ trackInfo: info, response_url });
      res.send(201);
      return;
    }

    res.send(info);
    res.send(200);
  } catch (e) {
    console.log(e);
    res.status(500);
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
