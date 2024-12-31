import api from './axiosInstance';
import { ProgressResponse, BodyWeightResponse } from '../../types/api';

export const getProgress = async (): Promise<ProgressResponse> => {
  const { data } = await api.get('/progress');
  return { data: data[0] }; // Return first item since we only need latest
};

export const getBodyWeight = async (): Promise<BodyWeightResponse> => {
  const { data } = await api.get('/bodyWeight');
  return { data };
};
