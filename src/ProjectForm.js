import React, { Component } from 'react'

export class ProjectForm extends Component {
    
    constructor(){
        super();
        this.state={
            projectTitle:"",
            description:"",
            start_date: new Date().toDateString(),
            end_date: new Date().toDateString(),
            tag:"",
            tags:[],
        }
        this.handleChange=this.handleChange.bind(this)
        this.fetchData=this.fetchData.bind(this)
    }
    
    componentDidMount(){
        this.fetchData()
    }

    fetchData(){
        fetch('http://127.0.0.1:8000/tag-list/')
        .then((response)=>response.json())
        .then((data)=>{
            this.setState({
                tags:data
            })
            console.log(data)
        })
    }

    handleChange(e){
        const {name,value} = e.target

        this.setState({
            [name]:value
        })
    }

    render() {
        return (
            <div className="container mt-5">
                <form className="card">
                    <div className="card-body">
                        <input type="text" placeholder="project title.." name="projectTitle" onChange={this.handleChange}/>

                        <label for="start-date">Start Date:</label>
                        <input type="date" id="start-date" name="start_date" onChange={this.handleChange}/>

                        <br/>
                        <label for="end-date">End Date:</label>
                        <input type="date" id="end-date" name="end_date" onChange={this.handleChange}/>

                        <textarea placeholder="Description" name="description" onChange={this.handleChange}></textarea>

                        <select name="tag" id="tag" onChange={this.handleChange}>
                            {
                                this.state.tags.map(function(tag,index){
                                    return <option key={index} >{tag.tag_name}</option>
                                })
                            }
                            
                        </select>
                        <input type="submit" value="ADD PROJECT" className="btn btn-outline-success"/>
                    </div>
                </form>

                {/* <p>{this.state.projectTitle}</p>
                <p>{this.state.start_date}</p>
                <p>{this.state.end_date}</p>
                <p>{this.state.description}</p>
                <p>{this.state.tag}</p> */}

            </div>
        )
    }
}

export default ProjectForm
