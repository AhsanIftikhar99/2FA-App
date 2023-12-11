import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage';
import AddCodePage from './AddCodePage';

const App = () => {
  const storedCodes = localStorage.getItem('codes');
  const initialCodes = storedCodes ? JSON.parse(storedCodes) : [];
  const [codes, setCodes] = React.useState(initialCodes);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage codes={codes} setCodes={setCodes} />} />
        <Route path="/add-code" element={<AddCodePage setCodes={setCodes} />} />
      </Routes>
    </Router>
  );
};

export default App;
