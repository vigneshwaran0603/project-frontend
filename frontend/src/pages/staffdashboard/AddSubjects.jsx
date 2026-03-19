import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, BookOpen } from "lucide-react";

export default function AddSubjects() {

  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const [department,setDepartment] = useState("");
  const [year,setYear] = useState("");
  const [sem,setSem] = useState("");

  const [search,setSearch] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    subjectCode: "",
    department: "",
    year: "",
    semester: "",
    fees: "",
  });

  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // =========================
  // FETCH SUBJECTS
  // =========================

  const fetchSubjects = async () => {

    try {

      const res = await axios.get(
        "https://project-backend-cgtf.onrender.com/subjects/student",
        config
      );

      const data = res?.data?.subjects || [];

      setSubjects(data);
      setFilteredSubjects(data);

      setDepartment(res?.data?.department || "");
      setYear(res?.data?.year || "");
      setSem(res?.data?.sem || "");

      setFormData((prev)=>({
        ...prev,
        department: res?.data?.department || ""
      }));

    } catch (err) {
      console.error("Error fetching subjects", err);
    }

  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  // =========================
  // SEARCH
  // =========================

  useEffect(()=>{

    const filtered = subjects.filter((sub)=>
      sub?.title?.toLowerCase().includes(search.toLowerCase()) ||
      sub?.subjectCode?.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredSubjects(filtered);

  },[search,subjects]);

  // =========================
  // FORM CHANGE
  // =========================

  const handleChange = (e) => {

    const {name,value} = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "year" ||
        name === "semester" ||
        name === "fees"
          ? Number(value)
          : value,
    });

  };

  // =========================
  // CREATE
  // =========================

  const createSubject = async () => {

    try {

      await axios.post(
        "https://project-backend-cgtf.onrender.com/subjects",
        formData,
        config
      );

      fetchSubjects();

      setFormData({
        title: "",
        subjectCode: "",
        department: department,
        year: "",
        semester: "",
        fees: "",
      });

      alert("Subject Added Successfully");

    } catch (err) {
      console.error("Create subject failed", err);
      alert("Subject creation failed");
    }

  };

  // =========================
  // UPDATE
  // =========================

  const updateSubject = async () => {

    if(!editingId){
      alert("Invalid subject id");
      return;
    }

    try {

      await axios.put(
        `https://project-backend-cgtf.onrender.com/subjects/${editingId}`,
        formData,
        config
      );

      setEditingId(null);

      setFormData({
        title: "",
        subjectCode: "",
        department: department,
        year: "",
        semester: "",
        fees: "",
      });

      fetchSubjects();

      alert("Subject Updated");

    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    }

  };

  // =========================
  // DELETE
  // =========================

  const deleteSubject = async (id) => {

    if(!id){
      alert("Invalid subject id");
      return;
    }

    if (!window.confirm("Delete this subject?")) return;

    try {

      await axios.delete(
        `https://project-backend-cgtf.onrender.com/subjects/${id}`,
        config
      );

      fetchSubjects();

    } catch (err) {
      console.error("Delete failed", err);
    }

  };

  // =========================
  // EDIT
  // =========================

  const editSubject = (subject) => {

    if(!subject?._id){
      alert("Subject ID missing");
      return;
    }

    setEditingId(subject._id);

    setFormData({
      title: subject.title || "",
      subjectCode: subject.subjectCode || "",
      department: subject.department || department,
      year: subject.year || "",
      semester: subject.semester || "",
      fees: subject.fees || "",
    });

  };

  return (

    <div className="p-4 md:p-8 bg-green-50 min-h-screen">

      {/* TITLE */}

      <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-2 text-green-700">
        <BookOpen/> Subject Management
      </h1>

      {/* DEPARTMENT INFO */}

      <div className="bg-white p-4 rounded-xl shadow mb-6 text-gray-700">
        <p><b>Department:</b> {department}</p>
        <p><b>Year:</b> {year}</p>
        <p><b>Semester:</b> {sem}</p>
      </div>

      {/* SEARCH */}

      <input
        type="text"
        placeholder="Search by title or subject code..."
        value={search}
        onChange={(e)=>setSearch(e.target.value)}
        className="border p-2 rounded-lg mb-6 w-full focus:ring-2 focus:ring-green-400"
      />

      {/* FORM */}

      <div className="bg-white p-6 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">

        <input
          name="title"
          placeholder="Subject Title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
        />

        <input
          name="subjectCode"
          placeholder="Subject Code"
          value={formData.subjectCode}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
        />

        <input
          name="department"
          value={formData.department}
          readOnly
          className="border p-2 rounded-lg bg-gray-100"
        />

        <select
          name="year"
          value={formData.year}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
        >
          <option value="">Select Year</option>
          {[1,2,3,4].map(y=>(
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

        <select
          name="semester"
          value={formData.semester}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
        >
          <option value="">Select Semester</option>
          {[1,2,3,4,5,6,7,8].map(s=>(
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        <input
          type="number"
          name="fees"
          placeholder="Fees"
          value={formData.fees}
          onChange={handleChange}
          className="border p-2 rounded-lg focus:ring-2 focus:ring-green-400"
        />

        <div className="md:col-span-3 flex gap-4">

          {editingId ? (

            <>
              <button
                onClick={updateSubject}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
              >
                Update Subject
              </button>

              <button
                onClick={()=>{
                  setEditingId(null);
                  setFormData({
                    title:"",
                    subjectCode:"",
                    department:department,
                    year:"",
                    semester:"",
                    fees:""
                  })
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </>

          ) : (

            <button
              onClick={createSubject}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
            >
              Add Subject
            </button>

          )}

        </div>

      </div>

      {/* SUBJECT TABLE */}

      <div className="bg-white rounded-xl shadow overflow-x-auto">

        <table className="min-w-full text-sm">

          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Code</th>
              <th className="px-4 py-3">Year</th>
              <th className="px-4 py-3">Semester</th>
              <th className="px-4 py-3">Fees</th>
              <th className="px-4 py-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>

            {filteredSubjects.length === 0 ? (

              <tr>
                <td colSpan="6" className="text-center py-4">
                  No subjects found
                </td>
              </tr>

            ) : (

              filteredSubjects.map((sub) => (

                <tr key={sub._id} className="border-b hover:bg-green-50">

                  <td className="px-4 py-3">{sub.title}</td>
                  <td className="px-4 py-3">{sub.subjectCode}</td>
                  <td className="px-4 py-3">{sub.year}</td>
                  <td className="px-4 py-3">{sub.semester}</td>
                  <td className="px-4 py-3 font-semibold text-green-700">
                    ₹{sub.fees}
                  </td>

                  <td className="px-4 py-3 flex gap-2 justify-center">

                    <button
                      onClick={() => editSubject(sub)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded"
                    >
                      <Pencil size={16}/>
                    </button>

                    <button
                      onClick={() => deleteSubject(sub._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-2 rounded"
                    >
                      <Trash2 size={16}/>
                    </button>

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