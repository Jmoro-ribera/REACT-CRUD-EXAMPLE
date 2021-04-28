import React from 'react'
import classNames from 'classnames'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav id="myNavBar" className={classNames('navbar', 'navbar-expand-lg', 'navbar-light', 'bg-light')}>
            <button className={classNames('navbar-toggler')} type="button" data-toggle="collapse"
                data-target="#myNavbar" aria-controls="myNavbar"
                aria-expanded="false" aria-label="Toggle navigation">
                <span className={classNames('navbar-toggler-icon')}></span>
            </button>
            <div className={classNames('collapse', 'navbar-collapse')} id="myNavbar">
                <div className={classNames('navbar-nav', 'navbar-center')} >
                    <NavLink to="/usuarios" activeClassName='is-active'><a className={classNames('nav-item', 'nav-link')}>Usuarios</a></NavLink>
                    <NavLink to="/roles" activeClassName='is-active'><a className={classNames('nav-item', 'nav-link')}>Roles</a></NavLink>
                </div>
            </div>
        </nav>
    )
}
export default Navbar