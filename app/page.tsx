'use client';

import { useCats } from '@/hooks/useCats';
import { CatForm } from '@/components/CatForm';
import { CatList } from '@/components/CatList';
import { CreateSpyCatDto } from '@/types';
import { useState } from 'react';

export default function Home() {
  const { cats, loading, error, createCat, updateCat, deleteCat } = useCats();
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCat = async (data: CreateSpyCatDto) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      await createCat(data);
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Error creating cat');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditCat = async (id: number, salary: number) => {
    try {
      await updateCat(id, { salary });
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteCat = async (id: number) => {
    try {
      await deleteCat(id);
    } catch (err) {
      throw err;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            🐱 Spy Cat Agency
          </h1>
          <p className="text-gray-600">Spy Cat Management System</p>
        </header>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-8">
          <CatForm
            onSubmit={handleCreateCat}
            isLoading={isSubmitting}
            error={formError}
          />
        </div>

        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Spy Cats List ({cats.length})
          </h2>
          <CatList
            cats={cats}
            onEdit={handleEditCat}
            onDelete={handleDeleteCat}
            isLoading={loading}
          />
        </section>
      </div>
    </main>
  );
}

