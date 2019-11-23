const axios = require('axios');

const getSlackMessage = ({ lyrics, artist, title, album, link }) => ({
  response_type: 'in_channel',
  blocks: [
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `🎤 *<${link}|${title}>*\n*${artist}*, ${album}`,
      },
    },
    {
      type: 'context',
      elements: [
        {
          type: 'mrkdwn',
          text: `${lyrics}`,
        },
      ],
    },
    {
      type: 'divider',
    },
  ],
});

const sendSlackMessage = ({ trackInfo, response_url }) => {
  axios.post(response_url, getSlackMessage(trackInfo));
};

module.exports = {
  sendSlackMessage,
};
