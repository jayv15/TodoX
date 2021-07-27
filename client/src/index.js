import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; 
import Register from './components/Auth/Register';
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter as Router,Switch,Route, Link } from "react-router-dom";
import Login from '../src/components/Auth/Login';
import Cookies from 'js-cookie';
import {Redirect} from 'react-dom';


const RouteSystem = () => {
  return (
    <Router>
    <div>
      <Switch>
        <Route path='/' exact component={(props) => <Login/>} />
        <Route path='/Register' exact component={(props) => <Register {...props}/>} />        
        <Route path='/Login' exact component={(props) => <Login {...props}/>} />
        <Route path="/:list?" exact component={(props) => Cookies.get('jwt') ? <App {...props} /> : <Redirect to='/login' />} />
      </Switch>
    </div>
  </Router>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouteSystem />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


