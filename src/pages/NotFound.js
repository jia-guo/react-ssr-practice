import React from 'react';
import Status from '../component/Status';

export default function NotFound() {
  return (
    <Status code={404}>
      <h1>404</h1>
    </Status>
  );
}
