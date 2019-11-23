const axios = require('axios');

const API_KEY = 'd88b3d451f30f783ec837f2098553c9a';
const API_BASE_URI = 'https://api.musixmatch.com/ws/1.1';

const baseParams = {
  apikey: API_KEY,
  format: 'json',
};

const client = axios.create({ baseURL: API_BASE_URI });

const trackSearch = ({ artist }) =>
  client.get('track.search', {
    params: {
      ...baseParams,
      q_artist: artist,
      f_has_lyrics: 1,
      s_track_rating: 'desc',
      page_size: 100,
    },
  });

const lyricsGet = ({ trackId }) =>
  client.get('track.lyrics.get', { params: { ...baseParams, track_id: trackId } });
module.exports = {
  trackSearch,
  lyricsGet,
};
