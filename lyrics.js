const api = require('./api');

const getLyricsByTrackId = async trackId => {
  const lyricsResponse = await api.lyricsGet({ trackId });
  return lyricsResponse.data.message.body.lyrics.lyrics_body;
};

module.exports = {
  getLyricsByTrackId,
};
