import React, { useEffect } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchGreeMsg } from '../store/header';

function Header(props) {
  useEffect(() => {
    if (!props.msg) {
      props.fetchGreeMsg();
    }
  }, []);
  return (
    <nav>
      <Helmet>
        <title>Welcome</title>
      </Helmet>
      <div>
        <Link to='/'>Home</Link>
      </div>
      <div>
        <Link to='/about'>About</Link>
      </div>
      <div>
        <Link to='/user'>User</Link>
      </div>
      <div>
        <Link to='/login'>Login</Link>
      </div>
      <div>
        <Link to='/sthsth'>404</Link>
      </div>
      <h3>{props.msg}</h3>
      <hr />
    </nav>
  );
}

Header.loadData = (store) => store.dispatch(fetchGreeMsg());

export default connect((state) => ({ msg: state.header.msg }), { fetchGreeMsg })(Header);
