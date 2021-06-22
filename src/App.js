import React,{useState} from 'react'
import InternshipForm from './InternshipForm'

import { BrowserRouter as Router, Switch, Route} from "react-router-dom";


import ProjectForm from "./ProjectForm";
import Profile from './Profile';
import Register from './Register';
import Login from './Login';

function App() {
  

  const [userId,setUserId] = useState(1)
  const [isLogin,setIsLogin] = useState(false)

  const [update,setUpdate] = useState(false)
  const [identity,setId] = useState(0)

  const [obj,setObj] = useState({})

  

  const handleLogin=({token,id})=>{ 
    if (token !== "")
    {
        console.log("here")
        setIsLogin(true)
        setUserId(id)
    }
    console.log(userId)
  }

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

  const handleLogout=()=>{
    setIsLogin(false)
    setUserId(1)
  }

  return (
    
  <Router>   
    <div className="app">
      <Switch>
        <Route path="/register">
          <Register/>
        </Route>
        <Route path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
        <Route path="/internship">
          <InternshipForm id={userId} login={isLogin} update={update} identity={identity} instance = {obj} handleNoUpdate={handleNoUpdate}/>
        </Route>
        <Route path="/project">
          <ProjectForm id={userId} login={isLogin} update={update} identity={identity} instance = {obj} handleNoUpdate={handleNoUpdate}/>
        </Route>
        <Route path="/">
          <Profile id={userId} login={isLogin} handleUpdate={handleUpdate} handleLogout={handleLogout}/>
        </Route>
      </Switch>
    </div>
  </Router>
    
  )
}

export default App
