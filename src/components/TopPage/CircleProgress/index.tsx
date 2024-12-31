import React, { useEffect, useState } from 'react';

interface CircleProgressProps {
  percentage: number;
  date: string;
  size?: number;
  strokeWidth?: number;
}

const CircleProgress: React.FC<CircleProgressProps> = ({
  percentage,
  date,
  size = 180,
  strokeWidth = 4
}) => {
  const [currentPercentage, setCurrentPercentage] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (currentPercentage / 100) * circumference;

  useEffect(() => {
    setCurrentPercentage(0);

    const step = percentage / 10;
    const interval = setInterval(() => {
      setCurrentPercentage((prev) => {
        if (prev >= percentage) {
          clearInterval(interval);
          return percentage;
        }
        return Math.min(prev + step, percentage);
      });
    }, 30);

    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transform -rotate-90"
        style={{ filter: 'drop-shadow(0px 0px 6px #FC7400)' }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="white"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
          style={{
            transition: 'stroke-dashoffset 0.3s ease-out'
          }}
        />
      </svg>
      <div
        className="absolute text-center text-white"
        style={{ textShadow: '0px 0px 6px #FC7400' }}
      >
        <div className="font-['Inter'] text-[18px] leading-[22px] font-normal">
          {date}{' '}
          <span className="text-[25px] leading-[30px] font-normal">
            {currentPercentage.toFixed(0)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default CircleProgress;
