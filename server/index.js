import path from 'path';
import fs from 'fs';
import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route, Switch, matchPath } from 'react-router-dom';
import { Provider } from 'react-redux';
// import StyleContext from 'isomorphic-style-loader/StyleContext';
import Helmet from 'react-helmet';
import config from './config';
import routes from '../src/App';
import Header from '../src/component/Header';
import { getServerStore } from '../src/store';

const app = express();
const store = getServerStore();

app.use(express.static('public'));
app.use('/api', createProxyMiddleware({ target: 'http://localhost:9003', changeOrigin: true }));

const getLoadDataPromise = (loader) => {
  return new Promise((resolve) => {
    return loader(store).then(resolve).catch(resolve);
  });
};

app.get('*', (req, res) => {
  if (config.csr || req.query._mode === 'csr') {
    const file = path.resolve(process.cwd(), 'public', 'index.spa.html');
    const html = fs.readFileSync(file, 'utf-8');
    res.send(html);
    return;
  }
  const promises = [getLoadDataPromise(Header.loadData)];
  routes.some((route) => {
    const match = matchPath(req.path, route);
    if (match && route.component.loadData) {
      promises.push(getLoadDataPromise(route.component.loadData));
    }
    return match;
  });

  Promise.all(promises)
    .then(() => {
      const context = { css: [] };
      // const css = new Set(); // CSS for all rendered React components
      // const insertCss = (...styles) => styles.forEach((style) => css.add(style._getCss()));
      // 静态渲染
      const content = renderToString(
        // <StyleContext.Provider value={{ insertCss }}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Header />
            <Switch>
              {routes.map((route) => (
                <Route {...route} />
              ))}
            </Switch>
          </StaticRouter>
        </Provider>
        // </StyleContext.Provider>
      );
      // 处理context
      const css = context.css.length ? context.css.join('\n') : '';
      if (context.action === 'REPLACE') {
        res.status('301');
      }
      if (context.status) {
        res.status(context.status);
      }

      // helmet
      const helmet = Helmet.renderStatic();

      res.send(`
      <html>
        <head>
          <meta charset="utf-8"/>
          ${helmet.meta.toString()}
          ${helmet.title.toString()}
          <style>${css}</style>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>window.__data__ = ${JSON.stringify(store.getState())}</script>
          <script src="/bundle.js"></script>
        </body>
      </html>
    `);
    })
    .catch((e) => {
      console.log('=========> from proxy/ssr server: ', e.message);
      res.send('500');
    });
});

app.listen(9001, () => {
  console.log('ssr/proxy server running on port 9001');
});
