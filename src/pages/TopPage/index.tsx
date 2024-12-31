import React, { useState } from 'react';
import CustomLineChart from './LineChart';
import CircleProgress from './CircleProgress';

const ITEMS_PER_PAGE = 8;

const MEAL_DATA = [
  { id: 1, type: 'Morning', date: '05.21', image: 'm01.jpg' },
  { id: 2, type: 'Lunch', date: '05.21', image: 'l03.jpg' },
  { id: 3, type: 'Dinner', date: '05.21', image: 'd01.jpg' },
  { id: 4, type: 'Snack', date: '05.21', image: 'l01.jpg' },
  { id: 5, type: 'Morning', date: '05.20', image: 'm01.jpg' },
  { id: 6, type: 'Lunch', date: '05.20', image: 'l02.jpg' },
  { id: 7, type: 'Dinner', date: '05.20', image: 'd02.jpg' },
  { id: 8, type: 'Snack', date: '05.20', image: 's01.jpg' },
  { id: 9, type: 'Morning', date: '05.19', image: 'm01.jpg' },
  { id: 10, type: 'Lunch', date: '05.19', image: 'l03.jpg' },
  { id: 11, type: 'Dinner', date: '05.19', image: 'd01.jpg' },
  { id: 12, type: 'Snack', date: '05.19', image: 'l01.jpg' },
];

const TopPage: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);

  const filteredMeals = selectedType 
    ? MEAL_DATA.filter(meal => meal.type === selectedType)
    : MEAL_DATA;

  const visibleMeals = filteredMeals.slice(0, visibleItems);
  const hasMore = visibleItems < filteredMeals.length;

  const handleLoadMore = async () => {
    setIsLoading(true);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setVisibleItems(prev => prev + ITEMS_PER_PAGE);
    setIsLoading(false);
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
              <CircleProgress percentage={75} date="05/21" />
            </div>
          </div>
          <div className="flex-1 px-16">
            <div className="h-full flex items-center justify-center">
              <div className="w-full">
                <CustomLineChart />
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
          {visibleMeals.map((meal) => (
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
        {hasMore && (
          <button 
            onClick={handleLoadMore}
            disabled={isLoading}
            className="h-[56px] bg-primary-gradient text-white px-16 rounded hover:opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className="font-['Hiragino_Kaku_Gothic_Pro'] text-[18px] leading-[26px] font-light">
              {isLoading ? '読み込み中...' : '記録をもっと見る'}
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default TopPage;
