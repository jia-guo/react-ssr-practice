const express = require('express');
const puppeteer = require('puppeteer');
const app = express();

// async function test(){
//   console.log('截图')
//   const browser = await puppeteer.launch()
//   const page = await browser.newPage()
//   await page.goto('https://kaikeba.com/')
//   await page.screenshot({path:'kaikeba.png'})
//   await browser.close()
// }
// test()

// 写到文件系统里
const urlCache = {};

app.get('*', async function (req, res) {
  // 对seo无影响
  if (req.url == '/favicon.ico') {
    return res.send({ code: 0 });
  }

  // 遍历所有的路由，都写成html文件，或者都缓存上
  // 1. 加缓存
  // 2. lru缓存算法
  const url = 'http://localhost:9001' + req.url;
  if (urlCache[url]) {
    console.log(urlCache[url]);
    return res.send(urlCache[url]);
  }
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: ['networkidle0']
  });

  const html = await page.content();

  urlCache[url] = html;
  console.log('p222', Object.keys(urlCache));

  res.send(html);
});

app.listen(9002, () => {
  console.log('puppeteer ssr server start');
});
