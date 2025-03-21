import React from 'react'
import { NavLink } from 'react-router-dom'
import './Style.css'

const Navbar = () => {
    return (
        <div className='nav'>
            <NavLink
                to='/'
            >
                Home
            </NavLink>

            <NavLink
                to='/pastes'
            >
                Paste
            </NavLink>
        </div>
    )
}

export default Navbar
