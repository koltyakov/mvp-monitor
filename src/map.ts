import { MVP, PivotItem } from './interface';

export const flattify = (mvps: MVP[]): PivotItem[] => {
  return mvps.reduce((pi: PivotItem[], mvp) => {
    const { categories, country } = mvp;
    categories.forEach((category) => {
      const item = pi.find((p) => p.category === category && p.country === country);
      if (item) {
        item.amount += 1;
      } else {
        pi.push({ country, category, amount: 1 });
      }
    });
    return pi;
  }, []);
};
