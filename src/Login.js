import React,{useState} from 'react'

import {useHistory,Link} from 'react-router-dom'


function Login({handleLogin}) {

    let history = useHistory()

    const [msgs,setMsgs] = useState("")
    
    const [login,setLogin] = useState({})

    const [token,setToken] = useState({})

    const handleChange = (e)=>{
        const {name,value} = e.target

        setLogin({
            ...login,
            [name]:value
        })

    }

    const handleSubmit = (e)=>{

        e.preventDefault()
        console.log(login)

        const url = 'http://127.0.0.1:8000/api/login-profile/'
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(login)
        })
        .then((response)=>response.json())
        .then((data)=>{
            setToken(data)
            if(token.token!=="")
            {
                handleLogin(data)
                history.push("/")
            }
            else
            {
                setMsgs(data.msg)
            }
        })
        .catch(function(error){
            console.log('ERROR:',error)
        })

        localStorage.setItem("token", {token});

        // localStorage.getItem("token")
    }
      

    const mystyle={
        maxWidth: "540px",
    }


    return (
        <div className="container shadow" style={{mystyle}}>
            <h3 className="cover-image">Login</h3>
            <form className="form container">
                <div className="mb-3">
                    <input className="form-control" type="text" name="stud_id" placeholder="StudentID" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange}/>
                </div>
                <input type="submit" value="Login" className="btn m-3 btn-sm stupo-btn-dark" onClick={handleSubmit}/>
                
                <p>Do not have an account,<Link to="register" className="btn m-3 btn-sm stupo-btn-dark">Register</Link></p>

            </form>
            {msgs}
        </div>
    )
}

export default Login
