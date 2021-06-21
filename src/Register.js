import React,{useState} from 'react'


function Register() {
    
    const [student,setStudent] = useState({})

    const handleChange=(e)=>{
        const {name,value} = e.target

        setStudent({
            ...student,
            [name]:value
        })

    }

    // used for the csrf_token
    // copy this from django docs
    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }


    const handleSubmit=(e)=>{
        const url = 'http://127.0.0.1:8000/api/register-profile/'

        e.preventDefault()

        const csrftoken = getCookie('csrftoken');

        fetch(url ,{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                    'X-CSRFToken': csrftoken
                },
                body:JSON.stringify(student)
            })
            .then((response)=> {
                setStudent({})
                console.log('RESPONSE IS:',response)
            })
            .catch(function(error){
            console.log('ERROR:',error)
        })

    }

    
    return (
        <div className="container mt-5">
            <form style={{display:'flex',flexDirection:'column'}} className="col-6">
                <input type="text" name="stud_name" placeholder="Name" onChange={handleChange}/>

                <input type="number" name="stud_id" placeholder="Student ID" onChange={handleChange}/>
                
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
