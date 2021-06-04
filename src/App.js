import React from 'react'
import './App.css';
import ProjectForm from './ProjectForm';

class App extends React.Component {
  
  constructor(){
    super();
    this.state={
      display_form:false,
      profile:[]
    }
    this.handleClick=this.handleClick.bind(this)
    this.fetchData=this.fetchData.bind(this)
  }
  

  handleClick(){
    this.setState({
      display_form:true
    })
  }


  componentDidMount(){
    this.fetchData()
  }

  fetchData(){
    fetch('http://127.0.0.1:8000/profile/')
    .then((response)=>(response.json()))
    .then((data)=>{
      this.setState({
        profile:data
      })
      console.log(data)
    })

    console.log('STATE:',this.state.profile)
  }

  render(){
    return (
      <div className="App">


        <div className="card">
          <div className="card-body">
            <p>{this.state.profile.stud_name}</p>
          </div>
        </div>
        {
          this.state.display_form ? 
          <ProjectForm/>:<button className="btn btn-info" onClick={this.handleClick}>Add Project</button>
        }
      </div>
    );
  }
}

export default App;
