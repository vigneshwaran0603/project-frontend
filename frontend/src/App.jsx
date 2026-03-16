
import { BrowserRouter as Router ,Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home.jsx";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import Application from "./pages/Application.jsx";
import Login from "./pages/Login.jsx";
import StaffDashboard from "./pages/staffdashboard/StaffDashboard.jsx";
import StudentManagement from "./pages/staffdashboard/StudentManagement.jsx";
import AttendanceManagement from "./pages/staffdashboard/AttendanceManagement.jsx";
import ApplicationStatus from "./pages/staffdashboard/ApplicationStatus.jsx";
import ViewApplicationStatus from "./pages/ViewApplicationStatus.jsx";
import AddSubjects from "./pages/staffdashboard/AddSubjects.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";
import AddStaff from "./pages/admin/AddStaff.jsx";
import FeeStructurePage from "./pages/admin/FeeStructurePage.jsx";
import StudentDashboard from "./pages/student/StudentDashboard.jsx";
import StudentSubjectsPage from "./pages/student/StudentSubjectsPage.jsx";
import StudentAttendancePage from "./pages/student/StudentAttendancePage.jsx";
import StudentFeesPaymentPage from "./pages/student/StudentFeePaymentPage.jsx";
import PaymentStatus from "./pages/staffdashboard/PaymentStatus.jsx";
import HallticketPage from "./pages/student/HallticketPage.jsx";
import ViewStudents from "./pages/admin/ViewStudents.jsx";
import StudentProfile from "./pages/admin/StudentProfile.jsx";
import Statistics from "./pages/admin/Statistics.jsx";

function App() {


  return (
    <Router>

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/application" element={<Application />} />
        <Route path="/viewapplicationstatus" element={<ViewApplicationStatus />} />
        <Route path="/login" element={<Login />} />

        {/* <Route path="/staff-register" element={<StaffRegister />} />
        <Route path="student-register" element={<StudentRegister />} /> */}
        <Route path="/staffdashboard/staffdashboard" element={<StaffDashboard />} />
        <Route path="/staffdashboard/studentmanagement" element={<StudentManagement />} />
        <Route path="/staffdashboard/attendancemanagement" element={<AttendanceManagement/>} />
        <Route path="/staffdashboard/applicationstatus" element={<ApplicationStatus/>} />
        <Route path="/staffdashboard/addsubjects" element={<AddSubjects/>} />
        <Route path="/staffdashboard/paymentstatus" element={<PaymentStatus/>} />
          {/* admin dashboard  */}
        <Route path="/admin/admindashboard" element={<AdminDashboard/>} />
        <Route path="/admin/addstaff" element={<AddStaff/>} />
        <Route path="/admin/feestructurepage" element={<FeeStructurePage/>} />
        <Route path="/admin/viewstudents" element={<ViewStudents/>} />
        <Route path="/admin/studentprofile/:registerNo" element={<StudentProfile/>} />
        <Route path="/admin/statistics" element={<Statistics/>} />
        {/* student */}
        <Route path="/student/studentdashboard" element={<StudentDashboard/>} />
        <Route path="/student/studentattendancepage" element={<StudentAttendancePage/>} />
        <Route path="/student/studentsubjectspage" element={<StudentSubjectsPage/>} />
        <Route path="/student/studentfeepaymentpage" element={<StudentFeesPaymentPage/>} />
        <Route path="/student/hallticketpage" element={<HallticketPage/>} />
        
        
        
       

      </Routes>

    </Router>
  );
}

export default App
