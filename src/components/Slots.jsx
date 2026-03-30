import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchSlotsForId } from '../services/serviceProvider.service';
import { bookASlot } from '../services/customer.service';

const Slots = () => {
    const params = useParams();
    const [slots, setSlots] = useState([]);

    const fetchSlots = async() => {
        try {
            const arr = await fetchSlotsForId(params.id);
            setSlots(arr);
            
        } catch(error) {
            console.log(error);
        }
    }

    const bookSlotByCustomer = async(id) => {
        try {
            
            await bookASlot(id);
            alert("Slot booked");
        } catch(error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchSlots();
    }, [])
  return (
    <div className='h-full w-full m-3'>
         <h2 className='text-3xl font-bold text-center'> Slots </h2>
        <table>
            <thead>
                <tr>
                    <th> Sr.No. </th>
                    <th> Date </th>
                    <th> Start Time </th>
                    <th> End Time </th>
                    <th> Action </th>
                </tr>
            </thead>
            <tbody>
                {
                    slots.length > 0 ? (
                        slots.map((slot, index) => (
                            <tr key={slot.id}>
                                <td> { index + 1 } </td>
                                <td> { new Date(slot.date).toDateString() } </td>
                                <td> { slot.startTime } </td>
                                <td> { slot.endTime }</td>
                                <td>
                                    {slot.isBooked ? ("Booked") : (<button className='border p-2 m-3' onClick={() => bookSlotByCustomer(slot.id)}> Book </button>)}
                                    
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <th> No slots available  </th>
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
  )
}

export default Slots