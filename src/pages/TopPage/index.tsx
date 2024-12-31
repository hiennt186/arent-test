import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import CustomLineChart from './LineChart';
import CircleProgress from './CircleProgress';
import { getMeals, MealsResponse } from '../../services/api/meals';
import { getProgress, getBodyWeight } from '../../services/api/charts';

const ITEMS_PER_PAGE = 8;

const TopPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['meals', { page, type: selectedType, sortBy: 'date', order: 'desc' }],
    queryFn: () => getMeals({ 
      page, 
      limit: ITEMS_PER_PAGE, 
      type: selectedType,
      sortBy: 'date',
      order: 'desc'
    }),
    placeholderData: keepPreviousData => keepPreviousData,
    select: (newData: MealsResponse): MealsResponse => {
      if (page === 1) return newData;
      
      return {
        ...newData,
        meals: [...(data?.meals || []), ...newData.meals]
      };
    }
  });

  const { data: progressData, isLoading: isProgressLoading } = useQuery({
    queryKey: ['progress'],
    queryFn: getProgress
  });

  const { data: bodyWeightData, isLoading: isBodyWeightLoading } = useQuery({
    queryKey: ['bodyWeight'],
    queryFn: getBodyWeight
  });

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center">
      <section className="w-full bg-dark-600 text-white">
        <div className="mx-auto w-full flex">
          <div className="w-[540px] relative">
            <img 
              src={`${process.env.PUBLIC_URL}/assets/d01.jpg`}
              alt="Main"
              className="w-full h-[312px] object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              {!isProgressLoading && (
                <CircleProgress 
                  percentage={progressData?.data.percentage ?? 0} 
                  date={progressData?.data.date ?? ''} 
                />
              )}
            </div>
          </div>
          <div className="flex-1 px-16">
            <div className="h-full flex items-center justify-center">
              <div className="w-full">
                {!isBodyWeightLoading && bodyWeightData?.data && bodyWeightData.data.length > 0 && (
                  <CustomLineChart data={bodyWeightData.data}/>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6">
        <div className="grid grid-cols-4 gap-16 place-items-center w-auto mx-auto">
          {[
            { text: 'Morning', icon: 'icon_knife.png' },
            { text: 'Lunch', icon: 'icon_knife.png' },
            { text: 'Dinner', icon: 'icon_knife.png' },
            { text: 'Snack', icon: 'icon_cup.png' },
          ].map((item, index) => (
            <div key={index} className="w-[136px] h-[136px] flex items-center justify-center">
              <button 
                onClick={() => setSelectedType(selectedType === item.text ? null : item.text)}
                className={`relative w-[116px] h-[134px] flex items-center justify-center ${
                  selectedType === item.text ? 'opacity-80' : ''
                } bg-primary-gradient text-white font-normal transition-opacity duration-200 ease-in-out hover:opacity-80 [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] p-2`}
              >
                <div className="flex flex-col items-center justify-center w-full">
                  <img 
                    src={`${process.env.PUBLIC_URL}/icons/${item.icon}`}
                    alt=""
                    className="w-[56px] h-[56px] object-contain"
                  />
                  <span className="font-['Inter'] text-[20px] leading-[24px] font-normal">
                    {item.text}
                  </span>
                </div>
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="w-[960px] mt-6">
        <div className="grid grid-cols-4 gap-2">
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
      </section>

      <div className="mt-8 mb-16">
        {data?.hasMore && (
          <button 
            onClick={handleLoadMore}
            disabled={isLoading || isFetching}
            className="h-[56px] bg-primary-gradient text-white px-16 rounded hover:opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-['Hiragino_Kaku_Gothic_Pro'] text-[18px] leading-[26px] font-light">
              {(isLoading || isFetching) ? '読み込み中...' : '記録をもっと見る'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TopPage;
