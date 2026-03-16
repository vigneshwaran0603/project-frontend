import { useEffect, useState } from "react";

const API = "http://localhost:4000";

export default function StudentSubjectsPage() {

  const [subjects, setSubjects] = useState([]);

  const token = localStorage.getItem("token");

  const fetchSubjects = async () => {

    try {

      const res = await fetch(
        `${API}/subjects/student`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();

      console.log("Subjects Response:", data);

      if (res.ok) {
        setSubjects(data.subjects);
      } else {
        alert(data.error);
      }

    } catch (err) {
      console.error(err);
    }

  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  return (

    <div className="min-h-screen bg-green-50 p-6 md:p-10">

      {/* Page Header */}

      <h1 className="text-3xl font-bold text-green-700 mb-8">
        📚 My Subjects
      </h1>


      {/* Table Card */}

      <div className="bg-white rounded-xl shadow-md overflow-x-auto">

        <table className="w-full text-sm md:text-base">

          <thead className="bg-green-600 text-white">

            <tr>
              <th className="p-4 text-left">Code</th>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Year</th>
              <th className="p-4 text-left">Semester</th>
              <th className="p-4 text-left">Exam Fee</th>
            </tr>

          </thead>

          <tbody>

            {subjects.length === 0 ? (

              <tr>
                <td colSpan="5" className="text-center p-6 text-gray-500">
                  No subjects assigned
                </td>
              </tr>

            ) : (

              subjects.map((sub) => (

                <tr
                  key={sub._id}
                  className="border-b hover:bg-green-50 transition"
                >

                  <td className="p-4 font-medium text-gray-700">
                    {sub.subjectCode}
                  </td>

                  <td className="p-4">
                    {sub.title}
                  </td>

                  <td className="p-4">
                    {sub.year}
                  </td>

                  <td className="p-4">
                    Semester {sub.semester}
                  </td>

                  <td className="p-4 font-semibold text-green-600">
                    ₹{sub.fees}
                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>

  );

}