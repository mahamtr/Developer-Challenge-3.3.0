import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';

function App() { 
  return (
    <div className="App">
     <Router>
       <Switch>
         <Route path="/" component={Login}>

         </Route>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
