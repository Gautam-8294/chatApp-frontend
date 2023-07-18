import React from 'react'
import '../style/navbar.css'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='nav_container'>
            <div className='nav_content'>
                <Link to='/'>Home</Link>
                <Link to='/about'>About</Link>
            </div>
        </div>
    )
}

export default Navbar
