import React from 'react';
import { Route } from 'react-router-dom';

export default function Status({ code, children }) {
  return (
    <Route
      render={({ staticContext }) => {
        if (staticContext) {
          staticContext.status = code;
        }
        return children;
      }}
    />
  );
}
