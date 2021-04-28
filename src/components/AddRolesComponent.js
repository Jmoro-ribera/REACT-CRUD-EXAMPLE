import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import axios from 'axios';
import { Link } from 'react-router-dom'

const AddRolesComponent = () => {
    const [form, setForm] = useState({
        id: 28,
        nombreRol: ''
        })

    const [roles, setRol] = useState([])

    const handleFormChange = (event) => {
        setForm({ ...form, [event.target.id]: event.target.value })
    }

    const saveRol = (event) => {
        event.preventDefault();
        axios.post("api/roles", form)
            .then(response => {
                if (response.data!=null) {
                    clearForm()
                    console.log("conseguido")
                }
            })
        
    }
    const getRoles = ()=>{
        axios.get("/api/roles")
            .then(resp=>{
                setRol(resp.data)
            })
    }

    const getLastId = () =>{
        getRoles()
        console.log(roles)
        console.log(roles[roles.length-1].id)
        const id = roles[roles.length-1].id
        console.log(id)
        return id
    }

    const clearForm = () => {
        const newForm = {
            id: 29,
            nombreRol: ''
        }

        setForm(newForm)

    }

    return (
        <div>
            <h4>Añadir nuevo Rol</h4><br />
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Nombre Rol</label>
                    <div className="col-sm-4">
                        <input id="nombreRol" type="text" className="form-control" placeholder="Nombre Rol"
                            onChange={handleFormChange} value={form.nombreRol}/>
                    </div>
                </div>
            </form>
            <div className="col-sm-6">

                <button className={classnames('btn', 'btn-primary', 'float-right', 'mx-1')}
                    onClick={saveRol}>Guardar</button>
                <Link to="/roles">
                    <button className={classnames('btn', 'btn-secondary', 'float-right')}>Back</button>
                </Link>
            </div>
        </div >
    )
}

export default AddRolesComponent