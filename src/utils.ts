import * as fs from 'fs';
import * as path from 'path';
import { Response } from 'node-fetch';
import { sp, Web } from '@pnp/sp-commonjs';
import { PnpNode } from 'sp-pnp-node';
import { AuthConfig } from 'node-sp-auth-config';
import * as crc from 'crc-32';

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
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), { encoding: 'utf8' });
  return data;
};

export const dumpToSP = async <T>(data: T[]): Promise<T[]> => {
  const { siteUrl, authOptions } = await new AuthConfig().getContext();
  const nodeFetch = new PnpNode({ siteUrl, authOptions });
  sp.setup({
    sp: {
      fetchClientFactory: () => nodeFetch
    }
  });
  const fetchDate = new Date();
  const web = Web(siteUrl);
  const list = web.lists.getByTitle('MVP Stats');
  const items = await list.items.select('Id').filter(`Title eq '${dayFormat(fetchDate)}'`).get();
  const stats = JSON.stringify(data);
  const payload = {
    Title: dayFormat(fetchDate),
    MvpStats: stats,
    StatsCRC: crc.str(stats).toString(16),
    StatsDate: fetchDate.toISOString()
  };
  if (items.length > 0) {
    await list.items.getById(items[0].Id).update(payload);
  } else {
    await list.items.add(payload);
  }
  return data;
};

export const dayFormat = (d: Date = new Date()): string => {
  return `${d.getFullYear()}-${`${d.getMonth() + 1}`.padStart(2, '0')}-${`${d.getDate()}`.padStart(2, '0')}`;
};

export const timeoutPromise = (timeout: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
