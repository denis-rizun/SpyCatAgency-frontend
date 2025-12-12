import axios from 'axios';

export interface Breed {
  id: string;
  name: string;
}

const THE_CAT_API_URL = 'https://api.thecatapi.com/v1/breeds';

export const breedService = {
  async validateBreed(breed: string): Promise<boolean> {
    try {
      const response = await axios.get<Breed[]>(THE_CAT_API_URL);
      const breeds = response.data.map((b) => b.name.toLowerCase());
      return breeds.includes(breed.toLowerCase());
    } catch (error) {
      // If API is unavailable, allow any breed (validation will be on backend)
      return true;
    }
  },

  async getAllBreeds(): Promise<string[]> {
    try {
      const response = await axios.get<Breed[]>(THE_CAT_API_URL);
      return response.data.map((b) => b.name);
    } catch (error) {
      return [];
    }
  },
};

