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

    return (
        <div className="container mt-5">
                <form className="card" onSubmit={handleSubmit}>
                    <div className="card-body">
                        <input type="text" placeholder="project title.." value={project.title} name="title" onChange={handleChange}/>

                        <label for="start-date">Start Date:</label>
                        <input type="date" id="start-date" value={project.date_start} name="date_start" onChange={handleChange}/>

                        <br/>
                        <label for="end-date">End Date:</label>
                        <input type="date" id="end-date" value={project.date_end} name="date_end" onChange={handleChange}/>

                        <textarea placeholder="Description" value={project.desc} name="desc" onChange={handleChange}></textarea>

                        <select name="tags" id="tag" onChange={handleTag}>
                            <option>Select</option>
                            {
                                tags.map(function(tag){
                                    return <option key={tag.id} >{tag.tag_name}</option>
                                })
                            }
                            
                        </select>
                        <input type="text" value={project.link} name="link" onChange={handleChange} placeholder="Link"/>
                        <input type="submit" value="ADD PROJECT" className="btn btn-outline-success"/>
                    </div>
                </form>
            </div>
    )
}



export default ProjectForm

