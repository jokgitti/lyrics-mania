const api = require('./api');

const cleanUpLyrics = (lyrics = '') => {
  const split = lyrics.split('\n');
  return split.slice(0, split.length - 3).join('\n');
};

const getLyricsByTrackId = async trackId => {
  const lyricsResponse = await api.lyricsGet({ trackId });
  return cleanUpLyrics(lyricsResponse.data.message.body.lyrics.lyrics_body);
};

module.exports = {
  getLyricsByTrackId,
};
