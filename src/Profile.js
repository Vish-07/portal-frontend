import React from 'react'

import { Link } from "react-router-dom";


function Profile() {
    return (
        <div className="container">

            <Link to="/project">
                <button className="btn btn-success" >Add Project</button>
            </Link>
            <Link to="/internship">
                <button className="btn btn-success" >Add Internship</button>
            </Link>
        </div>
    )
}

export default Profile
