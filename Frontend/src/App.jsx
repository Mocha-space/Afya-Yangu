import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Doctors from "./Pages/Doctors.jsx";
import Login from "./Pages/Login.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";
import MyProfile from "./Pages/MyProfile.jsx";
import MyAppointments from "./Pages/MyAppointments.jsx";
import Appointment from "./Pages/Appointment.jsx";
import Navbar from "./Components/Navbar.jsx";
import Footer from "./Components/Footer.jsx";
import Register from "./Pages/Register.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx"; // A custom ProtectedRoute component
import AdminLogin from "./Pages/AdminLogin.jsx";
import AdminDashboard from "./Pages/AdminDashboard.jsx";

function App() {
  return (
    <div className="app">
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Protected Route */}
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute adminOnly={true}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
