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
        <div className="container shadow" style={{mystyle}}>
      <h3 className="cover-image">Form for Internship Details</h3>
      <form className="form container" onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Company Name"
            aria-label="Company name"
            name="CompanyName"
            onChange={handleChange}
            value={internship.company}
          />
        </div>
        <div className="row mb-3">
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="Start Date"
              aria-label="Start Date"
              name="StartDate"
              onChange={handleChange}
              value={internship.date_start}
            />
          </div>
          <div className="col">
            <input
              type="date"
              className="form-control"
              placeholder="End Date"
              aria-label="End Date"
              name="EndDate"
              onChange={handleChange}
              value={internship.date_end}
            />
          </div>
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Intern Title(Ex. SDE, Analyst, Web Developer(frontend, backend, fullstack))"
            aria-label="Intern Title(Ex. SDE, Analyst, Web Developer(frontend, backend, fullstack))"
            Name="InternTitle"
            onChange={handleChange}
            value={internship.job_title}
          />
        </div>
        
        <div className="input-group mb-3">
          <span className="input-group-text">Brief Description</span>
          <textarea className="form-control" aria-label="With textarea" name="Description" onChange={handleChange} value={internship.desc}></textarea>
        </div>
        {/* <div action="/action_page.php">
          <label htmlFor="myfile">
            Upload Internship Certificate or equivalent:{" "}
          </label>
          <input type="file" id="myfile" name="myfile" />
          <br />
          <br />
        </div> */}
        <button type="submit" className="btn stupo-btn-dark sm">
          Submit
        </button>
      </form>
    </div>
    )
}

export default InternshipForm
