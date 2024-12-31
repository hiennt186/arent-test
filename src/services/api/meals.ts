import api from './axiosInstance';
import { MealsResponse, Meal, GetMealsParams } from '../../types/api';

export const getMeals = async ({
  page = 1,
  limit = 8,
  type,
  sortBy = 'date',
  order = 'desc'
}: GetMealsParams = {}): Promise<MealsResponse> => {
  let url = `/meals?_page=${page}&_limit=${limit}&_sort=${sortBy}&_order=${order}`;

  if (type) {
    url += `&type=${type}`;
  }

  const response = await api.get<Array<Meal>>(url);
  const totalCount = parseInt(response.headers['x-total-count'] || '0', 10);
  const currentPage = page;
  const totalPages = Math.ceil(totalCount / limit);

  return {
    meals: response.data,
    totalCount,
    hasMore: currentPage < totalPages
  };
};
