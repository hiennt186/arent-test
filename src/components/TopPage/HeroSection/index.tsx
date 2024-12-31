import React from 'react';
import CircleProgress from '../CircleProgress';
import CustomLineChart from '../LineChart';
import ErrorMessage from '../../ErrorMessage';
import { BodyWeightResponse, ProgressResponse } from '../../../types/api';

interface HeroSectionProps {
  progressData: ProgressResponse | undefined;
  bodyWeightData: BodyWeightResponse | undefined;
  isProgressLoading: boolean;
  isBodyWeightLoading: boolean;
  progressError: Error | null;
  bodyWeightError: Error | null;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  progressData,
  bodyWeightData,
  isProgressLoading,
  isBodyWeightLoading,
  progressError,
  bodyWeightError
}) => {
  if (progressError || bodyWeightError) {
    return (
      <div className="flex flex-col items-center p-8 gap-4">
        {progressError && (
          <ErrorMessage message="Failed to load progress data. Please try again later." />
        )}
        {bodyWeightError && (
          <ErrorMessage message="Failed to load body weight data. Please try again later." />
        )}
      </div>
    );
  }

  return (
    <section className="w-full bg-dark-600 text-white">
      <div className="mx-auto w-full flex flex-col lg:flex-row">
        <div className="w-full lg:w-[42%] relative">
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
        <div className="flex-1 px-4 md:px-16">
          <div className="h-full flex items-center justify-center">
            <div className="w-full">
              {!isBodyWeightLoading && bodyWeightData?.data && bodyWeightData.data.length > 0 && (
                <CustomLineChart data={bodyWeightData.data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
