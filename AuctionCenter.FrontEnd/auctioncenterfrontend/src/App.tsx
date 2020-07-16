import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() { 
  return (
    <div className="App">
     <Router>
     <ToastContainer />

       <Switch>
         <Route path="/" component={Login}>

         </Route>
       </Switch>
     </Router>
    </div>
  );
}

export default App;
