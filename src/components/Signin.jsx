import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signinServiceProvider } from '../services/serviceProvider.service'
import { signinCustomer } from '../services/customer.service'

const Signin = () => {
    const [user, setUser] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const type = localStorage.getItem("userType");
        localStorage.setItem("isAuthenticated", "true");
        
        // navigate
        if(type == "service-provider") {
            await signinServiceProvider(user.email, user.password);
            navigate("/add-slot");
        } else if(type == "customer") {
            await signinCustomer(user.email, user.password);
            navigate("/home");
        }
    }
    return (
        <div className='m-3 flex flex-col justify-center items-center w-full h-full'>
            <form onSubmit={(e) => handleSubmit(e)} className='w-1/2 flex flex-col justify-center items-center'>
                <label htmlFor=""> Enter Email: </label> <br />
                <input type="email" className='border p-2 w-1/2 border-gray-300' placeholder='abc@gmail.com'
                    value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <br />

                <label htmlFor=""> Enter Password: </label> <br />
                <input type="password" className='border p-2 w-1/2 border-gray-300' placeholder='abcd@123' required
                    value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <br />

                <button className='border p-2 m-3 w-1/2'> Submit </button>
            </form>
            <Link className="text-blue-600" to={"/signup"}> Register here </Link>
        </div>
    )
}

export default Signin