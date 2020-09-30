const TikTokScraper = require('tiktok-scraper');

(async () => {
  try {
    const posts = await TikTokScraper.user('funnyhoodvidztiktok', { number: 10 })
    console.log(posts)
  } catch (error) {
    console.log(error)
  }
})();