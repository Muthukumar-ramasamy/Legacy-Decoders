import React from 'react';
import './App.css';
import { Home } from './Landing/Home';
import { AppRoutes } from './AppRoute';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <div className="App">
      <AppRoutes />
    </div>
  );
}

export default App;
