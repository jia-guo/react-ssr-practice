import Home from './pages/Home';
import About from './pages/About';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import './App.css';

const routes = [
  { path: '/', exact: true, key: 'home', component: Home },
  { path: '/about', exact: true, key: 'about', component: About },
  { path: '/user', exact: true, key: 'user', component: User },
  { path: '/login', exact: true, key: 'login', component: Login },
  { component: NotFound, key: 'notfound' }
];

export default routes;
