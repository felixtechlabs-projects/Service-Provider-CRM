import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addServiceProvider } from '../services/serviceProvider.service'
import { addCustomer } from '../services/customer.service'

const Signup = () => {
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        area: "",
        contact: ""
    })
    const type = localStorage.getItem("userType");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (type == "service-provider") {
            await addServiceProvider(user);
        } else if (type == "customer") {
            await addCustomer(user);
        }

        navigate("/signin");

    }
    return (
        <div className='m-3 flex flex-col justify-center items-center w-full h-full'>
            <form onSubmit={(e) => handleSubmit(e)} className='w-1/2 flex flex-col justify-center items-center'>
                <label htmlFor=""> Enter Full Name: </label> <br />
                <input type="text" className='border p-2 w-1/2 border-gray-300' placeholder='abc pqr'
                    value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })}
                />
                <br />

                <label htmlFor=""> Enter Email: </label> <br />
                <input type="email" className='border p-2 w-1/2 border-gray-300' placeholder='abc@gmail.com'
                    value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <br />

                <label htmlFor=""> Enter Area: </label> <br />
                <input type="text" className='border p-2 w-1/2 border-gray-300' placeholder='Kothrud'
                    value={user.area} onChange={(e) => setUser({ ...user, area: e.target.value })}
                />
                <br />

                <label htmlFor=""> Enter Contact Number: </label> <br />
                <input type="tel" className='border p-2 w-1/2 border-gray-300' placeholder='989878768' minLength={10} maxLength={10}
                    value={user.contact} onChange={(e) => setUser({ ...user, contact: e.target.value })}
                />
                <br />
                {
                    type == "service-provider" && (<><label htmlFor=""> Enter Role: </label> <br />
                        <input type="text" className='border p-2 w-1/2 border-gray-300' placeholder='Electrician' required
                            value={user.role} onChange={(e) => setUser({ ...user, role: e.target.value })}
                        />
                        <br /> </>)
                }


                <label htmlFor=""> Enter Password: </label> <br />
                <input type="password" className='border p-2 w-1/2 border-gray-300' placeholder='abcd@123' required
                    value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <br />

                <button className='border p-2 m-3 w-1/2'> Submit </button>
            </form>
            <Link className="text-blue-600" to={"/signin"}> Signin here </Link>
        </div>
    )
}

export default Signup