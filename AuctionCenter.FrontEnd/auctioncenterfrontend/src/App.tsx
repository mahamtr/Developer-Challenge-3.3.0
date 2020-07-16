import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import SaleCenter from './components/SaleCenter/SaleCenter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [token, setToken] = useState()
  return (
    <div className="App">
      <Router>
        <ToastContainer />

        <Switch>
          <Route path="/" exact render={(props) => <Login setToken={setToken} token={token} {...props} />} />
          <Route path="/saleCenter" exact render={(props) =>{
            if(token) return <SaleCenter token={token} {...props} />
            return <Login setToken={setToken} token={token} {...props} />
          }}  />
          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
