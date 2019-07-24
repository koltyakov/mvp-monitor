import fetch from 'node-fetch';
import { load } from 'cheerio';

import { handleResponse } from './utils';
import { MVP } from './interface';

const portalUrl = 'https://mvp.microsoft.com';

export const fetchMVPsPage = (page: number = 1): Promise<{ data: MVP[], hasNext: boolean; }> => {
  const url = `${portalUrl}/en-us/MvpSearch?&kw=&ps=48&pn=${page}`;
  return fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'text/html',
      'Content-Type': 'text/html',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.142 Safari/537.36'
    }
  })
    .then((r) => handleResponse(r))
    .then((r) => r.text())
    .then((html) => {
      const $ = load(html);
      const data: MVP[] = $('.profileListItem').toArray().map((node) => {
        return {
          id: $(node).find('.profileListItemFullName > span > a').attr('href').split('-').slice(-1)[0],
          name: $(node).find('.profileListItemFullName > span > a').text(),
          categories: $(node).find('.profileListItemCompetency > .subItemContent').text().trim().split(', '),
          country: $(node).find('.profileListItemLocation > .subItemContent').text().trim()
        };
      });
      const hasNext = $('.pager_items > a:last-child').find('img').length !== 0;
      return { data, hasNext };
    });
};

export const fetchAllMvps = async (
  data: MVP[] = [],
  page: number = 1,
  progress?: (page: number) => void
): Promise<MVP[]> => {
  if (progress) {
    progress(page);
  }
  const { data: mvps, hasNext } = await fetchMVPsPage(page);
  data = data.concat(mvps);
  if (hasNext) {
    return fetchAllMvps(data, page + 1, progress);
  }
  return data;
};
