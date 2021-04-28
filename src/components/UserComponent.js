import React, { useState, useEffect, Component } from 'react';
import axios from 'axios';
import classnames from 'classnames'
import { Link } from 'react-router-dom'


const UserComponent = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [roles, setRoles] = useState([]);
    useEffect(async () => {
        const resp = await axios.get("/api/usuarios")
        setUsuarios(resp.data)  
    }, []);

    useEffect(async () => {
        const resp = await axios.get("/api/roles")
        setRoles(resp.data)        
    }, []);



    const getRol = (id) =>{
        var res
        axios.get("/api/roles/"+id)
                .then(response=>{
                    res = response.data.nombreRol
                    console.log(res)
                })

        return res
    }

    const deleteUser = async (id) =>{
        const resp = await axios.delete("/api/usuarios/"+ id)
        console.log(resp.data)
        const resp2 = await axios.get("/api/usuarios")
        setUsuarios(resp2.data)
    }

    const getRoll = (id) => {
        var l
        roles.forEach(r =>{
            if (r.id === id){
                l = r.nombreRol
            }
        })
        return l
    }

    const suma = (x,y)=>{
        return x+y
    }


    return (

        <div>
            <h4>Usuarios</h4>
            <Link to="/add-edit-user">
                <button className={classnames('btn', 'btn-success', 'float-right')}>Añade un nuevo usuario</button>
            </Link>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Email</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Editar usuario</th>
                        <th scope="col">Eliminar usuario</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        usuarios.map(u =>(
                            
                            <tr key={u.id}>
                                <td>{u.id}</td>
                                <td>{u.nombre}</td>
                                <td>{u.apellido}</td>
                                <td>{u.email}</td>
                                <td>{u.idRol.nombreRol}</td>
                                <td>
                                    <Link to={'/add-edit-user/' + u.id}>
                                        <button className={classnames('btn', 'btn-sm', 'btn-info')}>Editar</button>
                                    </Link>
                                </td>
                                <td>
                                        <button className={classnames('btn', 'btn-sm', 'btn-danger')} onClick={() => deleteUser(u.id)}>Eliminar</button>                                    
                                </td>

                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
export default UserComponent