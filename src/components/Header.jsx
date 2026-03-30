import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
    const isAuthenticated = localStorage.getItem("isAuthenticated");
    const type = localStorage.getItem("userType");
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    }
  return (
    <header className='w-full h-16 bg-slate-900 text-white shadow-lg flex justify-between px-4 items-center'>
        <Link className='text-xl font-bold' to={type === "service-provider" ? "/add-slot" : "/home"}>
            Service Provider CRM 
        </Link>
        <nav className='flex gap-6 items-center'>
            { type === "customer" && (
                <>
                <Link to={"/home"}> Browse Slots</Link>
                <Link to={"/bookings"}> My Bookings </Link>
                </>
            )}

            {
                type === "service-provider" && (
                    <>
                        <Link to={"/add-slot"} > Add New Slot </Link>
                        <Link to={"/dashboard"}> Dashboard </Link>
                    </>
                )
            }

            {
                isAuthenticated && (
                    <button
                    onClick={handleLogout}
                    className='m-3 p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium'
                    >
                        Logout 
                    </button>
                )
            }
        </nav>
    </header>
  )
}

export default Header