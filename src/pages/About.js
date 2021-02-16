import React, { useEffect } from 'react';
import { connect } from 'react-redux';
// import withStyles from 'isomorphic-style-loader/withStyles';
import { fetchAboutList } from '../store/about';
import withStyles from '../component/withStyle';
import styles from './About.css';

function About(props) {
  useEffect(() => {
    if (!props.list.length) {
      props.fetchAboutList();
    }
  }, []);
  // console.log(styles);
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About page</h1>
      <ul>
        {props.list.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

About.loadData = (store) => store.dispatch(fetchAboutList());

export default connect((state) => ({ list: state.about.list }), { fetchAboutList })(
  withStyles(About, styles)
);
