export interface MVP {
  id: string;
  name?: string;
  categories: string[];
  country: string;
}

export interface PivotItem {
  category: string;
  country: string;
  amount: number;
}
