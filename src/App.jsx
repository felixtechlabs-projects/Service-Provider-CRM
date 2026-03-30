import 'flowbite';

import GetStarted from './components/GetStarted'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Signup from './components/Signup'
import Signin from './components/Signin'
import CustomerHome from './components/CustomerHome'
import Slots from './components/Slots'
import AddSlot from './components/AddSlot'
import Header from './components/Header'
import MyBooking from './components/MyBooking'
import AddReview from './components/AddReview'
import Dashboard from './components/Dashboard'

const RootRedirect = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const type = localStorage.getItem("userType");

  if (!isAuthenticated) {
    return <GetStarted />;
  }

  return type === 'service-provider' ? <Navigate to="/add-slot" /> : <Navigate to="/home" />;
};

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen bg-gray-50 flex flex-col">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<RootRedirect />} />
            <Route path="signup" element={<Signup />} />
            <Route path="signin" element={<Signin />} />
            <Route path="home" element={<CustomerHome />} />
            <Route path="add-slot" element={<AddSlot />} />
            <Route path="bookings" element={<MyBooking />} />
            <Route path="slots/:id" element={<Slots />} />
            <Route path="review/:id" element={<AddReview />} />
            <Route path="dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;