import { Link } from "react-router-dom";
import {
Users,
ClipboardCheck,
FileText,
BookOpen,
CreditCard
} from "lucide-react";

export default function StaffDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-10">

      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-green-700">
        Staff Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Student Management */}

        <Link
          to="/staffdashboard/studentmanagement"
          className="bg-white p-6 shadow-lg rounded-2xl flex items-center justify-between hover:shadow-xl hover:scale-105 transition"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Student Management
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage student records
            </p>
          </div>

          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <Users size={26}/>
          </div>
        </Link>


        {/* Attendance */}

        <Link
          to="/staffdashboard/attendancemanagement"
          className="bg-white p-6 shadow-lg rounded-2xl flex items-center justify-between hover:shadow-xl hover:scale-105 transition"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Attendance
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Track student attendance
            </p>
          </div>

          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <ClipboardCheck size={26}/>
          </div>
        </Link>


        {/* Application Status */}

        <Link
          to="/staffdashboard/applicationstatus"
          className="bg-white p-6 shadow-lg rounded-2xl flex items-center justify-between hover:shadow-xl hover:scale-105 transition"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Application Status
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Review student applications
            </p>
          </div>

          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <FileText size={26}/>
          </div>
        </Link>


        {/* Subjects */}

        <Link
          to="/staffdashboard/addsubjects"
          className="bg-white p-6 shadow-lg rounded-2xl flex items-center justify-between hover:shadow-xl hover:scale-105 transition"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Subjects
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Manage subjects
            </p>
          </div>

          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <BookOpen size={26}/>
          </div>
        </Link>


        {/* Exam Payments */}

        <Link
          to="/staffdashboard/paymentstatus"
          className="bg-white p-6 shadow-lg rounded-2xl flex items-center justify-between hover:shadow-xl hover:scale-105 transition"
        >
          <div>
            <h2 className="text-xl font-semibold text-gray-700">
              Exam Payments
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              View payment status
            </p>
          </div>

          <div className="bg-green-100 text-green-600 p-3 rounded-xl">
            <CreditCard size={26}/>
          </div>
        </Link>

      </div>
    </div>
  );
}