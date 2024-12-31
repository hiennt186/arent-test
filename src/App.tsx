import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import TopPage from './pages/TopPage';

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

function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <Layout>
        <Routes>
          <Route path="/" element={<TopPage />} />
          <Route path="/record" element={<Record />} />
          <Route path="/challenge" element={<Challenge />} />
          <Route path="/notification" element={<Notification />} />
          {/* Add more routes based on your header menu items */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
