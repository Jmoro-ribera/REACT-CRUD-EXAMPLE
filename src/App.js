import React from 'react'
import Navbar from './Navbar'
import './App.css'
import { BrowserRouter as Router, Route } from "react-router-dom"
import UserComponent from './components/UserComponent'
import RolesComponent from './components/RolesComponent'
import AddUserComponent from './components/AddUserComponent'
import AddRolesComponent from './components/AddRolesComponent'


function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <Route path="/" exact component={UserComponent} />
        <Route path="/usuarios/" component={UserComponent} />
        <Route path="/roles/" component={RolesComponent} />
        <Route path="/add-edit-user/:id?" component={AddUserComponent} />
        <Route path="/add-edit-rol/" component={AddRolesComponent} />
      </div>
    </Router>
  );
}
export default App;