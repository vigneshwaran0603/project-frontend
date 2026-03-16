import { useEffect, useState } from "react";
import axios from "axios";
import { Users, CheckCircle, XCircle, BarChart3 } from "lucide-react";

export default function ApplicationStatus() {

  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("All");
  const [seatCount, setSeatCount] = useState("");
  const [loading, setLoading] = useState(true);

  const [selectedCount, setSelectedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);

  // 🔹 Fetch applications
  const fetchApplications = async () => {

    try {

      const res = await axios.get("https://project-backend-kvv2.onrender.com/application");

      const sorted = res.data.sort(
        (a, b) => b.twelthMark - a.twelthMark
      );

      setApplications(sorted);
      setFilteredApplications(sorted);

      const uniqueDepartments = [
        "All",
        ...new Set(sorted.map((app) => app.department)),
      ];

      setDepartments(uniqueDepartments);

      // Dashboard Stats
      const selected = sorted.filter(app => app.status === "Selected").length;
      const rejected = sorted.filter(app => app.status === "Rejected").length;
      const pending = sorted.filter(app => !app.status).length;

      setSelectedCount(selected);
      setRejectedCount(rejected);
      setPendingCount(pending);

      setLoading(false);

    } catch (err) {

      console.error("Error fetching applications", err);
      setLoading(false);

    }

  };

  useEffect(() => {
    fetchApplications();
  }, []);


  // 🔹 Filter department
  const handleDepartmentChange = (dept) => {

    setSelectedDept(dept);

    if (dept === "All") {
      setFilteredApplications(applications);
    } else {

      const filtered = applications.filter(
        (app) => app.department === dept
      );

      setFilteredApplications(filtered);

    }

  };


  // 🔹 Update student status
  const updateStatus = async (applicationNo, status) => {

    try {

      await axios.put(
        `https://project-backend-kvv2.onrender.com/application/${applicationNo}/stat`,
        { status }
      );

      fetchApplications();

    } catch (err) {

      console.error("Status update failed", err);
      alert("Failed to update status");

    }

  };


  // 🔹 Auto select students
  const autoSelectStudents = async () => {

    if (!seatCount || selectedDept === "All") {
      alert("Select department and enter seat count");
      return;
    }

    const deptStudents = applications
      .filter((app) => app.department === selectedDept)
      .sort((a, b) => b.twelthMark - a.twelthMark);

    const seats = parseInt(seatCount);

    for (let i = 0; i < deptStudents.length; i++) {

      const student = deptStudents[i];

      const status = i < seats ? "Selected" : "Rejected";

      try {

        await axios.put(
          `https://project-backend-kvv2.onrender.com/application/${student.applicationNo}/stat`,
          { status }
        );

      } catch (err) {

        console.error("Auto selection failed", err);

      }

    }

    fetchApplications();

    alert("Auto selection completed!");

  };


  if (loading) {

    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold text-green-700">
        Loading Applications...
      </div>
    );

  }


  return (

    <div className="p-4 md:p-10 bg-green-50 min-h-screen">

      {/* Page Title */}

      <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-8 flex items-center gap-2">
        <Users size={28} />
        Student Admission Dashboard
      </h1>


      {/* Dashboard Stats */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <BarChart3 className="text-blue-500"/>
          <div>
            <p className="text-gray-500">Total Applications</p>
            <p className="text-2xl font-bold">{applications.length}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <CheckCircle className="text-green-500"/>
          <div>
            <p className="text-gray-500">Selected Students</p>
            <p className="text-2xl font-bold text-green-600">{selectedCount}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow flex items-center gap-4">
          <XCircle className="text-red-500"/>
          <div>
            <p className="text-gray-500">Rejected Students</p>
            <p className="text-2xl font-bold text-red-600">{rejectedCount}</p>
          </div>
        </div>

      </div>


      {/* Filter Section */}

      <div className="bg-white shadow-md rounded-xl p-6 mb-8 flex flex-wrap gap-6 items-center">

        <div>

          <label className="font-semibold mr-2">
            Department
          </label>

          <select
            value={selectedDept}
            onChange={(e)=>handleDepartmentChange(e.target.value)}
            className="border rounded-lg p-2 focus:ring-2 focus:ring-green-400"
          >

            {departments.map((dept,index)=>(
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}

          </select>

        </div>


        <div>

          <label className="font-semibold mr-2">
            Total Seats
          </label>

          <input
            type="number"
            value={seatCount}
            onChange={(e)=>setSeatCount(e.target.value)}
            className="border rounded-lg p-2 w-24 focus:ring-2 focus:ring-green-400"
          />

        </div>


        <button
          onClick={autoSelectStudents}
          className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow transition"
        >
          Auto Select Top Students
        </button>

      </div>


      {/* Applications Table */}

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">

        <table className="min-w-full text-sm">

          <thead className="bg-green-600 text-white">

            <tr>
              <th className="px-4 py-3">Rank</th>
              <th className="px-4 py-3">Application No</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">12th Mark</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredApplications.map((app,index)=>(

              <tr
                key={app.applicationNo}
                className="border-b hover:bg-green-50 transition"
              >

                <td className="px-4 py-3 font-bold text-green-700">
                  #{index+1}
                </td>

                <td className="px-4 py-3">
                  {app.applicationNo}
                </td>

                <td className="px-4 py-3 font-medium">
                  {app.name}
                </td>

                <td className="px-4 py-3">
                  {app.email}
                </td>

                <td className="px-4 py-3">
                  {app.department}
                </td>

                <td className="px-4 py-3 font-semibold text-green-700">
                  {app.twelthMark}
                </td>


                <td className="px-4 py-3 font-semibold">

                  {app.status === "Selected" && (
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle size={16}/>
                      Selected
                    </span>
                  )}

                  {app.status === "Rejected" && (
                    <span className="flex items-center gap-1 text-red-600">
                      <XCircle size={16}/>
                      Rejected
                    </span>
                  )}

                  {!app.status && (
                    <span className="text-yellow-600">
                      Pending
                    </span>
                  )}

                </td>


                <td className="px-4 py-3 flex flex-wrap gap-2 justify-center">

                  <button
                    onClick={()=>updateStatus(app.applicationNo,"Selected")}
                    className="flex items-center gap-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    <CheckCircle size={16}/>
                    Select
                  </button>

                  <button
                    onClick={()=>updateStatus(app.applicationNo,"Rejected")}
                    className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    <XCircle size={16}/>
                    Reject
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}