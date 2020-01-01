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
        let titles = '';

        // uber
        if (link.includes('uber')) {
          const grabTitles = document.querySelectorAll('#clamped-content-menu_item_title');
          titles = Array.from(grabTitles).map(m => {
            const price = m.parentNode.parentNode.parentNode.childNodes[1].firstChild.innerText;

            return `${m.innerText} ${price}`;
          });
        }

        // deliveroo
        if (link.includes('deliveroo')) {
          const grabTitles = document.querySelectorAll('.menu-index-page__item-title');
          titles = Array.from(grabTitles).map(m => {
            const price = m.nextElementSibling.nextElementSibling.innerText;

            return `${m.innerText} ${price}`;
          });
        }

        return titles;
      });

      browser.close();
      return resolve(getItems);
    } catch (e) {
      return reject(e);
    }
  });
};
