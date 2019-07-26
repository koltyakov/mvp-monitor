import { fetchAllMvps } from './api';
import { trimNames } from './map';
import { dumpOnDisk, dumpToSP } from './utils';

fetchAllMvps([], 1, (p) => console.log(`Fetching page: ${p}`))
  .then(dumpOnDisk)
  .then(trimNames)
  .then(dumpToSP)
  .catch((error) => console.error(error));
