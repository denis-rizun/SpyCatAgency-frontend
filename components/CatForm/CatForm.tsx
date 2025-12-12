'use client';

import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { CreateSpyCatDto } from '@/types';
import { breedService } from '@/services/breedService';

interface CatFormProps {
  onSubmit: (data: CreateSpyCatDto) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

export const CatForm = ({ onSubmit, isLoading = false, error: externalError }: CatFormProps) => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [isLoadingBreeds, setIsLoadingBreeds] = useState(false);
  const hasLoadedBreedsRef = useRef(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateSpyCatDto>();

  useEffect(() => {
    if (!hasLoadedBreedsRef.current) {
      hasLoadedBreedsRef.current = true;
      const loadBreeds = async () => {
        setIsLoadingBreeds(true);
        try {
          const breedList = await breedService.getAllBreeds();
          setBreeds(breedList);
        } catch (err) {
          console.error('Error loading breeds:', err);
        } finally {
          setIsLoadingBreeds(false);
        }
      };
      loadBreeds();
    }
  }, []);

  const onSubmitForm = async (data: CreateSpyCatDto) => {
    try {
      await onSubmit(data);
      reset();
    } catch (err) {
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Spy Cat</h2>

      {externalError && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {externalError}
        </div>
      )}

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name *
          </label>
          <input
            id="name"
            type="text"
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters',
              },
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="Enter cat name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="years_of_experience"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Years of Experience *
          </label>
          <input
            id="years_of_experience"
            type="number"
            {...register('years_of_experience', {
              required: 'Years of experience is required',
              min: {
                value: 0,
                message: 'Years of experience cannot be negative',
              },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="Enter years of experience"
            min="0"
          />
          {errors.years_of_experience && (
            <p className="mt-1 text-sm text-red-600">{errors.years_of_experience.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="breed" className="block text-sm font-medium text-gray-700 mb-1">
            Breed *
          </label>
          {isLoadingBreeds ? (
            <input
              type="text"
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              placeholder="Loading breeds..."
            />
          ) : breeds.length > 0 ? (
            <select
              id="breed"
              {...register('breed', {
                required: 'Breed is required',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            >
              <option value="">Select a breed</option>
              {breeds.map((breed) => (
                <option key={breed} value={breed}>
                  {breed}
                </option>
              ))}
            </select>
          ) : (
            <input
              id="breed"
              type="text"
              {...register('breed', {
                required: 'Breed is required',
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              placeholder="Enter breed (will be validated on backend)"
            />
          )}
          {errors.breed && (
            <p className="mt-1 text-sm text-red-600">{errors.breed.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
            Salary *
          </label>
          <input
            id="salary"
            type="number"
            step="0.01"
            {...register('salary', {
              required: 'Salary is required',
              min: {
                value: 0,
                message: 'Salary cannot be negative',
              },
              valueAsNumber: true,
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
            placeholder="Enter salary"
            min="0"
          />
          {errors.salary && (
            <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Adding...' : 'Add Cat'}
        </button>
      </div>
    </form>
  );
};

