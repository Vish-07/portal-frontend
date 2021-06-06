import React,{useState} from 'react'



function InternshipForm() {
    
    const [internship,setInternship] = useState({})
    
    const handleChange = (e)=>{
        const {name,value} = e.target

        setInternship({
            ...internship,
            [name]:value
        })
    }


    return (
        <div className="card container mt-5">
            <form className="d-flex flex-column row justify-content-center">

                <div className="d-flex flex-column col-md-3">
                    <input type="text" placeholder="Company Name" name="company" onChange={handleChange} />


                    <input type="date" name="dateJoin" placeholder="Joining Date" onChange={handleChange}/>
                    <input type="date" name="dateEnd" placeholder="Ending date" onChange={handleChange} />

                    <input type="text" name="job-title" placeholder="Intern Title" onChange={handleChange}/>
                </div>
                <div className="col-md-5">
                    <textarea name="desc" onChange={handleChange}>
                        
                    </textarea>
                    
                    <input type="file" placeholder="UPLOAD CERTIFICATE"/>

                    <input type="submit" value="ADD" className="btn btn-success"/>

                </div>

            </form>

            <p>{internship.company}</p>
            <p>{internship.dateJoin}</p>
            <p>{internship.dateEnd}</p>
            
        </div>
    )
}

export default InternshipForm
