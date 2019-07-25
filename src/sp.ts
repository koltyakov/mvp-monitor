import { sp, Web } from '@pnp/sp';
import { PnpNode } from 'sp-pnp-node';
import { AuthConfig } from 'node-sp-auth-config';

export const dumpToSP = async <T>(data: T[]): Promise<T[]> => {
  const { siteUrl, authOptions } = await new AuthConfig().getContext();
  const nodeFetch = new PnpNode({ siteUrl, authOptions });
  sp.setup({
    sp: {
      fetchClientFactory: () => nodeFetch
    }
  });
  const fetchDate = new Date();
  const web = new Web(siteUrl);
  const list = web.lists.getByTitle('MVP Stats');
  await list.items.add({
    Title: `MVP Stats fetch on ${fetchDate.toLocaleDateString()}`,
    MvpStats: JSON.stringify(data),
    StatsDate: fetchDate.toISOString()
  });
  return data;
};
