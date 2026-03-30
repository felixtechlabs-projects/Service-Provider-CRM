import './App.css'
import 'flowbite';

import GetStarted from './components/GetStarted'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import CustomerHome from './components/CustomerHome'
import Slots from './components/Slots'
import AddSlot from './components/AddSlot'
import { Navigate } from 'react-router-dom'
import Header from './components/Header'
import MyBooking from './components/MyBooking'
import AddReview from './components/AddReview'
import Dashboard from './components/Dashboard'

// inner Component
const RootRedirect = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // boolean
  const type = localStorage.getItem("userType");

  if(!isAuthenticated) {
    return (<GetStarted />);
  }

  return (type === 'service-provider' ? <Navigate to="/add-slot" /> : <Navigate to="/home" />)
}

function App() {
  return (
    <Router>
      <div className='w-full h-full'>
        <Header />
          <button type="button" className="text-white bg-success box-border border border-transparent hover:bg-success-strong focus:ring-4 focus:ring-success-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">Success</button>
      <Routes>
        <Route path='/' element={<RootRedirect />} />
        <Route path='signup' element={<Signup />} />
        <Route path='signin' element={<Signin />} />
        <Route path='home' element={<CustomerHome />} />
        <Route path='add-slot' element={<AddSlot />} />
        <Route path='bookings' element={<MyBooking />} />
        <Route path='slots/:id' element={<Slots />} />
        <Route path='review/:id' element={<AddReview />} />
        <Route path='dashboard' element={<Dashboard />} />
      </Routes>
    </div>
    </Router>
  )
}

export default App
/**
 * 1) header -> Logout / Login
 * 2) logged in => customer -> home, sp => add slot
 * 3) sp => slots => booked 
 * 4) add reviews
 */