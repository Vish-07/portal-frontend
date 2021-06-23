import React, { useState, useEffect } from 'react'

import { useHistory } from 'react-router-dom';

function ProjectForm({ id, identity, update, instance, handleNoUpdate }) {


    const [tags, setTags] = useState([])

    const [project, setProject] = useState({ profile: id })

    let history = useHistory()

    // empty square braces is for the hook executing on mount 
    // we can add the variable names to the square brackets
    // when these variables change we have the function in hook running

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/tag-list/')
            .then((response) => response.json())
            .then((data) => {
                setTags(data)
            })
    }, [])

    useEffect(() => {
        if (update === true) {
            setProject(instance)
        }
    }, [instance, update])

    const handleChange = (e) => {
        const { name, value } = e.target

        setProject({
            ...project,
            [name]: value
        })
    }

    const handleTag = (e) => {
        const { value } = e.target

        var i
        for (i = 0; i <= tags.length; i++) {
            if (tags[i].tag_name === value) {
                break
            }
        }

        setProject({
            ...project,
            tags: [i + 1]
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        var url = 'http://127.0.0.1:8000/api/add-project/'

        if (update === true) {
            url = `http://127.0.0.1:8000/api/update-project/${identity}/`
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(project)
        })
            .then((response) => {
                setProject({})
                console.log('RESPONSE IS:', response)
                console.log("added")
                history.push("/")
                if (update === true) {
                    handleNoUpdate()
                }
            })
            .catch(function (error) {
                console.log('ERROR:', error)
            })

    }

    return (
        <div className="container shadow" style={{ mystyle }}>
            <h3 className="cover-image">Form for Project Details</h3>
            <form className="form container" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Project Title"
                        aria-label="Project Title"
                        name="ProjectTitle"
                        onChange={handleChange}
                        value={project.title}
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
                            value={project.date_start}
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
                            value={project.date_end}
                        />
                    </div>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text">Brief Description</span>
                    <textarea
                        className="form-control"
                        aria-label="With textarea"
                        name="Description"
                        onChange={handleChange}
                        value={project.desc}
                    ></textarea>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Add Link related to your project."
                        aria-label="Project Link"
                        name="ProjectLink"
                        onChange={handleChange}
                        value={project.link}
                    />
                </div>
                <div>
                    <select
                        class="form-select mb-3"
                        aria-label="Default select example"
                        name="tags"
                        id="tag"
                        onChange={handleTag}
                    >

                        {
                            tags.map(function (tag) {
                                return <option key={tag.id} >{tag.tag_name}</option>
                            })
                        }

                    </select>
                </div>
                <button type="submit" className="btn stupo-btn-dark sm">
                    Add
                </button>
            </form>
        </div>








    )
}



export default ProjectForm

