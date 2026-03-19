import { useEffect, useState } from "react";
import {
UserPlus,
Pencil,
Trash2,
Search,
X
} from "lucide-react";

export default function StudentManagement() {

  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const [showForm,setShowForm] = useState(false);
  const [editing,setEditing] = useState(false);

  const [form, setForm] = useState({
    name:"",
    email:"",
    phone:"",
    department:"",
    year:"",
    sem:"",
    dob:"",
    registerNo:"",
    password:""
  });

  const token = localStorage.getItem("token");

  /* ---------------- GET STUDENTS ---------------- */

  const getStudents = async () => {

    const res = await fetch("https://project-backend-cgtf.onrender.com/staff/students",{
      headers:{
        Authorization:`Bearer ${token}`
      }
    });

    const data = await res.json();
    setStudents(data);
  };

  useEffect(()=>{
    getStudents();
  },[]);

  /* ---------------- CREATE STUDENT ---------------- */

  const createStudent = async () => {

    await fetch("https://project-backend-cgtf.onrender.com/staff/create-student",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify({
        role:"student",
        ...form
      })
    });

    setShowForm(false);
    setForm({});
    getStudents();
  };

  /* ---------------- UPDATE STUDENT ---------------- */

  const updateStudent = async () => {

    await fetch(`https://project-backend-cgtf.onrender.com/staff/students/${form.registerNo}`,{
      method:"PUT",
      headers:{
        "Content-Type":"application/json",
        Authorization:`Bearer ${token}`
      },
      body:JSON.stringify(form)
    });

    setShowForm(false);
    setEditing(false);
    setForm({});
    getStudents();
  };

  /* ---------------- DELETE STUDENT ---------------- */

  const deleteStudent = async(registerNo)=>{

    await fetch(`https://project-backend-cgtf.onrender.com/staff/students/${registerNo}`,{
      method:"DELETE",
      headers:{
        Authorization:`Bearer ${token}`
      }
    });

    getStudents();
  };

  /* ---------------- OPEN EDIT ---------------- */

  const openEdit = (student)=>{
    setEditing(true);
    setShowForm(true);
    setForm(student);
  };

  /* ---------------- FILTER ---------------- */

  const filteredStudents = students
  .filter(s=>s.name.toLowerCase().includes(search.toLowerCase()))
  .filter(s=> department ? s.department===department : true);


  return (

    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-10">

      <h1 className="text-3xl font-bold mb-8 text-green-700">
        Student Management
      </h1>

      {/* ADD STUDENT */}

      <button
      onClick={()=>{setShowForm(true);setEditing(false)}}
      className="flex items-center gap-2 bg-green-600 text-white px-6 py-2 rounded-lg shadow hover:bg-green-700 transition mb-6"
      >
      <UserPlus size={18}/>
      Add Student
      </button>


      {/* SEARCH + FILTER */}

      <div className="flex flex-col md:flex-row gap-4 mb-6">

        <div className="flex items-center border rounded-lg bg-white px-3 flex-1">
          <Search size={18} className="text-gray-400"/>
          <input
          placeholder="Search Student"
          className="p-2 w-full outline-none"
          onChange={(e)=>setSearch(e.target.value)}
          />
        </div>

        <input
        placeholder="Filter Department"
        className="border p-2 rounded-lg bg-white"
        onChange={(e)=>setDepartment(e.target.value)}
        />

      </div>


      {/* STUDENT TABLE */}

      <div className="overflow-x-auto bg-white shadow-lg rounded-xl">

      <table className="w-full">

        <thead className="bg-green-600 text-white">

          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Register No</th>
            <th className="p-3">Dept</th>
            <th className="p-3">Year</th>
            <th className="p-3">Actions</th>
          </tr>

        </thead>

        <tbody>

          {filteredStudents.map((s)=>(

            <tr key={s._id} className="text-center border-b hover:bg-green-50">

              <td className="p-3">{s.name}</td>
              <td>{s.registerNo}</td>
              <td>{s.department}</td>
              <td>{s.year}</td>

              <td className="flex gap-3 justify-center p-3">

                <button
                onClick={()=>openEdit(s)}
                className="text-blue-600 hover:text-blue-800"
                >
                <Pencil size={18}/>
                </button>

                <button
                onClick={()=>deleteStudent(s.registerNo)}
                className="text-red-600 hover:text-red-800"
                >
                <Trash2 size={18}/>
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

      </div>


      {/* FORM MODAL */}

      {showForm && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center p-4">

          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg">

            <div className="flex justify-between items-center mb-4">

              <h2 className="text-xl font-bold text-green-700">
                {editing ? "Update Student" : "Add Student"}
              </h2>

              <button onClick={()=>setShowForm(false)}>
                <X/>
              </button>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

              <input placeholder="Name"
              className="border p-2 rounded"
              value={form.name || ""}
              onChange={(e)=>setForm({...form,name:e.target.value})}/>

              <input placeholder="Email"
              className="border p-2 rounded"
              value={form.email || ""}
              onChange={(e)=>setForm({...form,email:e.target.value})}/>

              <input placeholder="Phone"
              className="border p-2 rounded"
              value={form.phone || ""}
              onChange={(e)=>setForm({...form,phone:e.target.value})}/>

              <input placeholder="Department"
              className="border p-2 rounded"
              value={form.department || ""}
              onChange={(e)=>setForm({...form,department:e.target.value})}/>

              <input type="number"
              placeholder="Year"
              className="border p-2 rounded"
              value={form.year || ""}
              onChange={(e)=>setForm({...form,year:Number(e.target.value)})}/>

              <input type="number"
              placeholder="Sem"
              className="border p-2 rounded"
              value={form.sem || ""}
              onChange={(e)=>setForm({...form,sem:Number(e.target.value)})}/>

              <input placeholder="DOB"
              className="border p-2 rounded"
              value={form.dob || ""}
              onChange={(e)=>setForm({...form,dob:e.target.value})}/>

              {!editing && (
                <input placeholder="Register No"
                className="border p-2 rounded"
                value={form.registerNo || ""}
                onChange={(e)=>setForm({...form,registerNo:e.target.value})}/>
              )}

              <input placeholder="Password"
              type="password"
              className="border p-2 rounded"
              onChange={(e)=>setForm({...form,password:e.target.value})}/>

            </div>

            <div className="mt-5 flex gap-3">

              <button
              onClick={editing ? updateStudent : createStudent}
              className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
              >
              {editing ? "Update" : "Create"}
              </button>

              <button
              onClick={()=>setShowForm(false)}
              className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-gray-600"
              >
              Cancel
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}