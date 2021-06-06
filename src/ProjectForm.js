import React, {useState,useEffect} from 'react'

function ProjectForm() {
    
    
    const [tags,setTags] = useState([])
    
    const [project,setProject] = useState({})


    // empty square braces is for the hook executing on mount 
    // we can add the variable names to the square brackets
    // when these variables change we have the function in hook running

    useEffect(() => {
        fetch('http://127.0.0.1:8000/tag-list/')
        .then((response)=>response.json())
        .then((data)=>{
            setTags(data)
            console.log(data)
        })
    }, [])



    const handleChange=(e)=>{
        const {name,value} = e.target

        setProject({
            ...project,
            [name]:value
        })
    }


    
    return (
        <div className="container mt-5">
                <form className="card">
                    <div className="card-body">
                        <input type="text" placeholder="project title.." name="projectTitle" onChange={handleChange}/>

                        <label for="start-date">Start Date:</label>
                        <input type="date" id="start-date" name="start_date" onChange={handleChange}/>

                        <br/>
                        <label for="end-date">End Date:</label>
                        <input type="date" id="end-date" name="end_date" onChange={handleChange}/>

                        <textarea placeholder="Description" name="description" onChange={handleChange}></textarea>

                        <select name="tag" id="tag" onChange={handleChange}>
                            {
                                tags.map(function(tag,index){
                                    return <option key={index} >{tag.tag_name}</option>
                                })
                            }
                            
                        </select>
                        <input type="submit" value="ADD PROJECT" className="btn btn-outline-success"/>
                    </div>
                </form>

                <p>{project.projectTitle}</p>
                <p>{project.start_date}</p>
                <p>{project.end_date}</p>
                <p>{project.description}</p>
                <p>{project.tag}</p> 
                {console.log(project)}
            </div>
    )
}



export default ProjectForm

