import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
Search,
Filter,
Eye,
Edit,
Trash2
} from "lucide-react";

export default function ViewStudents() {

const navigate = useNavigate();
const API = "https://project-backend-kvv2.onrender.com";
const token = localStorage.getItem("token");

const [allStudents,setAllStudents] = useState([]);
const [students,setStudents] = useState([]);

const [search,setSearch] = useState("");
const [department,setDepartment] = useState("");

const [currentPage,setCurrentPage] = useState(1);
const [studentsPerPage] = useState(8);

const [editingStudent,setEditingStudent] = useState(null);
const [formData,setFormData] = useState({});


/* FETCH STUDENTS */

const fetchStudents = async ()=>{

try{

const res = await axios.get(`${API}/staff/students`,{
headers:{ Authorization:`Bearer ${token}` }
});

setAllStudents(res.data);
setStudents(res.data);

}catch(err){
console.error(err);
}

};


/* LIVE SEARCH */

useEffect(()=>{

let filtered = allStudents;

if(search){

filtered = filtered.filter((s)=>
s.registerNo.toLowerCase().includes(search.toLowerCase())
);

}

if(department){

filtered = filtered.filter((s)=>
s.department === department
);

}

setStudents(filtered);
setCurrentPage(1);

},[search,department,allStudents]);


/* DELETE */

const deleteStudent = async(registerNo)=>{

const confirmDelete = window.confirm("Delete this student?");
if(!confirmDelete) return;

try{

await axios.delete(
`${API}/staff/students/${registerNo}`,
{
headers:{ Authorization:`Bearer ${token}` }
}
);

alert("Student deleted");
fetchStudents();

}catch(err){
console.error(err);
}

};


/* EDIT */

const openEdit = (student)=>{
setEditingStudent(student);
setFormData(student);
};


/* UPDATE */

const updateStudent = async ()=>{

try{

await axios.put(
`${API}/staff/students/${editingStudent.registerNo}`,
formData,
{
headers:{ Authorization:`Bearer ${token}` }
}
);

alert("Student updated");
setEditingStudent(null);
fetchStudents();

}catch(err){
console.error(err);
}

};


/* PAGINATION */

const indexOfLast = currentPage * studentsPerPage;
const indexOfFirst = indexOfLast - studentsPerPage;
const currentStudents = students.slice(indexOfFirst,indexOfLast);
const totalPages = Math.ceil(students.length / studentsPerPage);

useEffect(()=>{
fetchStudents();
},[]);


/* UI */

return(

<div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 p-6 md:p-10">

<h1 className="text-3xl font-bold text-green-700 mb-8">
Student Management
</h1>


{/* SEARCH + FILTER */}

<div className="flex flex-col md:flex-row gap-4 mb-6">

<div className="relative flex-1">

<Search className="absolute left-3 top-3 text-gray-400" size={18}/>

<input
type="text"
placeholder="Search Register No..."
className="w-full border rounded-lg pl-10 p-2 focus:ring-2 focus:ring-green-400 outline-none"
value={search}
onChange={(e)=>setSearch(e.target.value)}
/>

</div>

<div className="relative w-full md:w-56">

<Filter className="absolute left-3 top-3 text-gray-400" size={18}/>

<select
className="w-full border rounded-lg pl-10 p-2 focus:ring-2 focus:ring-green-400 outline-none"
value={department}
onChange={(e)=>setDepartment(e.target.value)}
>

<option value="">All Departments</option>
<option value="CS">CS</option>
<option value="ENG">ENG</option>
<option value="ECO">ECO</option>
<option value="MAT">MAT</option>

</select>

</div>

</div>


{/* TABLE */}

<div className="bg-white shadow-xl rounded-xl overflow-x-auto">

<table className="min-w-full">

<thead className="bg-green-600 text-white">

<tr>

<th className="p-3">Reg No</th>
<th>Name</th>
<th>Dept</th>
<th>Year</th>
<th>Sem</th>
<th>Phone</th>
<th>Email</th>
<th>Actions</th>

</tr>

</thead>

<tbody>

{currentStudents.map((s)=>(

<tr
key={s._id}
className="text-center border hover:bg-green-50 transition"
>

<td className="p-3">{s.registerNo}</td>
<td>{s.name}</td>
<td>{s.department}</td>
<td>{s.year}</td>
<td>{s.sem}</td>
<td>{s.phone}</td>
<td>{s.email}</td>

<td className="flex justify-center gap-2 p-2">

<button
onClick={()=>navigate(`/admin/studentprofile/${s.registerNo}`)}
className="bg-green-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-green-700 transition"
>

<Eye size={16}/> View

</button>

<button
onClick={()=>openEdit(s)}
className="bg-yellow-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-yellow-600 transition"
>

<Edit size={16}/> Edit

</button>

<button
onClick={()=>deleteStudent(s.registerNo)}
className="bg-red-600 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:bg-red-700 transition"
>

<Trash2 size={16}/> Delete

</button>

</td>

</tr>

))}

</tbody>

</table>

</div>


{/* PAGINATION */}

<div className="flex flex-wrap gap-2 mt-6">

{Array.from({length:totalPages},(_,i)=>(

<button
key={i}
onClick={()=>setCurrentPage(i+1)}
className={`px-4 py-2 rounded-lg ${
currentPage===i+1
? "bg-green-600 text-white"
: "bg-gray-200"
}`}
>

{i+1}

</button>

))}

</div>


{/* EDIT MODAL */}

{editingStudent && (

<div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">

<div className="bg-white p-6 rounded-xl w-96 shadow-xl">

<h2 className="text-xl font-bold text-green-700 mb-4">
Edit Student
</h2>

<input
className="border p-2 w-full mb-3 rounded"
value={formData.name}
onChange={(e)=>setFormData({...formData,name:e.target.value})}
/>

<input
className="border p-2 w-full mb-3 rounded"
value={formData.phone}
onChange={(e)=>setFormData({...formData,phone:e.target.value})}
/>

<input
className="border p-2 w-full mb-3 rounded"
value={formData.email}
onChange={(e)=>setFormData({...formData,email:e.target.value})}
/>

<div className="flex gap-3 mt-4">

<button
onClick={updateStudent}
className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
>
Update
</button>

<button
onClick={()=>setEditingStudent(null)}
className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
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