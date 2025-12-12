import { useState, useEffect, useCallback, useRef } from 'react';
import { SpyCat, CreateSpyCatDto, UpdateSpyCatDto } from '@/types';
import { catService } from '@/services/catService';

export const useCats = () => {
  const [cats, setCats] = useState<SpyCat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const hasFetchedRef = useRef(false);

  const fetchCats = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await catService.getAll();
      setCats(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error loading cats');
      setCats([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasFetchedRef.current) {
      hasFetchedRef.current = true;
      fetchCats();
    }
  }, [fetchCats]);

  const createCat = useCallback(async (data: CreateSpyCatDto) => {
    try {
      setError(null);
      const newCat = await catService.create(data);
      await fetchCats();
      return newCat;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error creating cat';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [fetchCats]);

  const updateCat = useCallback(async (id: number, data: UpdateSpyCatDto) => {
    try {
      setError(null);
      const updatedCat = await catService.update(id, data);
      await fetchCats();
      return updatedCat;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error updating cat';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, [fetchCats]);

  const deleteCat = useCallback(async (id: number) => {
    try {
      setError(null);
      await catService.delete(id);
      setCats((prev) => prev.filter((cat) => cat.id !== id));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error deleting cat';
      setError(errorMessage);
      throw new Error(errorMessage);
    }
  }, []);

  return {
    cats,
    loading,
    error,
    fetchCats,
    createCat,
    updateCat,
    deleteCat,
  };
};

