import React,{useState,useEffect} from 'react'

import { Link,Redirect } from "react-router-dom";

import Title from './Title';

import avatar from "./images/avatar.jpg"

function Profile({id,login,handleUpdate,handleLogout,user}) {

    const [t,setTags] = useState([])

    const [projects,setProjects] = useState([])

    const [filterProjects,setFilterProjects] = useState([])

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
            setFilterProjects(data)
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


    const handleFilter=(e)=>{

        const {value} = e.target

        if(value==="All")
        {
            setFilterProjects(projects)
        }
        else{
            var filteredSet = projects.filter((project)=>{
                return t[(project.tags[0])-1]?.tag_name === value
            })

            setFilterProjects(filteredSet)
        }
        
    }

    const mystyle={
        maxWidth: "540px",
    }

    if(!login){
        return <Redirect to="/login"/>
    }

    return (
        <div>
            <Title />
            <div className="card mb-3 container" style={{ mystyle }}>
                <div className="row g-0">
                    <div className="col-md-3">
                        <img src={avatar} alt="..." />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{user.name}</h5>
                            <p className="card-text">{user.desc}</p>
                            <p className="card-text"><small className="text-muted">Branch: CSE</small></p>
                            <p className="card-text"><small className="text-muted">CGPA: {user.cgpa}</small></p>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container">
                <button type="button" className="btn stupo-btn-dark m-3 sm"> <a href={user.email}>Email</a></button>
                <button type="button" className="btn stupo-btn-dark m-3 sm"> <a href="https://github.com/Vish-07">GitHub</a></button>
                <button type="button" className="btn stupo-btn-dark m-3 sm"> <a href="linkedIn.com">LinkedIn</a></button>
                <Link to="/project">
                    <button type="button" className="btn stupo-btn-dark m-3 sm" >Add Project</button>
                </Link>
                <Link to="/internship">
                    <button type="button" className="btn stupo-btn-dark m-3 sm" >Add Internship</button>
                </Link>
                <button className="btn stupo-btn-dark m-3 sm" onClick={handleLogout}>Logout</button>
            </div>


            <div className="container col-4 mx-5">
                <select className="form-select mb-3" name="t" id="tag" onChange={handleFilter}>
                    <option>All</option>
                    {
                        t.map(function(tag){
                            return <option key={tag.id} >{tag.tag_name}</option>
                        })
                    }
                            
                </select>
            </div>


            <hr />
            <h2>My Projects</h2>
            
            {filterProjects.map(function(project){
                return <div key={project.pk}>
                            <div className="card mb-3 mt-2 container" style={{ mystyle }} >
                                <div className="row g-0">
                                    <div className="col-md-3 mt-2">
                                        <h3>{project.title}</h3>
                                        <h6>{project.date_start} - {project.date_end}</h6>
                                        {
                                            project.tags.length === 0 ? <h5>No Tags</h5> : <h5 className="btn btn-warning">{t[(project.tags[0])-1]?.tag_name}</h5>
                                        }
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <p>{project.desc}</p>
                                            <button type="button" className="btn stupo-btn-dark m-3 btn-sm"> <a href={project.link}>Link</a></button>
                                            <Link to="/project">
                                                <button onClick={()=>handleUpdate(project.pk,project)} className="btn m-3 btn-sm stupo-btn-dark">Update</button>
                                            </Link>
                                            <button className="btn m-3 btn-sm stupo-btn-dark" onClick={()=>handleDelete("project",project.pk)}>Delete</button>
                                        </div>
                                    </div> 
                                </div>
                            </div>
                            <hr />
                        </div> 
            })}


            <h2 >My Internships</h2>

            {internships.map(function(intern){
                return  <div key={intern.pk}>
                            <div className="card mb-3 mt-2 container" style={{ mystyle }}>
                                <div className="row g-0">
                                    <div className="col-md-3 mt-2">
                                        <h3>{intern.company}</h3>
                                        <h6>{intern.date_start} - {intern.date_end}</h6>
                                        <h5>{intern.job_title}</h5>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <p>{intern.desc}</p>
                                            <Link to="/internship">
                                                <button onClick={()=>handleUpdate(intern.pk,intern)} className="btn m-3 btn-sm stupo-btn-dark">Update</button>
                                            </Link>
                                            <button onClick={()=>handleDelete("internship",intern.pk)} className="btn m-3 btn-sm stupo-btn-dark" >Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                            <hr/>
                        </div>
            })}

        </div>
    )
}

export default Profile