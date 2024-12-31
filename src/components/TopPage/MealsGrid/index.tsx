import React from 'react';
import ErrorMessage from '../../ErrorMessage';
import { MealsResponse } from '../../../types/api';

interface MealsGridProps {
  data: MealsResponse | undefined;
  error: Error | null;
  isLoading: boolean;
  isFetching: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}

const MealsGrid: React.FC<MealsGridProps> = ({
  data,
  error,
  isLoading,
  isFetching,
  hasMore,
  onLoadMore
}) => {
  console.log(error);
  return (
    <>
      <section className="container mx-auto mt-6">
        {error ? (
          <ErrorMessage message="Failed to load meals. Please try again later." />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {data?.meals.map((meal) => (
              <div key={meal.id} className="aspect-square bg-gray-200 relative">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/${meal.image}`}
                  alt={`${meal.type} meal`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 bg-primary-300 text-white w-[120px] h-[32px] flex items-center">
                  <span className="font-['Inter'] text-[15px] leading-[18px] font-normal ml-2">
                    {meal.date}.{meal.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-8 mb-16">
        {hasMore && (
          <button
            onClick={onLoadMore}
            disabled={isLoading || isFetching}
            className="h-[56px] bg-primary-gradient text-white px-16 rounded hover:opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-['Hiragino_Kaku_Gothic_Pro'] text-[18px] leading-[26px] font-light">
              {isLoading || isFetching ? '読み込み中...' : '記録をもっと見る'}
            </span>
          </button>
        )}
      </section>
    </>
  );
};

export default MealsGrid;
