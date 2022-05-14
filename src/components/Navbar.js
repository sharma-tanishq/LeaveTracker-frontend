import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
    let navigate = useNavigate();

    return (
        <div>
            <header className="text-gray-600 body-font">
                <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                    <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                        <span className="ml-3 text-xl text-indigo-500">LeaveTracker</span>
                    </a>
                    <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
                        <Link to="/" className="mr-5 hover:text-gray-900">Home</Link>
                        <Link to="/login" className="mr-5 hover:text-gray-900">Log In </Link>
                        <Link to="/signup"  className="mr-5 hover:text-gray-900">Sign Up</Link>
                    </nav>
                </div>
            </header>
        </div>
    )

}
export default Navbar