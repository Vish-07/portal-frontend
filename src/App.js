import React,{useState} from 'react'
import InternshipForm from './InternshipForm'

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import ProjectForm from "./ProjectForm";
import Profile from './Profile';
import Register from './Register';
import Login from './Login';

function App() {
  
  const [update,setUpdate] = useState(false)
  const [identity,setId] = useState(0)

  const [obj,setObj] = useState({})


  const handleUpdate = (i,instance)=>{
    setUpdate(true)
    setId(i)
    setObj(instance)
  }
  
  const handleNoUpdate=()=>{
    setUpdate(false)
    setId(0)
    setObj({})
  }

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
          <InternshipForm id={1} update={update} identity={identity} instance = {obj} handleNoUpdate={handleNoUpdate}/>
        </Route>
        <Route path="/project">
          <ProjectForm id={1} update={update} identity={identity} instance = {obj} handleNoUpdate={handleNoUpdate}/>
        </Route>
        <Route path="/">
          <Profile id={1} handleUpdate={handleUpdate}/>
        </Route>
      </Switch>
    </div>
  </Router>
    
  )
}

export default App
