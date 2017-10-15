const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: true
  })
  const page = await browser.newPage()

  page.setViewport({
    width: 1920,
    height: 1080
  })
  
  // Close Browser
  browser.close()
})()
