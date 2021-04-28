import React, { useState, useEffect } from 'react'
import classnames from 'classnames'
import axios from 'axios';
import { Link } from 'react-router-dom'

const AddUserComponent = (props) => {
    const [form, setForm] = useState({
        id: 0,
        nombre: '',
        apellido: '',
        email: '',
        idRol: { id:0 }
        })
    
    const [pageType, setPagetype] = useState('ADD')

    const [usuarios, setUsuarios] = useState([])
    
    const [id, setId] = useState(0)


    useEffect(async () => {
        const { params } = props.match
        if(params.id) {
            console.log(params.id)
            setPagetype('EDIT')
            try {
                
                const resp = await axios.get('/api/usuarios/' + params.id)
                setForm(resp.data)
            } catch (error) {
                console.log('Could not retrive user with id ' + params.id)
            }                  
        }else{
            setForm({
                id: 3,
                nombre: '',
                apellido: '',
                email: '',
                idRol: { id:0 }
            })
        }
    }, [])

    const handleFormChange = (event) => {
        setForm({ ...form, [event.target.id]: event.target.value })
    }

    const handleRoleChange = (event) => {
        setForm({ ...form, idRol: { ...form.idRol, [event.target.id]: event.target.value } })
    }

    const getUsers =()=>{
        axios.get("/api/usuarios")
            .then(resp=>{
                setUsuarios(resp.data)
            })
    }

    const getLastId = () =>{
        
        console.log(usuarios)
        console.log(usuarios[usuarios.length-1])
        const id = usuarios[usuarios.length-1].id
        console.log(id)
        setId(id)
    }

    const saveUser = async (event) => {
        event.preventDefault();
        console.log(form)
        if (pageType == 'ADD') {
            const resp = await axios.post("/api/usuarios", form)
            console.log(resp.data)
            clearForm()
        } else {
            const { params } = props.match
            const resp = await axios.put("/api/usuarios/"+params.id, form)
            console.log(resp.data)
        }
        
    }

    const clearForm = () => {
        const newForm = {
            id: 0,
            nombre: '',
            apellido: '',
            email: '',
            idRol: { id:0 }
        
        }

        setForm(newForm)

    }

    return (
        <div>
            {pageType === 'ADD' && <h4>Añadir nuevo usuario</h4>}
            {pageType === 'EDIT' && <h4>Editar usuario</h4>}
            <form>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Nombre</label>
                    <div className="col-sm-4">
                        <input id="nombre" type="text" className="form-control" placeholder="Nombre"
                            onChange={handleFormChange} value={form.nombre}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Apellido</label>
                    <div className="col-sm-4">
                        <input id="apellido" type="text" className="form-control" placeholder="Apellido"
                            onChange={handleFormChange} value={form.apellido}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-4">
                        <input id="email" type="text" className="form-control" placeholder="Email"
                            onChange={handleFormChange} value={form.email}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label className="col-sm-2 col-form-label">Rol</label>
                    <div className="col-sm-4">
                        <input id="id" type="number" className="form-control" placeholder="Rol id"
                            onChange={handleRoleChange} value={form.idRol.id}/>
                    </div>
                </div>
            </form>
            <div className="col-sm-6">
                <Link to="/usuarios">
                <button className={classnames('btn', 'btn-primary', 'float-right', 'mx-1')}
                    onClick={saveUser}>Guardar</button>
                </Link>
                <Link to="/usuarios">
                    <button className={classnames('btn', 'btn-secondary', 'float-right')}>Back</button>
                </Link>
            </div>
        </div >
    )
}

export default AddUserComponent