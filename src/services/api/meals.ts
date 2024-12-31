import api from './axiosInstance';
import { MealsResponse, JsonServerResponse, GetMealsParams } from '../../types/api';

export const getMeals = async ({
  page = 1,
  limit = 8,
  type,
  sortBy = 'date',
  order = 'desc'
}: GetMealsParams = {}): Promise<MealsResponse> => {
  let url = `/meals?_page=${page}&_per_page=${limit}&_sort=${sortBy}&_order=${order}`;

  if (type) {
    url += `&type=${type}`;
  }

  const { data: jsonResponse } = await api.get<JsonServerResponse>(url);

  return {
    meals: jsonResponse.data,
    totalCount: jsonResponse.items,
    hasMore: jsonResponse.next !== null
  };
};
