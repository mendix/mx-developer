import 'es6-promise';

import {CrossStorageHub} from 'chase-storage';

CrossStorageHub.init([
  {
    origin: /.*localhost:300\d$/,
    allow: ['get', 'set', 'del']
  },
  {
    origin: /:\/\/(www\.)?mendix.com$/,
    allow: ['get', 'set', 'del']
  },
  {
    origin: /:\/\/(www\.)?mendixcloud.com$/,
    allow: ['get', 'set', 'del']
  }
]);
