import React, { useState, useEffect } from 'react'
import avatar from "../Images/avatar.jpg"
import Title from "./Title";
import { Link, Redirect } from "react-router-dom";

function Profile({ id, login, handleUpdate, handleLogout }) {

    const [t, setTags] = useState([])

    const [projects, setProjects] = useState([])

    const [internships, setInternships] = useState([])

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/tag-list/')
            .then((response) => response.json())
            .then((data) => {
                setTags(data)
            })

    }, [])

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/project-list/${id}/`)
            .then((response) => response.json())
            .then((data) => {
                setProjects(data)
            })
    }, [id])

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/internship-list/${id}/`)
            .then((response) => response.json())
            .then((data) => {
                setInternships(data)
            })
    }, [id])

    const fetchProjects = () => {
        fetch(`http://127.0.0.1:8000/api/project-list/${id}/`)
            .then((response) => response.json())
            .then((data) => {
                setProjects(data)
            })
    }

    const fetchInters = () => {
        fetch(`http://127.0.0.1:8000/api/internship-list/${id}/`)
            .then((response) => response.json())
            .then((data) => {
                setInternships(data)
            })
    }

    const handleDelete = (type, id) => {

        fetch(`http://127.0.0.1:8000/api/delete-${type}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
            },
        })
            .then((response) => {
                console.log("DELETE SUCCESS")
                if (type === "project") {
                    fetchProjects()
                }
                else {
                    fetchInters()
                }

            })
            .catch(function (error) {
                console.log('ERROR:', error)
            })

    }

    if (!login) { <Redirect path="/login" /> }

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
                            <h5 className="card-title">Vishakha Vikharankar</h5>
                            <p className="card-text">I am a prefinal year student pursuing my BTech in Computer Science and Engineering from VNIT, Nagpur.</p>
                            <p className="card-text"><small class="text-muted">Branch: CSE</small></p>
                            <p className="card-text"><small class="text-muted">CGPA: 00</small></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container">
                <button type="button" className="btn stupo-btn-dark m-3 sm"> <a href="abc@gmail.com">Email</a></button>
                <button type="button" className="btn stupo-btn-dark m-3 sm"> <a href="https://github.com/Vish-07">GitHub</a></button>
                <button type="button" className="btn stupo-btn-dark m-3 sm"> <a href="linkedIn.com">LinkedIn</a></button>
                <button type="button" className="btn stupo-btn-dark m-3 sm"><a href="resume.pdf">Resume</a></button>
                <Link to="/project">
                    <button type="button" className="btn stupo-btn-dark m-3 sm" >Add Project</button>
                </Link>
                <Link to="/internship">
                    <button type="button" className="btn stupo-btn-dark m-3 sm" >Add Internship</button>
                </Link>
                <button className="btn stupo-btn-dark m-3 sm" onClick={handleLogout}>Logout</button>

            </div>
            <hr />
            <h2>My Projects</h2>

            {
                projects.map(function (project) {
                    return (
                        <div>
                            <div class="card mb-3 mt-2 container" style={{ mystyle }}>
                                <div class="row g-0">
                                    <div class="col-md-3 mt-2">
                                        <h3> {project.title} </h3>
                                        <h6>{project.date_start} - {project.date_end}</h6>
                                        {
                                            project.tags.length === 0 ? <h5>No Tags</h5> : <h5 className="btn btn-warning">{t[(project.tags[0]) - 1]?.tag_name}</h5>
                                        }


                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <p>{project.desc}</p>
                                            <button type="button" className="btn stupo-btn-dark m-3 btn-sm"> <a href={project.link}>Link</a></button>
                                            <Link to="/project">
                                                <button onClick={() => handleUpdate(project.pk, project)} className="btn stupo-btn-dark m-3 btn-sm">Update</button>
                                            </Link>
                                            <button className="btn stupo-btn-dark m-3 btn-sm" onClick={() => handleDelete("project", project.pk)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    )
                })}
            <h2>My Internships</h2>

            {
                internships.map(function (internship) {
                    return (
                        <div>
                            <div class="card mb-3 mt-2 container" style={{ mystyle }}>
                                <div class="row g-0">
                                    <div class="col-md-3 mt-2">
                                        <h3> {internship.company} </h3>
                                        <h6>{internship.date_start} - {internship.date_end} </h6>
                                        <h5>{internship.job_title}</h5>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="card-body">
                                            <p>{internship.desc}</p>
                                            {/* <button type="button" className="btn m-3 btn-sm stupo-btn-dark"> <a href="project link">Certificate</a></button> */}
                                            <Link to="/internship">
                                <button onClick={()=>handleUpdate(intern.pk,intern)} className="btn m-3 btn-sm stupo-btn-dark">Update</button>
                            </Link>
                            <Link to="/internship">
                                <button onClick={()=>handleDelete("internship",intern.pk)} className="btn m-3 btn-sm stupo-btn-dark">Delete</button>
                            </Link>
                                            
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr />
                        </div>
                    )
                })}
                {<p>Hello</p>&&login}
        </div>)

}

export default Profile