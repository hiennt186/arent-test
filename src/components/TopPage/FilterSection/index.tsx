import React from 'react';

interface FilterSectionProps {
  selectedType: string | null;
  onTypeSelect: (type: string | null) => void;
}

const FilterSection: React.FC<FilterSectionProps> = ({ selectedType, onTypeSelect }) => {
  return (
    <section className="mx-auto mt-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-16 place-items-center">
        {[
          { text: 'Morning', icon: 'icon_knife.png' },
          { text: 'Lunch', icon: 'icon_knife.png' },
          { text: 'Dinner', icon: 'icon_knife.png' },
          { text: 'Snack', icon: 'icon_cup.png' },
        ].map((item, index) => (
          <div key={index} className="w-[136px] h-[136px] flex items-center justify-center">
            <button 
              onClick={() => onTypeSelect(selectedType === item.text ? null : item.text)}
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
  );
};

export default FilterSection;
