import React, { useState } from 'react';
import QueryForm from './components/QueryForm';
import ResultDisplay from './components/ResultDisplay';
import { ApiResponse } from './types';

const App: React.FC = () => {
  const [results, setResults] = useState<ApiResponse | null>(null);

  const handleResults = (data: ApiResponse) => {
    setResults(data);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <QueryForm onResults={handleResults} />
      <ResultDisplay results={results} />
    </div>
  );
};

export default App;