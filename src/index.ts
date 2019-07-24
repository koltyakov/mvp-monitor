import { fetchAllMvps } from './api';
import { flattify } from './map';
import { dumpOnDisk } from './utils';

fetchAllMvps([], 1, (p) => console.log(`Fetching page: ${p}`))
  .then(dumpOnDisk)
  .then(flattify)
  .then(dumpOnDisk)
  .catch((error) => console.error(error));
