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


    const mystyle={
        maxWidth: "540px",
    }
    
    return (

        <div className="container shadow" style={{mystyle}}>
            <h3 className="cover-image">Form for Internship Details</h3>
            <form className="form container" onSubmit={handleSubmit}>

                <div className="mb-3">
                    <input className="form-control" aria-label="Company Name" type="text" placeholder="Company Name" value={internship.company} name="company" onChange={handleChange} />
                </div>
                <div className="row mb-3">
                    <div className="col">
                        <input type="date"  className="form-control" aria-label="Start Date" name="date_start" value={internship.date_start} placeholder="Joining Date" onChange={handleChange}/>
                    </div>
                    <div className="col">
                        <input type="date" className="form-control" aria-label="End Date" name="date_end" value={internship.date_end} placeholder="Ending date" onChange={handleChange} />
                    </div>
                    
                </div>

                <div className="mb-3">
                    <input type="text" className="form-control" Name="Intern Title" name="job_title" value={internship.job_title} placeholder="Intern Title" onChange={handleChange}/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text">Brief Description</span>
                    <textarea className="form-control" aria-label="With textarea" name="desc" value={internship.desc} onChange={handleChange}></textarea>
                </div>

                <input type="submit" value="ADD" className="btn stupo-btn-dark sm"/>
            </form>        
        </div>

    )
}

export default InternshipForm
