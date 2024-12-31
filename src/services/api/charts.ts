interface BodyWeight {
  month: string;
  value1: number;
  value2: number;
}

interface Progress {
  id: number;
  date: string;
  percentage: number;
}

interface ProgressResponse {
  data: Progress;
}

interface BodyWeightResponse {
  data: BodyWeight[];
}

export const getProgress = async (): Promise<ProgressResponse> => {
  const response = await fetch('http://localhost:3001/progress');
  const data = await response.json();
  return { data: data[0] }; // Return first item since we only need latest
};

export const getBodyWeight = async (): Promise<BodyWeightResponse> => {
  const response = await fetch('http://localhost:3001/bodyWeight');
  const data = await response.json();
  return { data };
}; 