import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMeals } from '../../services/api/meals';
import { getProgress, getBodyWeight } from '../../services/api/charts';
import HeroSection from '../../components/TopPage/HeroSection';
import FilterSection from '../../components/TopPage/FilterSection';
import MealsGrid from '../../components/TopPage/MealsGrid';
import { Meal, MealsResponse } from '../../types/api';
const ITEMS_PER_PAGE = 8;

const TopPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [meals, setMeals] = useState<Meal[]>([]);

  const {
    data,
    isLoading,
    isFetching,
    error: mealsError
  } = useQuery({
    queryKey: ['meals', { page, type: selectedType, sortBy: 'date', order: 'desc' }],
    queryFn: () =>
      getMeals({
        page,
        limit: ITEMS_PER_PAGE,
        type: selectedType,
        sortBy: 'date',
        order: 'desc'
      }),
    placeholderData: (keepPreviousData) => keepPreviousData
  });

  useEffect(() => {
    if (data) {
      setMeals((prevMeals) => [...prevMeals, ...data.meals]);
    }
  }, [data]);

  const {
    data: progressData,
    isLoading: isProgressLoading,
    error: progressError
  } = useQuery({
    queryKey: ['progress'],
    queryFn: getProgress
  });

  const {
    data: bodyWeightData,
    isLoading: isBodyWeightLoading,
    error: bodyWeightError
  } = useQuery({
    queryKey: ['bodyWeight'],
    queryFn: getBodyWeight
  });

  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleTypeSelect = (type: string | null) => {
    setSelectedType(type);
    setPage(1);
    setMeals([]);
  };

  return (
    <div className="flex flex-col items-center">
      <HeroSection
        progressData={progressData}
        bodyWeightData={bodyWeightData}
        isProgressLoading={isProgressLoading}
        isBodyWeightLoading={isBodyWeightLoading}
        progressError={progressError}
        bodyWeightError={bodyWeightError}
      />

      <FilterSection selectedType={selectedType} onTypeSelect={handleTypeSelect} />

      <MealsGrid
        data={{ ...data, meals } as MealsResponse}
        error={mealsError}
        isLoading={isLoading}
        isFetching={isFetching}
        hasMore={data?.hasMore ?? false}
        onLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default TopPage;
