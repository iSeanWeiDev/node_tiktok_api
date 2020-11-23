const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const TikTokScraper = require('./build');

const app = express()
const port = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/api/medias', async (req, res) => {
  const userName = req.query.user_name;
  if (!!userName) {
    try {
      const posts = await TikTokScraper.user(userName, { number: 10 })
      return res.status(200).json({
        message: `Successfully fetched user's media`,
        data: posts
      });
    } catch (error) {
      return res.status(400).json({
        message: `There no user such as ${userName} to fetch the medias`,
        data: error
      });
    }
  }

  return res.status(404).json({
    message: `Non available parameters`,
  })
});

const httpServer = http.createServer(app);
httpServer.listen(port, () => {
  console.log(`HTTP server is listening on port: ${port}`);
})
