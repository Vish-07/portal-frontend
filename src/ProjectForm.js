import React, {useState,useEffect} from 'react'

import {useHistory} from 'react-router-dom';

function ProjectForm({id,identity,update,instance,handleNoUpdate}) {
    
    
    const [tags,setTags] = useState([])

    const [project,setProject] = useState({profile:id})

    let history = useHistory()

    // empty square braces is for the hook executing on mount 
    // we can add the variable names to the square brackets
    // when these variables change we have the function in hook running

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/tag-list/')
        .then((response)=>response.json())
        .then((data)=>{
            setTags(data)
        })
    }, [])

    useEffect(()=>{
        if(update === true)
        {
            setProject(instance)
        }
    },[instance,update])

    const handleChange=(e)=>{
        const {name,value} = e.target

        setProject({
            ...project,
            [name]:value
        })
    }

    const handleTag=(e)=>{
        const {value} = e.target

        var i
        for( i=0 ;i<=tags.length;i++)
        {
            if(tags[i].tag_name===value)
            {
                break
            }
        }

        setProject({
            ...project,
            tags:[i+1]
        })
    }
    
    const handleSubmit = (e)=>{
        e.preventDefault()        

        var url = 'http://127.0.0.1:8000/api/add-project/'

        if(update===true)
        {
            url = `http://127.0.0.1:8000/api/update-project/${identity}/`
        }

        fetch(url ,{
                method:'POST',
                headers:{
                    'Content-type':'application/json',
                },
                body:JSON.stringify(project)
            })
            .then((response)=> {
                setProject({})
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
            <h3 className="cover-image">Form for Project Details</h3>
            <form className="form container" onSubmit={handleSubmit}>
            <div className="mb-3">
                <input className="form-control" type="text" aria-label="Project Title" placeholder="Project Title" value={project.title} name="title" onChange={handleChange}/>
            </div>
            <div className="row mb-3">
                <div className="col">
                    <input className="form-control" aria-label="Start Date" type="date" id="start-date" value={project.date_start} name="date_start" onChange={handleChange}/>
                </div>
                <div className="col">
                    <input className="form-control" aria-label="End Date" type="date" id="end-date" value={project.date_end} name="date_end" onChange={handleChange}/>
                </div>
            </div>
            <div className="input-group mb-3">
                <span className="input-group-text">Brief Description</span>
                <textarea className="form-control" aria-label="With textarea" placeholder="Description" value={project.desc} name="desc" onChange={handleChange}></textarea>
            </div>
            <div>
                <select className="form-select mb-3" name="tags" id="tag" onChange={handleTag}>
                    <option>Select</option>
                    {
                        tags.map(function(tag){
                            return <option key={tag.id} >{tag.tag_name}</option>
                        })
                    }
                            
                </select>
            </div>
            <div className="mb-3">
                <input type="text" className="form-control" aria-label="Project Link" value={project.link} name="link" onChange={handleChange} placeholder="Project Link"/>            
            </div>
            <input type="submit" value="ADD PROJECT" className="btn stupo-btn-dark sm"/>
            </form>
        </div>
    )
}



export default ProjectForm

