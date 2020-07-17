import React  from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import SaleCenter from './components/SaleCenter/SaleCenter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function App() {

  function isTokenAtCookies (){
    const cookies = document.cookie.split(';');
    return cookies.some((cookie:any) => cookie.includes("token"));
  };
  
  return (
    <div className="App">
      <Router>
        <ToastContainer />

        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/saleCenter" exact render={(props) =>{
            if(isTokenAtCookies()) return <SaleCenter  {...props} />
            return <Login {...props} />
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
