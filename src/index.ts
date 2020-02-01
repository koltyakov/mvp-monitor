import { fetchAllMvps } from './api';
import { trimNames } from './map';
import { dumpOnDisk, dumpToSP } from './utils';

fetchAllMvps([], 1, (p) => console.log(`Fetching page: ${p}`), 0)
  .then(dumpOnDisk)
  .then(trimNames)
  .then(dumpToSP)
  .catch((error) => console.error(error));
