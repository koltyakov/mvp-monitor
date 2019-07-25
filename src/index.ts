import { fetchAllMvps } from './api';
import { flattify } from './map';
import { dumpOnDisk } from './utils';
import { dumpToSP } from './sp';

fetchAllMvps([], 1, (p) => console.log(`Fetching page: ${p}`))
  .then(dumpOnDisk)
  .then(flattify)
  .then(dumpOnDisk)
  .then(dumpToSP)
  .catch((error) => console.error(error));
