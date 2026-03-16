import { useState } from "react";
import {
Users,
CheckCircle,
XCircle,
AlertTriangle
} from "lucide-react";

export default function AttendanceManagement() {

  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [date, setDate] = useState("");

  const [percentages, setPercentages] = useState({});
  const [selectedStudent, setSelectedStudent] = useState(null);

  const [dashboard, setDashboard] = useState({
    total: 0,
    present: 0,
    absent: 0,
    lowAttendance: 0
  });

  const token = localStorage.getItem("token");

  const loadStudents = async () => {

    if (!department || !year || !semester) {
      alert("Select department, year and semester");
      return;
    }

    const res = await fetch(
      `https://project-backend-kvv2.onrender.com/attendance/students?department=${department}&year=${Number(year)}&semester=${Number(semester)}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const result = await res.json();
    const list = result.data || [];

    setStudents(list);

    setDashboard(prev => ({
      ...prev,
      total: list.length
    }));

    await Promise.all(list.map(student => fetchAttendancePercentage(student)));
  };

  const fetchAttendancePercentage = async (student) => {

    try {

      const res = await fetch(
        `https://project-backend-kvv2.onrender.com/attendance/percentage/${student._id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const result = await res.json();
      const percent = result?.data?.percentage || 0;

      setPercentages(prev => {

        const updated = {
          ...prev,
          [student._id]: percent
        };

        const lowCount = Object.values(updated).filter(p => p < 75).length;

        setDashboard(d => ({
          ...d,
          lowAttendance: lowCount
        }));

        return updated;
      });

    } catch (err) {
      console.log(err);
    }

  };

  const markAttendance = (id, status) => {

    setAttendance(prev => ({
      ...prev,
      [id]: status
    }));

  };

  const markAllPresent = () => {

    const all = {};
    students.forEach(s => (all[s._id] = "present"));

    setAttendance(all);

  };

  const markAllAbsent = () => {

    const all = {};
    students.forEach(s => (all[s._id] = "absent"));

    setAttendance(all);

  };

  const submitAttendance = async () => {

    if (!date) {
      alert("Select attendance date");
      return;
    }

    const records = students.map(s => ({
      studentId: s._id,
      status: attendance[s._id] || "absent"
    }));

    const body = {
      department,
      year: Number(year),
      semester: Number(semester),
      date,
      records
    };

    try {

      const res = await fetch(
        "https://project-backend-kvv2.onrender.com/attendance/mark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(body)
        }
      );

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "Attendance failed");
        return;
      }

      const presentCount = records.filter(r => r.status === "present").length;
      const absentCount = records.length - presentCount;

      setDashboard(prev => ({
        ...prev,
        present: presentCount,
        absent: absentCount
      }));

      alert("Attendance saved successfully");

      setAttendance({});

      students.forEach(fetchAttendancePercentage);

    } catch (error) {

      console.log(error);
      alert("Error saving attendance");

    }

  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-10">

      <h1 className="text-3xl font-bold text-green-700 mb-8">
        Attendance Management
      </h1>


      {/* DASHBOARD */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-gray-500">Total Students</p>
            <p className="text-2xl font-bold">{dashboard.total}</p>
          </div>
          <Users className="text-green-600"/>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-green-600">Present</p>
            <p className="text-2xl font-bold">{dashboard.present}</p>
          </div>
          <CheckCircle className="text-green-600"/>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-red-600">Absent</p>
            <p className="text-2xl font-bold">{dashboard.absent}</p>
          </div>
          <XCircle className="text-red-600"/>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6 flex items-center justify-between">
          <div>
            <p className="text-yellow-600">Low Attendance</p>
            <p className="text-2xl font-bold">{dashboard.lowAttendance}</p>
          </div>
          <AlertTriangle className="text-yellow-600"/>
        </div>

      </div>


      {/* FILTERS */}

      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-wrap gap-4 mb-8">

        <select className="border p-2 rounded" onChange={(e)=>setDepartment(e.target.value)}>
          <option value="">Department</option>
          <option value="CS">CS</option>
          <option value="IT">IT</option>
          <option value="ECE">ECE</option>
        </select>

        <select className="border p-2 rounded" onChange={(e)=>setYear(e.target.value)}>
          <option value="">Year</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>

        <select className="border p-2 rounded" onChange={(e)=>setSemester(e.target.value)}>
          <option value="">Semester</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>

        <input
          type="date"
          className="border p-2 rounded"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />

        <button
          onClick={loadStudents}
          className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
        >
          Load Students
        </button>

      </div>


      {/* ATTENDANCE TABLE */}

      {students.length > 0 && (

        <div className="bg-white shadow-lg rounded-xl p-6 overflow-x-auto">

          <div className="flex gap-4 mb-5">

            <button
              onClick={markAllPresent}
              className="bg-green-600 text-white px-4 py-2 rounded-lg"
            >
              Mark All Present
            </button>

            <button
              onClick={markAllAbsent}
              className="bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Mark All Absent
            </button>

          </div>

          <table className="w-full">

            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Student</th>
                <th className="p-3">Present</th>
                <th className="p-3">Absent</th>
                <th className="p-3">Attendance %</th>
              </tr>
            </thead>

            <tbody>

              {students.map((s) => {

                const percent = percentages[s._id] || 0;

                return (

                  <tr key={s._id} className="border-b hover:bg-green-50">

                    <td className="p-3">{s.name}</td>

                    <td className="text-center">
                      <input
                        type="radio"
                        name={s._id}
                        checked={attendance[s._id] === "present"}
                        onChange={()=>markAttendance(s._id,"present")}
                      />
                    </td>

                    <td className="text-center">
                      <input
                        type="radio"
                        name={s._id}
                        checked={attendance[s._id] === "absent"}
                        onChange={()=>markAttendance(s._id,"absent")}
                      />
                    </td>

                    <td className="p-3">

                      <div className="w-full bg-gray-200 h-3 rounded">

                        <div
                          className={`h-3 rounded ${percent < 75 ? "bg-red-500" : "bg-green-500"}`}
                          style={{ width: `${percent}%` }}
                        />

                      </div>

                      <span className="text-sm ml-2">{percent}%</span>

                    </td>

                  </tr>

                );

              })}

            </tbody>

          </table>

          <button
            onClick={submitAttendance}
            className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
          >
            Submit Attendance
          </button>

        </div>

      )}

    </div>

  );

}