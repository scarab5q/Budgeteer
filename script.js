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

  // Navigate to Our Code World
  await page.goto('https://nomadlist.com/')

    var cities = await page.evaluate(() => {
        return Array.from(document.getElementsByClass("grid show view"));
    });

  console.log(cityPrices)
  // Close Browser
  browser.close()
})()
