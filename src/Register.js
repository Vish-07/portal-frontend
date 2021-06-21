import React,{useState} from 'react'

import {useHistory} from 'react-router-dom';

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

    
    return (
        <div className="container mt-5">
            <form style={{display:'flex',flexDirection:'column'}} className="col-6">
                <input type="text" name="stud_name" placeholder="Name" onChange={handleChange}/>

                <input type="text" name="stud_id" placeholder="Student ID" onChange={handleChange}/>
                
                <textarea name="desc" onChange={handleChange} placeholder="Description">

                </textarea>

                <input type="email" name="email" placeholder="Email" onChange={handleChange}/>

                <input type="number" step="0.01" name="cgpa" onChange={handleChange} placeholder="CGPA"/>

                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>

                <input type="submit" value="Register" className="btn btn-warning" onClick={handleSubmit}/>

            </form> 
        </div>
    )
}

export default Register
