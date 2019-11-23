const api = require('./api');

const getTracksByArtist = async artist => {
  const tracksResponse = await api.trackSearch({ artist });
  const tracks = tracksResponse.data.message.body.track_list.map(track => track.track);

  return tracks.filter(track => track.has_lyrics);
};

const getRandomTrack = tracks => {
  const getRandomTrackId = tracksNumber => Math.floor(Math.random() * tracksNumber);

  const randomTrackIndex = getRandomTrackId(tracks.length);
  return tracks[randomTrackIndex];
};

const getRandomTrackByArtist = async artist => {
  const tracks = await getTracksByArtist(artist);
  return getRandomTrack(tracks);
};

module.exports = {
  getRandomTrackByArtist,
};
