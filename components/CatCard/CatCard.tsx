'use client';

import { SpyCat } from '@/types';
import { useState } from 'react';

interface CatCardProps {
  cat: SpyCat;
  onEdit: (id: number, salary: number) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
}

export const CatCard = ({ cat, onEdit, onDelete }: CatCardProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [salary, setSalary] = useState((cat?.salary ?? 0).toString());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = async () => {
    if (isEditing) {
      setIsSubmitting(true);
      try {
        await onEdit(cat?.id ?? 0, parseFloat(salary));
        setIsEditing(false);
      } catch (error) {
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setIsEditing(true);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSalary((cat?.salary ?? 0).toString());
  };

  const handleDelete = async () => {
    if (confirm(`Are you sure you want to delete ${cat?.name ?? 'this cat'}?`)) {
      setIsDeleting(true);
      try {
        await onDelete(cat?.id ?? 0);
      } catch (error) {
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-800">{cat?.name ?? 'Unknown'}</h3>
          <p className="text-sm text-gray-500 mt-1">ID: {cat?.id ?? 'N/A'}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            disabled={isSubmitting || isDeleting}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isEditing ? (isSubmitting ? 'Saving...' : 'Save') : 'Edit'}
          </button>
          {isEditing && (
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            onClick={handleDelete}
            disabled={isDeleting || isEditing}
            className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Breed:</span>
          <span className={`font-semibold ${isEditing ? 'text-gray-400' : 'text-gray-900'}`}>
            {cat?.breed ?? 'N/A'}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Experience:</span>
          <span className={`font-semibold ${isEditing ? 'text-gray-400' : 'text-gray-900'}`}>
            {cat?.years_of_experience ?? 0} years
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Salary:</span>
          {isEditing ? (
            <input
              type="number"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-24 px-2 py-1 border border-gray-300 rounded text-right text-gray-900"
              min="0"
              step="0.01"
              disabled={isSubmitting}
            />
          ) : (
            <span className="font-semibold text-gray-900">
              ${(cat?.salary ?? 0).toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

