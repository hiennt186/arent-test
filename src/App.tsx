import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import TopPage from './pages/TopPage';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// Import your page components (create these files)
const Record = () => (
  <h1 className="text-2xl font-bold mb-4">My Record</h1>
);

const Challenge = () => (
  <h1 className="text-2xl font-bold mb-4">Challenge</h1>
);

const Notification = () => (
  <h1 className="text-2xl font-bold mb-4">Notifications</h1>
);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router basename={process.env.PUBLIC_URL}>
        <Layout>
          <Routes>
            <Route path="/" element={<TopPage />} />
            <Route path="/record" element={<Record />} />
            <Route path="/challenge" element={<Challenge />} />
            <Route path="/notification" element={<Notification />} />
          </Routes>
        </Layout>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
