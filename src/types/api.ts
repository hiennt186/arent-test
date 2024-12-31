export interface BodyWeight {
  month: string;
  value1: number;
  value2: number;
}

export interface Progress {
  id: number;
  date: string;
  percentage: number;
}

export interface ProgressResponse {
  data: Progress;
}

export interface BodyWeightResponse {
  data: BodyWeight[];
}

export interface Meal {
  id: number;
  type: string;
  date: string;
  image: string;
}

export interface MealsResponse {
  meals: Meal[];
  totalCount: number;
  hasMore: boolean;
}

export interface JsonServerResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Meal[];
}

export interface GetMealsParams {
  page?: number;
  limit?: number;
  type?: string | null;
  sortBy?: string;
  order?: 'asc' | 'desc';
}
