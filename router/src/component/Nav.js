import React from 'react'
import './Nav.css'
import {Link, NavLink} from 'react-router-dom'

function Nav() {
    return (
        <div className='navbar'>
            <div className='container'>
                <Link to="/" className='logo'>Logo</Link>
                <ul>
                    <NavLink exact to="/">Home</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/blog">Blog</NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Nav
