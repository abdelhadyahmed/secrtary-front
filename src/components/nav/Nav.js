import React from 'react'
import './Nav.css'
import { NavLink} from 'react-router-dom'

function Nav() {
    return (
        <div className='navbar'>
            <div className='container'>
                <p className='logo'>سكرتارية القائد</p>
                <ul>
                    <NavLink to="/manager">صفحة زوار القائد</NavLink>
                    <NavLink to="/secrtary">السكرتارية</NavLink>
                </ul>
            </div>
        </div>
    )
}

export default Nav
