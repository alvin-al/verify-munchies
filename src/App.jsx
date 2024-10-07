// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VerifyCode from './components/VerifyCode'; 
import VerifyPage from './verify/[code]/page';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VerifyCode />} /> 
        <Route path="/verify/:code" element={<VerifyPage />} /> 
      </Routes>
    </Router>
  );
};

export default App;
