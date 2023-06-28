import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
// import rtl from 'stylis-plugin-rtl';
// NB: A unique `key` is important for it to work!
const options = {
  // rtl: { key: 'css-ar', stylisPlugins: [rtl] },
  rtl: { key: 'css-ar' },
  ltr: { key: 'css-en' },
};

import React from 'react';

const RTLProvider = ({ children }: any) => {
  const dir = document.documentElement.dir == 'ar' ? 'rtl' : 'ltr';
  const cache = createCache(options[dir]);
  return <CacheProvider value={cache}>{children} </CacheProvider>;
};

export default RTLProvider;
