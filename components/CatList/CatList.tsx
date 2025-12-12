'use client';

import { SpyCat } from '@/types';
import { CatCard } from '../CatCard';

interface CatListProps {
  cats: SpyCat[];
  onEdit: (id: number, salary: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isLoading?: boolean;
}

export const CatList = ({ cats, onEdit, onDelete, isLoading }: CatListProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="text-gray-600">Loading cats...</div>
      </div>
    );
  }

  const catsArray = Array.isArray(cats) ? cats : [];

  if (catsArray.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No cats added yet</p>
        <p className="text-gray-500 text-sm mt-2">Add your first cat using the form above</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {catsArray.map((cat) => (
        <CatCard key={cat.id} cat={cat} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  );
};

