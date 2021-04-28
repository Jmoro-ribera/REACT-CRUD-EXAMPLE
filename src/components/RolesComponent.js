import React, { useState, useEffect } from 'react';
import axios from 'axios';
import classnames from 'classnames'
import { Link } from 'react-router-dom'


const RolesComponent = ()=> {
    const [roles, setRoles] = useState([]);
    
    useEffect(() => {
        axios.get("/api/roles")
            .then(response => {
                setRoles(response.data)
                console.log(roles)
            })
    }, []);

    return (

        <div>
            <h4>Roles</h4>
            <Link to="/add-edit-rol">
                <button className={classnames('btn', 'btn-success', 'float-right')}>Añade un nuevo rol</button>
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Rol</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        roles.map(u => (
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.nombreRol}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default RolesComponent