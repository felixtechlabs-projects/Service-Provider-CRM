import React, { useState } from 'react'
import { addSlot } from '../services/serviceProvider.service';

const AddSlot = () => {
    const [slotDate, setSlotDate] = useState({
        date: Date(),
        startTime: "",
        endTime: "",
        isBooked: false
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(slotDate);
        try {
            const dateStr = slotDate.date;
            const d = new Date(dateStr);
            slotDate.date = d;
            await addSlot(slotDate);
            alert("Slot added");
            setSlotDate({
                date: "",
                startTime: "",
                endTime: "",
                 isBooked: false
            })
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='h-full w-full m-3'>
            <h3 className='text-2xl font-bold'> Add Slot </h3>
            <form className='m-3 w-1/2' onSubmit={(e) => handleSubmit(e)}>
                <label htmlFor=""> Date: </label>
                <input type="date" className='border w-1/2 p-2 m-3'
                    value={slotDate.date} onChange={(e) => setSlotDate({ ...slotDate, date: e.target.value })}
                /> <br />
                <label htmlFor=""> Start Time: </label>
                <input type="time" className='border w-1/2 p-2 m-3'
                    value={slotDate.startTime} onChange={(e) => setSlotDate({ ...slotDate, startTime: e.target.value })}
                /> <br />
                <label htmlFor=""> End Time: </label>
                <input type="time" className='border w-1/2 p-2 m-3'
                    value={slotDate.endTime} onChange={(e) => setSlotDate({ ...slotDate, endTime: e.target.value })}
                /> <br />
                <button className='p-2 m-3 w-1/2 bg-green-500 text-white'> Submit </button>
            </form>
        </div>
    )
}

export default AddSlot