const axios = require('axios');

const getSlackMessage = ({ lyrics, artist, title, album, link }) => ({
  blocks: [
    {
      type: 'divider',
    },
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: `*<${link}|${title}>*\n${artist} ${album}\n\n${lyrics}`,
      },
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
