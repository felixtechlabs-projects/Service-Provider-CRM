import React from 'react'
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {
    const navigate = useNavigate();
    const clickUser = (type) => {
        localStorage.setItem("userType", type);
        navigate("/signin");
    }

  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
        <h3 className='text-3xl font-bold'> Welcome to Service Provider CRM </h3>
        <h5 className='text-xl text-gray-400'> Are you a .......?</h5>
        <div className='flex justify-around w-1/2'>
            <div className='w-70 h-70 shadow border border-gray-600 flex justify-center items-center'> 
                <button className='text-2xl font-bold ' onClick={() => clickUser('service-provider')}> Service Provider </button>    
             </div>
            <div className='w-70 h-70 shadow border border-gray-600 flex justify-center items-center'>
                <button className='text-2xl font-bold ' onClick={() => clickUser('customer')}> Customer </button>
             </div>
        </div>
    </div>
  )
}

export default GetStarted