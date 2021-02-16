import React, { useState } from 'react';
import Helmet from 'react-helmet';

export default function Home() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Helmet>
        <title>SSR 首页</title>
        <meta name='keywords' content='Web前端开发，javaEE架构' />
        <meta name='description' content='React ssr很重要' />
      </Helmet>
      <h1>hello! Home Page {count}</h1>
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}
