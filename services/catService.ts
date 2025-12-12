import { apiClient, handleApiError } from '@/lib/api';
import { SpyCat, CreateSpyCatDto, UpdateSpyCatDto } from '@/types';

export const catService = {
  async getAll(): Promise<SpyCat[]> {
    try {
      const response = await apiClient.get<SpyCat[]>('/cats');
      const data = response.data;
      if (Array.isArray(data)) {
        return data;
      }
      if (data && typeof data === 'object' && 'data' in data && Array.isArray(data.data)) {
        return data.data;
      }
      if (data && typeof data === 'object' && 'cats' in data && Array.isArray(data.cats)) {
        return data.cats;
      }
      return [];
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async getById(id: number): Promise<SpyCat> {
    try {
      const response = await apiClient.get<SpyCat>(`/cats/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async create(data: CreateSpyCatDto): Promise<SpyCat> {
    try {
      const response = await apiClient.post<SpyCat>('/cats', data);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async update(id: number, data: UpdateSpyCatDto): Promise<SpyCat> {
    try {
      const response = await apiClient.patch<SpyCat>(`/cats/${id}`, data);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await apiClient.delete(`/cats/${id}`);
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

