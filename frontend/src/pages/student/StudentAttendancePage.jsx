import { useEffect, useState } from "react";

const API = "https://project-backend-cgtf.onrender.com";

export default function StudentAttendancePage() {

  const [attendance, setAttendance] = useState(null);

  const token = localStorage.getItem("token");
  const studentId = localStorage.getItem("userId");

  const fetchAttendance = async () => {

    try {

      const res = await fetch(
        `${API}/attendance/percentage/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      if (res.ok) {
        setAttendance(data.data);
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.error("Attendance error:", err);
    }

  };

  useEffect(() => {
    fetchAttendance();
  }, []);


  const getStatus = (percentage) => {
    if (percentage >= 75) return { text: "Good", color: "text-green-600" };
    if (percentage >= 60) return { text: "Warning", color: "text-yellow-600" };
    return { text: "Low Attendance", color: "text-red-600" };
  };


  return (

    <div className="min-h-screen bg-green-50 flex items-center justify-center p-6">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-2xl font-bold text-green-700 mb-6 text-center">
          📊 Attendance Percentage
        </h1>

        {!attendance ? (

          <p className="text-center text-gray-500">
            Loading attendance...
          </p>

        ) : (

          <>

            <div className="text-center mb-6">

              <p className="text-lg text-gray-600">
                Your Attendance
              </p>

              <p className="text-4xl font-bold text-green-700">
                {attendance.percentage}%
              </p>

              <p className={`mt-2 font-semibold ${getStatus(attendance.percentage).color}`}>
                {getStatus(attendance.percentage).text}
              </p>

            </div>


            {/* Progress Bar */}

            <div className="w-full bg-gray-200 h-5 rounded-full overflow-hidden">

              <div
                className="bg-green-500 h-5 rounded-full transition-all duration-700"
                style={{ width: `${attendance.percentage}%` }}
              ></div>

            </div>


            {/* Info Section */}

            <div className="mt-6 text-sm text-gray-500 text-center">
              Minimum attendance required for exams: <b>75%</b>
            </div>

          </>

        )}

      </div>

    </div>

  );

}



