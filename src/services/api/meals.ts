interface Meal {
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

interface JsonServerResponse {
  first: number;
  prev: number | null;
  next: number | null;
  last: number;
  pages: number;
  items: number;
  data: Meal[];
}

interface GetMealsParams {
  page?: number;
  limit?: number;
  type?: string | null;
  sortBy?: string;
  order?: 'asc' | 'desc';
}

export const getMeals = async ({ 
  page = 1, 
  limit = 8, 
  type,
  sortBy = 'date',
  order = 'desc' 
}: GetMealsParams = {}): Promise<MealsResponse> => {
  let url = `http://localhost:3001/meals?_page=${page}&_per_page=${limit}&_sort=${sortBy}&_order=${order}`;
  
  if (type) {
    url += `&type=${type}`;
  }

  const response = await fetch(url);
  const jsonResponse: JsonServerResponse = await response.json();

  return {
    meals: jsonResponse.data,
    totalCount: jsonResponse.items,
    hasMore: jsonResponse.next !== null
  };
};
