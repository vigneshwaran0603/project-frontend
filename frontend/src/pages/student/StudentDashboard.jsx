import { Link } from "react-router-dom";

export default function StudentDashboard() {

  const storedUser = localStorage.getItem("user");

  let studentName = "Student";

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);
      studentName =
        user?.name ||
        user?.studentName ||
        user?.fullName ||
        user?.username ||
        "Student";
    } catch (error) {
      studentName = "Student";
    }
  }

  return (

    <div className="min-h-screen bg-green-50 p-6 md:p-10">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-4">

        <h1 className="text-3xl font-bold text-green-700">
          🎓 Student Dashboard
        </h1>

        <div className="bg-white px-5 py-2 rounded-lg shadow">
          <span className="text-gray-600">Logged in as </span>
          <span className="font-semibold text-green-700">
            {studentName}
          </span>
        </div>

      </div>


      {/* Dashboard Cards */}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Attendance */}

        <Link to="/student/studentattendancepage">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">

            <div className="text-3xl mb-3">📊</div>

            <h2 className="text-xl font-semibold text-green-700">
              View Attendance
            </h2>

            <p className="text-gray-600 mt-2">
              Check your attendance percentage
            </p>

          </div>

        </Link>


        {/* Subjects */}

        <Link to="/student/studentsubjectspage">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">

            <div className="text-3xl mb-3">📚</div>

            <h2 className="text-xl font-semibold text-green-700">
              View Subjects
            </h2>

            <p className="text-gray-600 mt-2">
              View subjects assigned to you
            </p>

          </div>

        </Link>


        {/* Fees */}

        <Link to="/student/studentfeepaymentpage">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">

            <div className="text-3xl mb-3">💳</div>

            <h2 className="text-xl font-semibold text-green-700">
              Pay Fees
            </h2>

            <p className="text-gray-600 mt-2">
              Pay semester fees using Stripe
            </p>

          </div>

        </Link>


        {/* Hall Ticket */}

        <Link to="/student/hallticketpage">

          <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl hover:scale-105 transition duration-300 cursor-pointer">

            <div className="text-3xl mb-3">🎫</div>

            <h2 className="text-xl font-semibold text-green-700">
              Download Hall Ticket
            </h2>

            <p className="text-gray-600 mt-2">
              Download your exam hall ticket
            </p>

          </div>

        </Link>

      </div>

    </div>

  );

}