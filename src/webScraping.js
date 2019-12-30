const puppeteer = require('puppeteer');

module.exports = function menu(link) {
  if (!link) return;
  return new Promise(async (resolve, reject) => {
    try {
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      const [, url] = link.match(/<(https.*)>/);
      await page.goto(url);
      const getItems = await page.evaluate(() => {
        const grabTitles = document.querySelectorAll('#clamped-content-menu_item_title')
        const titles = Array.from(grabTitles).map(m => {
          const price = m.parentNode.parentNode.parentNode.childNodes[1].firstChild.innerText;

          return `${m.innerText} ${price}`;
        });

        console.log('titles', titles);
        return titles;
      });

      browser.close();
      return resolve(getItems);
    } catch (e) {
      return reject(e);
    }
  });
};
