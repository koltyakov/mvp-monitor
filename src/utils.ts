import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'node-fetch';

export const handleResponse = (response: Response): Response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const dumpOnDisk = <T>(data: T[]): T[] => {
  const folder = path.join(process.cwd(), './data');
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }
  const filePath = path.join(folder, `${new Date().toISOString().replace(/:/g, '-')}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { encoding: 'UTF8' });
  return data;
};
