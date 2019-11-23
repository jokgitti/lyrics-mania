const express = require('express');
const bodyParser = require('body-parser');
const slack = require('./slack');
const tracks = require('./tracks');
const lyrics = require('./lyrics');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/artist', async (req, res) => {
  try {
    const { text: artist, response_url } = req.body;
    if (!artist) {
      res.send(400);
      return;
    }

    const track = await tracks.getRandomTrackByArtist(artist);
    if (!track) {
      // cannot use 404, slack would only display an error message
      res.status(200);
      res.send("🤷🏻‍♂️ that artist doesn't exists.");
      return;
    }

    if (process.env.NODE_ENV === 'production') {
      // slack POST ack msg
      // https://api.slack.com/interactivity/handling#acknowledgment_response
      res.status(200);
      res.send('🎧 picking lyrics...');
    }

    const trackId = track.track_id;
    const textLyrics = await lyrics.getLyricsByTrackId(trackId);

    const info = {
      title: track.track_name,
      artist: track.artist_name,
      album: track.album_name,
      link: track.track_share_url,
      lyrics: textLyrics,
    };

    if (process.env.NODE_ENV === 'production') {
      await slack.sendSlackMessage({ trackInfo: info, response_url });
      res.send(201);
      return;
    }

    res.status(200);
    res.send(info);
  } catch (e) {
    console.log(e);
    res.status(500);
    res.send('🚨 something went wrong!');
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
