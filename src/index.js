import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const Register = lazy(() => import('./shared/views/register/Register'))
const Dummy = lazy(() => import('./shared/views/dummy/Dummy'))

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route exact path="/">
          <Suspense fallback={<div>Page is Loading...</div>}>
            <Register />
          </Suspense>
        </Route>
        <Route exact path="/signIn">
          <Suspense fallback={<div>Page is Loading...</div>}>
            <Dummy message = "Sign In"/>
          </Suspense>
        </Route>
        <Route exact path="/privacyPolicy">
          <Suspense fallback={<div>Page is Loading...</div>}>
            <Dummy message = "Privacy Policy"/>
          </Suspense>
        </Route>
        <Route exact path="/termsOfService">
          <Suspense fallback={<div>Page is Loading...</div>}>
            <Dummy message = "Terms Of Service"/>
          </Suspense>
        </Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
