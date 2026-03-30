import React, { useEffect, useState } from 'react'
import { fetchAllServiceProviders } from '../services/serviceProvider.service';
import { Link } from 'react-router-dom';

const CustomerHome = () => {
    const [spArray, setSpArray] = useState([]);

    const fetchSPs = async () => {
        try {
            const arr = await fetchAllServiceProviders();
            setSpArray(arr);
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSPs();
    }, []);

  return (
    <div className='h-full w-full m-3'>
        <h2 className='text-3xl font-bold text-center'> Service Providers </h2>
        <table>
            <thead>
                <tr>
                    <th> Sr.No. </th>
                    <th> Name </th>
                    <th> Role </th>
                    <th> Action </th>
                </tr>
            </thead>
            <tbody>
                {
                    spArray.length > 0 ? (
                        spArray.map((sp, index) => (
                            <tr key={sp.id}>
                                <td> { index + 1 } </td>
                                <td> { sp.name } </td>
                                <td> { sp.role }</td>
                                <td>
                                    <Link className='border p-2 m-3' to={"/slots/"+sp.id}> View </Link>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <th> No Service Providers </th>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default CustomerHome