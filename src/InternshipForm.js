import React,{useState,useEffect} from 'react'

import {useHistory} from 'react-router-dom';

function InternshipForm({id,identity,update,instance,handleNoUpdate}) {
    
    const [internship,setInternship] = useState({profile:id})
   
    let history = useHistory()
    
    useEffect(()=>{
        if(update === true)
        {
            setInternship(instance)
        }
    },[instance,update])


    const handleChange = (e)=>{
        const {name,value} = e.target

        setInternship({
            ...internship,
            [name]:value
        })
    }


    const handleSubmit = (e) => {

        e.preventDefault()        

        var url = 'http://127.0.0.1:8000/api/add-internship/'

        if(update === true)
        {
            url = `http://127.0.0.1:8000/api/update-internship/${identity}/`
        }

        fetch(url ,{
                method:'POST',
                headers:{ 
                    'Content-type':'application/json',
                },
                body:JSON.stringify(internship)
            })
            .then((response)=>{
                setInternship({})
                console.log('RESPONSE IS:',response)
                console.log("added")
                history.push("/")
                if(update === true){
                    handleNoUpdate()
                }
            })
            .catch(function(error){
            console.log('ERROR:',error)
            })

    }

    
    return (

        <div className="card container mt-5">
            <form className="d-flex flex-column row justify-content-center" onSubmit={handleSubmit}>

                <div className="d-flex flex-column col-md-3">
                    <input type="text" placeholder="Company Name" value={internship.company} name="company" onChange={handleChange} />

                    <input type="date" name="date_start" value={internship.date_start} placeholder="Joining Date" onChange={handleChange}/>
                    <input type="date" name="date_end" value={internship.date_end} placeholder="Ending date" onChange={handleChange} />

                    <input type="text" name="job_title" value={internship.job_title} placeholder="Intern Title" onChange={handleChange}/>
                </div>
                <div className="col-md-5">
                    <textarea name="desc" value={internship.desc} onChange={handleChange}>
                        
                    </textarea>
                    
                    <input type="submit" value="ADD" className="btn btn-success"/>

                </div>
            </form>        
        </div>

    )
}

export default InternshipForm
