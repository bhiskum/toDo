import React from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import SignIn from './pages/login/login'
import Register from './pages/register/register';
import Home from './pages/home/home';
import './App.css';

function App() {

  return (
    <div className="App">
      <BrowserRouter >
        
        <div>
          <Route path="/" exact component={SignIn } />
          <Route path="/home" component={Home} />
          <Route path="/register" component={Register} />
        </div>
      </BrowserRouter>
    </div>
  );

}

export default App;
