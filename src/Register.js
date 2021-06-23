import React,{useState} from 'react'

import {useHistory,Link} from 'react-router-dom';


function Register() {
    
    const [student,setStudent] = useState({})

    let history = useHistory()

    const handleChange=(e)=>{
        const {name,value} = e.target

        setStudent({
            ...student,
            [name]:value
        })

    }

    const handleSubmit=(e)=>{
        const url = 'http://127.0.0.1:8000/api/register-profile/'

        e.preventDefault()

        fetch(url ,{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify(student)
            })
            .then((response)=> {
                history.push("/login")
                setStudent({})
            })
            .catch(function(error){
            console.log('ERROR:',error)
        })

    }


    const mystyle={
        maxWidth: "540px",
    }
    
    return (
        <div className="container shadow" style={{mystyle}}>
            <h3 className="cover-image">Register</h3>
            <form className="form container">
                <div className="mb-3">
                    <input className="form-control" type="text" name="stud_name" placeholder="Name" onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <input className="form-control" type="email" name="email" placeholder="Email" onChange={handleChange}/>
                </div>
               
                <div className="input-group mb-3">
                    <span className="input-group-text">Brief Description</span>
                    <textarea className="form-control" name="desc" onChange={handleChange} placeholder="Description"></textarea>
                </div>

                <div className="row mb-3">
                    <div className="col">
                        <input className="form-control" type="text" name="stud_id" placeholder="Student ID" onChange={handleChange}/>
                    </div>
                    <div className="col">
                        <input className="form-control" type="number" step="0.01" name="cgpa" onChange={handleChange} placeholder="CGPA"/>
                    </div>
                </div>

                <div className="mb=3">
                    <input className="form-control" type="password" name="password" placeholder="Password" onChange={handleChange}/>
                </div>

                <input type="submit" value="Register" className="btn m-3 btn-sm stupo-btn-dark" onClick={handleSubmit}/>

                <p>Already have an account,<Link to="login" className="btn m-3 btn-sm stupo-btn-dark">Login</Link></p>
            </form> 
        </div>
    )
}

export default Register
