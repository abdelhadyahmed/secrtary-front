import React from 'react'
import './Nav.css'
// import { NavLink} from 'react-router-dom'
import primLogo from '../../images/primLogo.png'

function Nav() {
    return (
        <div className='navbar'>
            <div className='container'>
                <div className='navContainer'>
                    <p className='logo'>سكرتارية القائد</p>
                    <div className="img">
                        <img src={primLogo} alt='KonozmasrLogo'/>   
                    </div>
                </div>
                
                {/* <ul>
                    <NavLink to="/manager">صفحة زوار القائد</NavLink>
                    <NavLink to="/secrtary">السكرتارية</NavLink>
                </ul> */}
            </div>
        </div>
    )
}

export default Nav
