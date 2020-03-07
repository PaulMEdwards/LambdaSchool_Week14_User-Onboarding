import React from 'react';
import logo from './logo.svg';
import './App.css';
import { EnhancedOnboardingForm } from './components';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <EnhancedOnboardingForm 
        username={"PaulMEdwards"}
        email={"pauledwards@gmail.com"}
        password={"asif823r!#5c"}
        role={"Administrator"}
        tos={true}
        notes={"These are my test notes."}
      />
    </div>
  );
}

export default App;
