import React from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default function withStyle(Component, styles) {
  function newComp(props) {
    // console.log('123', props.staticContext);
    // console.log('456', styles, styles._getCss());
    if (props.staticContext) {
      props.staticContext.css.push(styles._getCss());
    }
    return <Component {...props} />;
  }
  hoistNonReactStatic(newComp, Component);
  return newComp;
}
