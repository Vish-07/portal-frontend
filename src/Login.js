import React,{useState} from 'react'

function Login() {
    
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
        })
        .catch(function(error){
            console.log('ERROR:',error)
        })

        localStorage.setItem("token", {token});

        // localStorage.getItem("token")
    }
      
    return (
        <div className="container mt-5">  

            <form style={{display:'flex',flexDirection:'column'}}>
                <input type="text" name="stud_id" placeholder="StudentID" onChange={handleChange}/>

                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>

                <input type="submit" value="Login" className="btn btn-warning" onClick={handleSubmit}/>

            </form>
        </div>
    )
}

export default Login
