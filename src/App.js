import React from 'react'
import InternshipForm from './InternshipForm'

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import ProjectForm from "./ProjectForm";
import Profile from './Profile';
import Register from './Register';
import Login from './Login';

function App() {
  return (
    
  <Router>   
    <div className="app">
      <Switch>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login/>
        </Route>
        <Route path="/internship">
          <InternshipForm/>
        </Route>
        <Route path="/project">
          <ProjectForm/>
        </Route>
        <Route path="/">
          <Profile/>
        </Route>
      </Switch>
    </div>
  </Router>
    
  )
}

export default App
