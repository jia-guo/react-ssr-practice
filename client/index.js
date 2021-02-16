import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from '../src/App';
import Header from '../src/component/Header';
import { getClientStore } from '../src/store';

// import StyleContext from 'isomorphic-style-loader/StyleContext';

// const insertCss = (...styles) => {
//   const removeCss = styles.map((style) => style._insertCss());
//   return () => removeCss.forEach((dispose) => dispose());
// };

const App = () => (
  <Provider store={getClientStore()}>
    <BrowserRouter>
      <Header />
      <Switch>
        {routes.map((route) => (
          <Route {...route} />
        ))}
      </Switch>
    </BrowserRouter>
  </Provider>
);

if (window.__data__) {
  ReactDOM.hydrate(<App />, document.getElementById('root'));
} else {
  ReactDOM.render(<App />, document.getElementById('root'));
}
