import React,{useState,useEffect} from 'react'

import { Link } from "react-router-dom";

function Profile({id,handleUpdate}) {

    const [t,setTags] = useState([])

    const [projects,setProjects] = useState([])

    const [internships,setInternships] = useState([])

    useEffect(()=>{
        fetch('http://127.0.0.1:8000/api/tag-list/')
        .then((response)=>response.json())
        .then((data)=>{
            setTags(data)
        })

    },[])

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/project-list/${id}/`)
        .then((response)=>response.json())
        .then((data)=>{
            setProjects(data)
        })
    },[id])

    useEffect(()=>{
        fetch(`http://127.0.0.1:8000/api/internship-list/${id}/`)
        .then((response)=>response.json())
        .then((data)=>{
            setInternships(data)
        })
    },[id])

    const fetchProjects=()=>{
        fetch(`http://127.0.0.1:8000/api/project-list/${id}/`)
        .then((response)=>response.json())
        .then((data)=>{
            setProjects(data)
        })
    }

    const fetchInters=()=>{
        fetch(`http://127.0.0.1:8000/api/internship-list/${id}/`)
        .then((response)=>response.json())
        .then((data)=>{
            setInternships(data)
        })
    }

    const handleDelete = (type,id)=>{

        fetch(`http://127.0.0.1:8000/api/delete-${type}/${id}`,{
            method:'DELETE',
            headers:{
                'Content-type':'application/json',
            },
        })
        .then((response)=>{
            console.log("DELETE SUCCESS")
            if(type === "project")
            {
                fetchProjects()
            }
            else
            {
                fetchInters()
            }

        })
        .catch(function(error){
            console.log('ERROR:',error)
        })

    }

    return (
        <div className="container">

            <Link to="/project">
                <button className="btn btn-success" >Add Project</button>
            </Link>
            <Link to="/internship">
                <button className="btn btn-success" >Add Internship</button>
            </Link>
            {projects.map(function(project){
                return <div className="card my-3" key={project.pk} >
                            <p>{project.title}</p>
                            <p>{project.desc}</p>
                            <p>{project.date_start}</p>
                            <p>{project.date_end}</p>
                            {
                                project.tags.length === 0 ? <p>No Tags</p> : <p className="btn btn-warning">{t[(project.tags[0])-1]?.tag_name}</p>
                            }
                            <Link to="/project">
                                <button onClick={()=>handleUpdate(project.pk,project)} className="btn btn-outline-primary">Update</button>
                            </Link>
                            <button className="btn btn-outline-danger" onClick={()=>handleDelete("project",project.pk)}>Delete</button>
                        </div> 
            })}

            {internships.map(function(intern){
                return  <div className="card my-3" key={intern.pk}>
                            <p>{intern.company}</p>
                            <p>{intern.job_title}</p>
                            <p>{intern.desc}</p>
                            <p>{intern.date_start}</p>
                            <p>{intern.date_end}</p>
                            <Link to="/internship">
                                <button onClick={()=>handleUpdate(intern.pk,intern)} className="btn btn-outline-primary">Update</button>
                            </Link>
                            <button onClick={()=>handleDelete("internship",intern.pk)} className="btn btn-outline-danger" >Delete</button>        
                        </div> 
            })}

        </div>
    )
}

export default Profile