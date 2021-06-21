import React,{useState} from 'react'

function Login() {
    
    const [login,setLogin] = useState({})

    const [token,setToken] = useState("")

    const handleChange = (e)=>{
        const {name,value} = e.target

        setLogin({
            ...login,
            [name]:value
        })

    }

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



    const handleSubmit = (e)=>{

        e.preventDefault()

        const csrftoken = getCookie('csrftoken');

        const url = ''
        fetch(url,{
            method:'POST',
            headers:{
                'Content-type':'application/json',
                'X-CSRFToken': csrftoken
            },
            body:JSON.stringify(login)
        })
        .then((response)=>response.json())
        .then((data)=>{
            return setToken(data)
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
                <input type="number" name="stud_id" placeholder="StudentID" onChange={handleChange}/>

                <input type="password" name="password" placeholder="Password" onChange={handleChange}/>

                <input type="submit" value="Login" className="btn btn-warning" onClick={handleSubmit}/>

            </form>

        </div>
    )
}

export default Login
